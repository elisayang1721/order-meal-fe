<template lang="pug">
  ScrollBar#addOrder.tableFrame
    .row.heading
      .cell
        span {{`發起 ${storeName} 點餐`}}
    .row
      .cell
        span 開始時間
      .cell
        el-date-picker(
          v-model="condition.publishedOn"
          type="datetime"
          placeholder="選擇日期時間"
          format="yyyy-MM-dd  HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          @focus="focusDatePicker('publishedOn')"
          :disabled="condition.expiredAmount ? true : false"
        )
    .row
      .cell
        span 截止時間
      .cell
        el-date-picker(
          v-model="condition.finishedOn"
          type="datetime"
          placeholder="選擇日期時間"
          format="yyyy-MM-dd  HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          @focus="focusDatePicker('finishedOn')"
          :disabled="condition.expiredAmount ? true : false"
        )
    .row
      .cell
        span 截止金額
      .cell
        el-input(v-model="condition.expiredAmount"
          type="text"
          maxlength="4"
          :disabled="condition.finishedOn ? true : false")
    .row
      .cell
        span 公告事項
      .cell
        el-input(v-model="condition.bulletin"
          type="textarea"
          maxlength="255"
          show-word-limit)
    .confirmBlock
      .helpBar
        | ※ 開始時間非必填，截止時間或金額則一填寫。
      el-button(type="success" @click="getDebounce") 確認
</template>
<script>
import orderForm from '@api/orderForm'
import debounce from 'lodash/debounce'
import ScrollBar from '@c/ScrollBar/ScrollBar'
import { mapActions } from 'vuex'

export default {
  name: 'AddOrder',
  props: ['storeId', 'storeName'],
  data() {
    return {
      condition: {
        publishedOn: null,
        finishedOn: null,
        expiredAmount: null,
        bulletin: null,
        value: null,
      },
      memberName: '',
    }
  },
  computed: {
    getLoad() {
      const load = {
        storeId: this.storeId,
        publishedOn: this.condition.publishedOn,
        finishedOn: this.condition.finishedOn,
        limitedPrice: this.condition.expiredAmount,
        bulletin: this.condition.bulletin,
        status: true,
      }
      return load
    },
    checkLimitedPrice() {
      return this.condition.expiredAmount
      // eslint-disable-next-line no-restricted-globals
        && !isNaN(this.condition.expiredAmount)
        && Number(this.condition.expiredAmount) > 0
    },
    checkDateTime() {
      const nowTime = new Date().valueOf()
      let endTime = 0

      if (this.condition.finishedOn != null) {
        endTime = Date.parse(this.condition.finishedOn).valueOf()
      }
      return endTime > nowTime
    },
  },
  components: {
    ScrollBar,
  },
  methods: {
    ...mapActions(['closeDialog']),
    createOrder: debounce(vm => {
      orderForm.addOrderForm(vm.getLoad).then(() => {
        vm.$message({
          message: '新增訂單成功',
          type: 'success',
        })
        vm.$bus.$emit('refreshSystem')
        vm.$bus.$emit('refreshRecordsList')
        vm.closeDialog()
      })
    }, 500),
    getDebounce() {
      const vm = this
      if (this.checkDateTime || this.checkLimitedPrice) {
        this.createOrder(vm)
      } else {
        let message
        if (!this.condition.finishedOn && !this.condition.expiredAmount) {
          message = '請至少填寫一項截止設定'
        } else if (!this.checkDateTime && !this.condition.expiredAmount) {
          message = '截止時間不能小於現在時間'
        } else {
          message = '請填入正確截止金額且截止金額不能小於 0'
        }
        this.$message({
          message,
          type: 'warning',
        })
      }
    },
    focusDatePicker(name) {
      if (!this.condition[name]) {
        this.condition[name] = new Date()
      }
    },
  },
  mounted() {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    this.memberName = userData.memberName
  },
}
</script>
<style lang="sass" scoped>
  .confirmBlock
    justify-content: space-between
    .helpBar
      font-size: .9rem
      color: #5f5c5c
</style>
