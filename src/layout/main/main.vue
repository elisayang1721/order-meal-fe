<template>
  <div>
    <OrderInProgress></OrderInProgress>
    <RightLayout></RightLayout>
  </div>
</template>
<script>
import OrderInProgress from '@v/LeftContent/OrderInProgress/orderInProgress'
import RightLayout from '@v/RightContent/RightLayout'

export default {
  components: {
    OrderInProgress,
    RightLayout,
  },
}
</script>
