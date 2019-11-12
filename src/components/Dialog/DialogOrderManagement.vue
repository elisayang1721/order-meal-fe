<template lang="pug">
  #orderManagement(v-loading="loading")
    .managementContent.tableFrame(v-if="Object.keys(orderInfo).length")
      .contentBlock
        .contentNav 進度設定
        .content
          ul.alignStart
            li
              span 截止時間：
              el-date-picker(v-model="orderInfo.finishedOn"
                type="datetime"
                placeholder="選擇日期時間"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                :disabled="orderInfo.limitedPrice ? true : false")
            li
              span 截止金額：
              el-input(v-model="orderInfo.limitedPrice"
                :maxlength="4"
                :placeholder="orderInfo.limitedPrice ? '' : '無'"
                :disabled="orderInfo.finishedOn ? true : false")
            li
              span 訂單狀態：
              .switchBlock
                el-switch(v-model="orderInfo.status"
                  active-color="#47975e"
                  inactive-color="#c75656"
                  active-text="進行"
                  inactive-text="截止")
            li
              el-button.export-btn(type="success"
                @click="getDebounce($event,'export')") 匯出Excel
      .contentBlock
        .contentNav 訂單計算
        .content
          ul.alignStart
            li 共 {{orderInfo.totalAmount}} 份
            li 已訂購： {{orderInfo.paidAmount}}份
            li 未訂購： {{orderInfo.orderedAmount}}份
            li 總價： {{orderInfo.totalPrice.format()}}
      .contentBlock
        .contentNav 公告事項
        .content
          el-input(v-model="orderInfo.bulletin"
            type="textarea"
            maxlength="255"
            show-word-limit)
    .confirmBlock
      .phone
        i.el-icon-phone
        span {{orderInfo.storePhone}}
      el-button(type="danger"
        @click="reset") 復原
      el-button(type="success" @click="getDebounce($event)") 確認
    DialogDetail
</template>
<script>
import history from '@api/history'
import orderForm from '@api/orderForm'
import debounce from 'lodash/debounce'
import { deepClone, exportExcel } from '@js/model'
import { mapActions } from 'vuex'
import DialogDetail from './DialogDetail'

export default {
  name: 'DialogOrderManagement',
  mounted() {
    this.getRecordsId()
    this.$bus.$on('updateOrderAmount', data => {
      if (data.status) {
        this.orderInfo.paidAmount += data.cal
        this.orderInfo.orderedAmount -= data.cal
      } else {
        this.orderInfo.paidAmount -= data.cal
        this.orderInfo.orderedAmount += data.cal
      }
    })
    this.$bus.$on('refreshOrderForm', () => {
      this.getRecordsId()
    })
  },
  computed: {
    checkLimitedPrice() {
      // eslint-disable-next-line no-restricted-globals
      return this.orderInfo.limitedPrice && !isNaN(this.orderInfo.limitedPrice)
    }
  },
  methods: {
    ...mapActions(['closeDialog']),
    getRecordsId() {
      this.loading = true
      history.getRecordsId(this.$store.state.prop.id).then(res => {
        this.orderInfo = res
        this.initData = deepClone(this.orderInfo)
        this.loading = false
      })
    },
    blur(e) {
      e.currentTarget.blur()
    },
    reset(e) {
      this.orderInfo = deepClone(this.initData)
      this.blur(e)
    },
    updateForm: debounce(vm => {
      const load = {
        storeId: vm.orderInfo.storeId,
        finishedOn: vm.orderInfo.finishedOn,
        limitedPrice: vm.orderInfo.limitedPrice,
        bulletin: vm.orderInfo.bulletin,
        status: vm.orderInfo.status
      }
      orderForm.updateOrderForm(vm.orderInfo.id, load).then(() => {
        vm.$message({
          message: '訂單更新成功',
          type: 'success'
        })
        vm.closeDialog()
        vm.$bus.$emit('refreshSystem')
        vm.$bus.$emit('refreshRecordsList')
      })
    }, 500),
    exportExcel: debounce(vm => {
      history.exportOrderExcel(vm.$store.state.prop.id).then(res => {
        exportExcel(res)
      })
    }, 500),
    getDebounce(e, action = 'update') {
      const vm = this
      if (action === 'update') {
        if (this.orderInfo.finishedOn || this.checkLimitedPrice) {
          this.updateForm(vm)
        } else if (!this.orderInfo.finishedOn && !this.orderInfo.limitedPrice) {
          this.$message({
            message: '請至少填寫一項截止設定',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '請填入正確截止金額',
            type: 'warning'
          })
        }
      } else {
        this.exportExcel(vm)
      }
      this.blur(e)
    }
  },
  data() {
    return {
      initData: {},
      orderInfo: {},
      loading: false,
      fn: null
    }
  },
  components: {
    DialogDetail
  },
  beforeDestroy() {
    this.$bus.$off('updateOrderAmount')
    this.$bus.$off('refreshOrderForm')
  }
}
</script>
<style lang="sass" scoped>
/deep/.el-input
  width: 180px
  >input
    padding: 0 10px 0 30px
    height: 24px
    line-height: 24px
  .el-input__prefix,.el-input__suffix
    .el-input__icon
      line-height: 24px
  .el-input__suffix
    right: 0
/deep/.el-button
  padding: 10px
/deep/.el-switch
  margin: 0 5px
/deep/.el-textarea
  .el-textarea__inner
    color: $darkGray
    height: 100%
    resize: none
    padding: 5px 10px
  .el-input__count
    color: $darkGray
    background: #efebea
/deep/.el-switch
  flex: 1
  +Flex(space-around)
  margin: 0
  .el-switch__label--left
    color: #c75656
  &.is-checked
    .el-switch__label--left
      color: #766f6f
    .el-switch__label--right
      color: #47975e
/deep/.el-switch__label
  color: #766f6f
  *
    font-size: 16px
.export-btn
  padding: 6px 10px
</style>
