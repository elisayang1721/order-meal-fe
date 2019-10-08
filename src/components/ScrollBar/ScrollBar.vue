<template lang="pug">
  section.smooth-scroll(data-scrollbar)
    slot
</template>
<script>
import ScrollBar from 'smooth-scrollbar'

export default {
  name: 'ScrollBar',
  mounted() {
    ScrollBar.initAll()
  },
  beforeDestroy() {
    ScrollBar.destroy()
  }
}
</script>
<style lang="sass" scoped>
.smooth-scroll
  position: relative
</style>
