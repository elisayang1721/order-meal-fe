<template lang="pug">
  ScrollBar#orderMain
    .scrollWrapper
        OrderSystem
        OrdersHistory
        el-button.openOrder(type='primary'
          icon="el-icon-plus"
          @click="showDialog({name:'CreateNewOrder',title:'CreateNewOrder'})") 發起點餐
</template>
<script>
import OrdersHistory from '@v/Order/OrdersHistory'
import OrderSystem from '@v/Order/OrderSystem'
import ScrollBar from '@c/ScrollBar/ScrollBar'
import { mapActions } from 'vuex'

export default {
  name: 'OrderMain',
  methods: {
    ...mapActions(['showDialog'])
  },
  components: {
    OrdersHistory,
    OrderSystem,
    ScrollBar
  }
}
</script>
<style lang="sass" scoped>
#orderMain
  >/deep/.scroll-content
</style>
