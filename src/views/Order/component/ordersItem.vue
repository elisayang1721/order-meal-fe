<template lang="pug">
  .itemWrapper
    .list.left
      .navHead
        .restaurantName 數字嵐
        .deadLine 截止於:三分後
      .content
        .amount
          .amountTitle 總數
          span 123
        .amount
          .amountTitle 金額
          span 12345
    .list.right
      .navHead
        span test
        span /
        button 訂單管理
      .content
        el-button(type="info") 明細
        el-button(type="primary") 點餐
</template>
<script>
export default {
  name: 'ordersItem',
  created() {	},
  mounted() {	},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {}
  },
  components: {}
}
</script>
