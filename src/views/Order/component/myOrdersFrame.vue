<template lang="pug">
  ScrollBar.listContainer(id="myOrdersFrame" @ps-y-reach-end="reachEnd")
    .contentViewFix
      ordersItem(v-for="i in myOrdersList.length" :key="i")
    .loading(v-loading="loading")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import ordersItem from './ordersItem'

export default {
  name: 'myOrdersFrame',
  created() {},
  mounted() {},
  computed: {},
  methods: {
    reachEnd() {
      if (this.myOrdersList.length < 30) {
        this.loading = true
        setTimeout(() => {
          for (let i = 0; i < 7; i++) {
            this.myOrdersList.push('1')
          }
          this.loading = false
        }, 2000)
      }
    }
  },
  watch: {},
  data() {
    return {
      myOrdersList: [
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1'
      ],
      loading: false
    }
  },
  components: {
    ScrollBar,
    ordersItem
  }
}
</script>
