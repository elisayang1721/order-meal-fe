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
    this.$bus.$on('refreshMyorder', (type) => {
      this.refreshList(type)
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
        console.log(this.myOrdersList)
        this.loading = false
      })
    },
    refreshList(type) {
      this.listPage = 0
      this.myOrdersList = []
      this.newOrder = type
      setTimeout(() => {
        this.newOrder = false
      }, 3500)

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
