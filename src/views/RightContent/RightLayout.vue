<template>
  <div>
    RightLayout
    <ordersHistory></ordersHistory>
    <mealsOrderHistory></mealsOrderHistory>
  </div>
</template>
<script>
import ordersHistory from './OrdersHistory/ordersHistory'
import mealsOrderHistory from './mealsOrderHistory/mealsOrderHistory'

export default {
  components: {
    ordersHistory,
    mealsOrderHistory,
  },
}
</script>
