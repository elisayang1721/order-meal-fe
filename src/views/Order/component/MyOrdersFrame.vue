<template lang="pug">
  ScrollBar.listContainer(id="myOrdersFrame"
    :overscroll="true"
    @reachEnd="reachEnd")
    .contentViewFix(:class="{'newOrderRemind': newOrder}")
      OrdersItem(v-for="(obj, i) in myOrdersList" :key="i" :myOrderData="obj")
      .loadingBlock(v-loading="loading" v-if="!isFinishedLoad")
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
    this.$bus.$on('refreshMyorder', type => {
      this.refreshList(type)
    })
  },
  methods: {
    reachEnd() {
      // call API to get more orderList
      if (!this.isFinishedLoad) {
        this.listPage++
        this.getList()
      }
    },
    getList() {
      this.loading = true
      order.getOrderRecordsList({ page: this.listPage }).then(res => {
        console.log(res.list)
        if (res.list.length) {
          this.myOrdersList = this.myOrdersList ? [...this.myOrdersList, ...res.list] : res.list
        }
        this.isFinishedLoad = res.totalSize - ((this.listPage - 1)  * 10) < 11
        this.loading = false
      })
    },
    refreshList(type) {
      this.listPage = 0
      this.myOrdersList = []
      this.newOrder = type
      this.isFinishedLoad = false
      setTimeout(() => {
        this.newOrder = false
      }, 3500)
    },
  },
  // watch: {
  //   'myOrdersList': {
  //     handler() {
  //       if (!this.isFinishedLoad) {
  //         this.reachEnd()
  //       }
  //     },
  //   },
  // },
  data() {
    return {
      myOrdersList: [],
      isFinishedLoad: false,
      loading: false,
      listPage: 1,
      newOrder: false,
    }
  },
  components: {
    ScrollBar,
    OrdersItem,
  },
  beforeDestroy() {
    this.$bus.$off('refreshMyorder')
  },
}
</script>
