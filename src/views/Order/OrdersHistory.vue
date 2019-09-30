<template lang="pug">
  #ordersHistory
    .progressTitle tab
    VuePerfectScrollBar.listContainer
      .contentViewFix
        keep-alive
          component(:is="view" :data="currentData")
</template>
<script>
import VuePerfectScrollBar from 'vue-perfect-scrollbar'
import MyOrdersFrame from './component/myOrdersFrame'
import ordersHistoryFrame from './component/ordersHistoryFrame'

export default {
  name: 'OrdersHistory',
  created() { },
  mounted() { },
  computed: {
    currentData() {
      return this.view === 'MyOrdersFrame' ? this.myOrdersList : this.orderHistoryList
    }
  },
  methods: {},
  watch: {},
  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      },
      view: 'MyOrdersFrame',
      myOrdersList: [
        '1',
        '1',
        '1',
        '1'
      ],
      orderHistoryList: [
        'a',
        'a',
        'a',
        'a',
        'a'
      ]
    }
  },
  components: {
    VuePerfectScrollBar,
    MyOrdersFrame,
    ordersHistoryFrame
  }
}
</script>
