<template lang="pug">
  #orderMain
    .orderContainer
      OrderSystem
      OrdersHistory
      el-button.openOrder(type='primary'
        icon="el-icon-plus"
        @click="showDialog({name:'CreateNewOrder',title:'CreateNewOrder'})") 發起點餐
</template>
<script>
import OrdersHistory from '@v/Order/OrdersHistory'
import OrderSystem from '@v/Order/OrderSystem'
import { mapActions } from 'vuex'

export default {
  name: 'OrderMain',
  created() { },
  mounted() { },
  computed: {},
  methods: {
    ...mapActions(['showDialog'])
  },
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
