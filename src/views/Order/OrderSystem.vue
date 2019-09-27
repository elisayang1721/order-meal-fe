<template lang="pug">
  #orderSystem
    .progressTitle 進行中的訂單 - {{progress.length}} 項進行中
    VuePerfectScrollBar.listContainer
      .contentViewFix
        OrderInProgressItem(v-for="obj in progress" :key="obj" :listData="obj")
</template>
<script>
import VuePerfectScrollBar from 'vue-perfect-scrollbar'
import OrderInProgressItem from './component/orderInProgressItem'

export default {
  name: 'OrderSystem',
  created() { },
  mounted() { },
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      progress: [
        '1',
        '2',
        '3',
        '4',
        '5'
      ]
    }
  },
  components: {
    VuePerfectScrollBar,
    OrderInProgressItem
  }
}
</script>
