<template lang="pug">
  #orderMain
    .orderContainer
      OrderSystem
      OrdersHistory
</template>
<script>
import OrdersHistory from '@v/Order/OrdersHistory'
import OrderSystem from '@v/Order/OrderSystem'

export default {
  name: 'orderMain',
  created() { },
  mounted() { },
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      cmp: OrdersHistory
    }
  },
  components: {
    OrdersHistory,
    OrderSystem
  }
}
</script>
