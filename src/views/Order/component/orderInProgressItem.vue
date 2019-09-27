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
          span {{addComma}}
    .list.right
      .navHead
        span MEEEE
        span /
        button 訂單管理
      .content
        el-button(type="info") 明細
        el-button(type="primary") 點餐
</template>
<script>
export default {
  name: 'name',
  props: ['listData'],
  created() {	},
  mounted() {	},
  computed: {
    addComma() {
      return '$' + this.amount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
  },
  methods: {},
  watch: {},
  data() {
    return {
      amount: 2000
    }
  },
  components: {}
}
</script>
