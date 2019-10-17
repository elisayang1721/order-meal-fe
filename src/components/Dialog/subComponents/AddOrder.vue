<template lang="pug">
  ScrollBar#addOrder
    .row
      .cell
        span 負責人
      .cell
        span {{$store.state.userData.memberName}}
    .row
      .cell
        span 截止時間
      .cell
        el-date-picker(v-model="condiction.dateTime"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm")
    .row
      .cell
        span 截止金額
      .cell
        el-input(v-model="condiction.expiredAmount"
          type="text")
    .row
      .cell
        span 公告事項
      .cell
        el-input(v-model="condiction.bulletin"
          type="textarea")
    .confirmBlock
      el-button(type="danger") 取消
      el-button(type="success" @click="createOrder") 確認
</template>
<script>
import orderForm from '@api/orderForm'
import ScrollBar from '@c/ScrollBar/ScrollBar'

export default {
  name: 'AddOrder',
  props: ['storeId'],
  created() {},
  mounted() {},
  computed: {},
  methods: {
    createOrder() {
      const load = {
        storeId: this.storeId,
        finishedOn: this.condiction.dateTime,
        limotedPrice: this.condiction.expiredAmount,
        bulletin: this.condiction.bulletin,
        status: true
      }
      orderForm.addOrderForm(load).then(res => {
        this.$message({
          message: '新增訂單成功',
          type: 'success'
        })
        this.$bus.$emit('refreshSystem')
      })
    }
  },
  watch: {},
  data() {
    return {
      condiction: {
        dateTime: null,
        expiredAmount: null,
        bulletin: null
      }
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
