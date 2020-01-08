<template lang="pug">
  ScrollBar#addOrder.tableFrame
    .row.title
      .cell
        span {{`發起 ${storeName} 點餐`}}
    .row
      .cell
        span 截止時間
      .cell
        el-date-picker(
          v-model="condition.dateTime"
          type="datetime"
          placeholder="選擇日期時間"
          format="yyyy-MM-dd  HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          @focus="focusDatePicker"
          :disabled="condition.expiredAmount ? true : false")
    .row
      .cell
        span 截止金額
      .cell
        el-input(v-model="condition.expiredAmount"
          type="text"
          maxlength="4"
          :disabled="condition.dateTime ? true : false")
    .row
      .cell
        span 公告事項
      .cell
        el-input(v-model="condition.bulletin"
          type="textarea"
          maxlength="255"
          show-word-limit)
    .confirmBlock
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
        dateTime: null,
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
        finishedOn: this.condition.dateTime,
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
      const nowTime = new Date().getTime()
      const setTime = new Date(this.condition.dateTime.replace(/\s/, 'T')).getTime()
      return setTime > nowTime
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
      // const nowTime = new Date().getTime()
      // const setTime = new Date(this.condition.dateTime.replace(/\s/, 'T'))

      if (this.checkDateTime || this.checkLimitedPrice) {
        this.createOrder(vm)
      } else {
        let message
        if (!this.condition.dateTime && !this.condition.expiredAmount) {
          message = '請至少填寫一項截止設定'
        } else if (this.condition.dateTime && !this.checkDateTime) {
          message = '截止時間不能小於現在時間'
        } else {
          message = '請填入正確截止金額且截止金額不能小於0'
        }
        this.$message({
          message,
          type: 'warning',
        })
      }
    },
    focusDatePicker() {
      if (this.condition.dateTime === null) {
        this.condition.dateTime = new Date()
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
</style>
