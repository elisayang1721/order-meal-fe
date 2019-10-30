<template lang="pug">
  #ordersHistory
    Tab(:tabs="tabs")
    keep-alive
      component(:is="active")
</template>
<script>
import Tab from '@c/Tab/Tab'
import MyOrdersFrame from './component/MyOrdersFrame'
import OrdersHistoryFrame from './component/OrdersHistoryFrame'

export default {
  name: 'OrdersHistory',
  data() {
    return {
      tabs: [
        {
          name: 'MyOrdersFrame',
          title: '我的點餐記錄'
        },
        {
          name: 'OrdersHistoryFrame',
          title: '訂單歷史記錄'
        }
      ],
      active: ''
    }
  },
  components: {
    Tab,
    MyOrdersFrame,
    OrdersHistoryFrame
  }
}
</script>
<style lang="sass" scoped>
#ordersHistory
  /deep/.commonTabs
    padding-left: 10px
    padding-bottom: 2px
    height: 37px
</style>
