<template lang="pug">
  ScrollBar.listContainer(id="myOrdersFrame"
    :overscroll="true"
    @reachEnd="reachEnd")
    .contentViewFix(:class="{'newOrderRemind': newOrder}")
      OrdersItem(v-for="(obj, i) in myOrdersList" :key="i" :myOrderData="obj")
      .loadingBlock(v-loading="loading" v-if="listPage !== 4")
        p
          i(class="el-icon-loading")
          | Load more
</template>
<script>
import order from '@api/order'
import ScrollBar from '@c/ScrollBar/ScrollBar'
import OrdersItem from './OrdersItem'

export default {
  name: 'MyOrdersFrame',
  mounted() {
    this.getList()
    this.$bus.$on('refreshMyorder', () => {
      this.refreshList()
    })
  },
  methods: {
    reachEnd() {
      // call API to get more orderList
      if (this.listPage < 4) {
        this.listPage++
        this.getList()
      }
    },
    getList() {
      this.loading = true
      order.getOrderRecordsList({ page: this.listPage }).then(res => {
        this.myOrdersList = this.myOrdersList ? [...this.myOrdersList, ...res.list] : res.list       
        this.loading = false
        // this.timeCompare()
      })      
    },
    timeCompare() {
      const nowTime = new Date().getTime()
      const setTime = new Date(this.myOrdersList[0].createdOn).getTime()

      console.log('現在時間=>',nowTime,'第一筆時間=>',setTime)
      // setTimeout(() => {
      //   this.newOrder = false
      // }, 4000)
    },
    refreshList() {
      this.listPage = 0
      this.myOrdersList = []
      this.newOrder = true    
    }
  },
  watch: {
    'myOrdersList': {
      handler(val) {
        if (val.length < 7) {
          this.reachEnd()
        }
      }
    }
  },
  data() {
    return {
      myOrdersList: [],
      loading: false,
      listPage: 1,
      newOrder: false
    }
  },
  components: {
    ScrollBar,
    OrdersItem
  },
  beforeDestroy() {
    this.$bus.$off('refreshMyorder')
  }
}
</script>
