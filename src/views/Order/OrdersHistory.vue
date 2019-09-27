<template lang="pug">
  #ordersHistory
    .progressTitle 進行中的訂單 -  項進行中
    VuePerfectScrollBar.listContainer
      .contentViewFix
</template>
<script>
import VuePerfectScrollBar from 'vue-perfect-scrollbar'

export default {
  name: 'OrderHistory',
  created() { },
  mounted() { },
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      }
    }
  },
  components: {
    VuePerfectScrollBar
  }
}
</script>
