<template lang="pug">
  ScrollBar#addOrder
    .row
      .cell
        span {{`發起 ${storeName} 點餐`}}
    .row
      .cell
        span 截止時間
      .cell
        el-date-picker(v-model="condition.dateTime"
          type="datetime"
          placeholder="選擇日期時間"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm")
    .row
      .cell
        span 截止金額
      .cell
        el-input(v-model="condition.expiredAmount"
          type="text")
    .row
      .cell
        span 公告事項
      .cell
        el-input(v-model="condition.bulletin"
          type="textarea")
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
  mounted() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    this.memberName = userData.memberName
  },
  computed: {
    getLoad() {
      const load = {
        storeId: this.storeId,
        finishedOn: this.condition.dateTime,
        limotedPrice: this.condition.expiredAmount,
        bulletin: this.condition.bulletin,
        status: true
      }
      return load
    }
  },
  methods: {
    ...mapActions(['closeDialog']),
    createOrder: debounce(vm => {
      orderForm.addOrderForm(vm.getLoad).then(() => {
        vm.$message({
          message: '新增訂單成功',
          type: 'success'
        })
        vm.$bus.$emit('refreshSystem')
        vm.$bus.$emit('refreshRecordsList')
        vm.closeDialog()
      })
    }, 500),
    getDebounce() {
      const vm = this
      this.createOrder(vm)
    }
  },
  data() {
    return {
      condition: {
        dateTime: null,
        expiredAmount: null,
        bulletin: null
      },
      memberName: ''
    }
  },
  components: {
    ScrollBar
  }
}
</script>
<style lang="sass" scoped>
#addOrder
  /deep/.el-button
    width: 50px
</style>
