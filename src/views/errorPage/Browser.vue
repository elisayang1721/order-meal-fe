<template lang="pug">
  #errorPage
    | ie不支援
</template>
<script>
export default {
  name: 'BrowserNotSupported',
  beforeDestroy() {
    window.history.forward()
  }
}
</script>
<style lang="sass" scoped>
</style>
