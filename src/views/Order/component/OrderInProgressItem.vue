<template lang="pug">
  .itemWrapper
    .list.left
      .navHead
        .restaurantName {{list.storeName}}
        .deadLine 截止於：三分後
      .content
        .amount
          .amountTitle 總數
          span {{list.totalAmount}}
        .amount
          .amountTitle 金額
          span {{addComma}}
        .amount(v-if="list.bulletin")
          .amountTitle 公告事項
          span(:title="list.bulletin") {{list.bulletin}}
    .list.right
      .navHead
        span(:title="neededTitle") {{list.createdByName}}
        el-button(type="warning"
          icon="el-icon-setting"
          @click="toggleDialog('OrderManagement',list.storeId,list.storeName,list.createdByName)") 訂單管理
      .content
        el-button(icon="el-icon-edit"
          @click="toggleDialog('Detail',list.storeId,list.storeName,list.createdByName)") 明細
        el-button(type="success" icon="el-icon-potato-strips"
          @click="toggleDialog('Order',list.storeId,list.storeName,list.createdByName)") 點餐
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'OrderInProgressItem',
  props: ['list'],
  created() {},
  mounted() {},
  computed: {
    addComma() {
      return '$' + this.list.totalPrice.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    },
    neededTitle() {
      return this.list.createdByName.length > 5 ? this.list.createdByName.length : ''
    }
  },
  methods: {
    ...mapActions(['showDialog']),
    toggleDialog(cName, storeId, storeName, owner) {
      let title
      if (cName === 'OrderManagement') {
        title = `${owner} - ${storeName} - 訂單管理`
      } else if (cName === 'Detail') {
        title = `${owner} - ${storeName} - 訂單明細`
      } else {
        title = `我也要訂 - ${storeName}`
      }
      const load = {
        name: cName,
        title
      }
      this.showDialog(load)
    }
  },
  watch: {},
  data() {
    return {}
  },
  components: {}
}
</script>
