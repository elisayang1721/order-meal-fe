<template lang="pug">
  ScrollBar.listContainer(id="myOrdersFrame"
    :overscroll="true"
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
    this.$bus.$on('refreshMyorder', () => {
      this.refreshList()
    })
    window.addEventListener('reachEnd', () => {
      this.reachEnd()
    })
  },
  computed: {},
  methods: {
    reachEnd() {
      // call API to get more orderList
      if (this.listPage < 4) {
        this.listPage++
        // const data = {
        //   createdOn: '2019-10-16',
        //   storeName: '條條有理',
        //   meals: [{
        //     item: '乾麵 $60 X7',
        //     remark: null
        //   }]
        // }
        // for (let i = 0; i < 5; i++) {
        //   this.myOrdersList.push(data)
        // }
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
      handler(val, old) {
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
    window.removeEventListener('reachEnd')
  }
}
</script>
