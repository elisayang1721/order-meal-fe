<template lang="pug">
  ScrollBar.listContainer(id="myOrdersFrame"
    :overscroll="true",
    :dom="$el")
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
  mounted() {
    this.getList()
    this.$bus.$on('refreshMyorder', () => {
      this.refreshList()
    })
    this.$el.addEventListener('reachEnd', this.reachEnd)
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
      })
    },
    refreshList() {
      this.listPage = 1
      this.myOrdersList = []
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
      listPage: 1
    }
  },
  components: {
    ScrollBar,
    OrdersItem
  },
  beforeDestroy() {
    this.$bus.$off('refreshMyorder')
    this.$el.removeEventListener('reachEnd', this.reachEnd)
  }
}
</script>
