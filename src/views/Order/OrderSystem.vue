<template lang="pug">
  #orderSystem
    .progressTitle 進行中的訂單 - {{progress.length}} 項進行中
    ScrollBar.listContainer
      .contentViewFix
        OrderInProgressItem(v-for="obj in progress" :key="obj" :listData="obj")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import OrderInProgressItem from './component/OrderInProgressItem'

export default {
  name: 'OrderSystem',
  created() {},
  mounted() {},
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
        '5',
        '6'
      ]
    }
  },
  components: {
    OrderInProgressItem,
    ScrollBar
  }
}
</script>
