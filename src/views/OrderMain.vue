<template lang="pug">
  #orderMain
    .orderContainer
      OrderSystem
      OrdersHistory
      el-button.openOrder(type='primary' icon="el-icon-plus") 發起點餐
</template>
<script>
import OrdersHistory from '@v/Order/OrdersHistory'
import OrderSystem from '@v/Order/OrderSystem'

export default {
  name: 'OrderMain',
  created() { },
  mounted() { },
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      cmp: OrdersHistory
    }
  },
  components: {
    OrdersHistory,
    OrderSystem
  }
}
</script>
