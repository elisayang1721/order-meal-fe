<template lang="pug">
  #orderManagement(v-loading="loading")
    .managementContent
      .contentBlock
        .contentNav 進度設定
        .content
          ul.alignStart
            li
              span 截止時間
              el-date-picker(v-model="orderInfo.finishedOn"
                @change="checkDateTime"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm")
            li
              span 截止金額
              span {{orderInfo.limitedPrice || '無'}}
            li
              span 訂單狀態
              .switchBlock
                span 截止
                el-switch(v-model="orderInfo.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949")
                span 進行
            li
              el-button(type="success") 匯出Excel
      .contentBlock
        .contentNav 訂單計算
        .content
          ul.alignStart
            li 共 {{orderInfo.totalAmount}} 份
            li 已訂購： {{orderInfo.paidAmount}}份
            li 未訂購： {{orderInfo.orderedAmount}}份
            li 總價： ${{orderInfo.totalPrice}}
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
      el-button(type="danger" @click="reset") 取消
      el-button(type="success" @click="updateForm") 確認
    DialogDetail
</template>
<script>
import history from '@api/history'
import orderForm from '@api/orderForm'
import { deepClone } from '@js/model'
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
    checkDateTime() {
      if (!this.orderInfo.finishedOn) {
        this.$nextTick(() => {
          this.orderInfo.finishedOn = this.initData.finishedOn
        })
      }
    },
    reset() {
      this.orderInfo = deepClone(this.initData)
    },
    updateForm() {
      const load = {
        storeId: this.orderInfo.storeId,
        finishedOn: this.orderInfo.finishedOn,
        limitedPrice: this.orderInfo.limitedPrice,
        bulletin: this.orderInfo.bulletin,
        status: this.orderInfo.status
      }
      orderForm.updateOrderForm(this.orderInfo.id, load).then(res => {
        this.$message({
          message: '訂單更新成功',
          type: 'success'
        })
        if (this.orderInfo.status) {
          this.getRecordsId()
        } else {
          this.closeDialog()
        }
        this.$bus.$emit('refreshSystem')
        this.$bus.$emit('refreshRecordsList')
      })
    }
  },
  data() {
    return {
      initData: {},
      orderInfo: {},
      loading: false
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
  padding: 6px 10px
/deep/.el-switch
  margin: 0 5px
/deep/.el-textarea
  .el-textarea__inner
    height: 100%
    resize: none
</style>
