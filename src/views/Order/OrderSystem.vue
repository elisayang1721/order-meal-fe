<template lang="pug">
  #orderSystem
    .progressTitle 進行中的訂單 - {{progressList.length}} 項進行中
    ScrollBar.listContainer(v-loading="loading")
      .contentViewFix
        OrderInProgressItem(v-for="(obj,i) in progressList" :key="i" :list="obj")
</template>
<script>
import OrderForm from '@api/orderForm'
import ScrollBar from '@c/ScrollBar/ScrollBar'
import OrderInProgressItem from './component/OrderInProgressItem'

export default {
  name: 'OrderSystem',
  created() {},
  mounted() {
    this.getOrder()
    this.$bus.$on('refreshSystem', () => {
      this.getOrder()
    })
  },
  methods: {
    getOrder() {
      this.loading = true
      OrderForm.getOrderForm().then(res => {
        this.progressList = res.list
        this.loading = false
      })
    },
  },
  data() {
    return {
      progressList: [],
      loading: false,
    }
  },
  components: {
    OrderInProgressItem,
    ScrollBar,
  },
  beforeDestroy() {
    this.$bus.$off('refreshSystem')
  },
}
</script>
