<template lang="pug">
  ScrollBar.listContainer(id="myOrdersFrame"
    @ps-y-reach-end="reachEnd"
    v-loading="loading")
    .contentViewFix
      OrdersItem(v-for="(obj, i) in myOrdersList" :key="i" :myOrderData="obj")
    .loading(v-loading="loading")
</template>
<script>
import order from '@api/order'
import ScrollBar from '@c/ScrollBar/ScrollBar'
import OrdersItem from './OrdersItem'

export default {
  name: 'MyOrdersFrame',
  created() {},
  mounted() {
    this.getList()
    this.$bus.$on('refreshMyOrderHistory', () => {
      this.refreshList()
    })
  },
  computed: {},
  methods: {
    reachEnd() {
      // call API to get more orderList
    },
    getList() {
      this.loading = true
      order.getOrderRecordsList({ page: this.listPage }).then(res => {
        this.myOrdersList = this.myOrdersList ? [...this.myOrdersList, ...res.list] : res.list
        this.loading = false
      })
    },
    refreshList() {
      this.listPage = 1
      this.myOrdersList = []
    }
  },
  watch: {
    'myOrdersList': {
      handler(val, old) {
        if (val.length < 7) {
          // if (this.listPage < 5) {
          //   this.listPage++
          // }
          this.getList()
        }
      }
    }
  },
  data() {
    return {
      myOrdersList: [],
      loading: false,
      listPage: 1
    }
  },
  components: {
    ScrollBar,
    OrdersItem
  }
}
</script>
