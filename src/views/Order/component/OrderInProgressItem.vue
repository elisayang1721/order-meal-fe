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
        span(:title="name.length > 5 ? name : ''") {{name}}
        span /
        el-button(type="warning"
          icon="el-icon-setting"
          @click="showDialog({name:'OrderManagement',title:'Owner - 店名(電話) - 訂單管理'})") 訂單管理
      .content
        el-button(icon="el-icon-edit"
          @click="showDialog({name:'Detail',title:'Owner - 店名(電話) - 訂單明細'})") 明細
        el-button(type="success" icon="el-icon-potato-strips"
          @click="showDialog({name:'Order',title:'Order'})") 點餐
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'OrderInProgressItem',
  props: ['listData'],
  created() {},
  mounted() {},
  computed: {
    addComma() {
      return '$' + this.amount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
  },
  methods: {
    ...mapActions(['showDialog'])
  },
  watch: {},
  data() {
    return {
      amount: 2000,
      name: '我是誰誰誰誰誰誰'
    }
  },
  components: {}
}
</script>
