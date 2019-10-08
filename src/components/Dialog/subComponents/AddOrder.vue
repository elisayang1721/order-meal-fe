<template lang="pug">
  #addOrder
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
          placeholder="选择日期时间")
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
      el-button(type="success") 確認
</template>
<script>
export default {
  name: 'AddOrder',
  props: ['storeId'],
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      condiction: {
        dateTime: '',
        expiredAmount: '',
        bulletin: ''
      }
    }
  },
  components: {}
}
</script>
<style lang="sass" scoped>
#addOrder
  /deep/.el-button
    width: 50px
</style>
