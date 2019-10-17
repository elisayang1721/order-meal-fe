<template lang="pug">
  section.smooth-scroll
    slot
</template>
<script>
import ScrollBar from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'
import { checkIfReachEnd } from './reachEnd'

export default {
  name: 'ScrollBar',
  props: {
    overscroll: {
      default: undefined
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.scroll) {
        let option = {}
        if (this.overscroll) {
          ScrollBar.use(OverscrollPlugin)
          option = {
            plugins: {
              overscroll: {
                onScroll(position) {
                  checkIfReachEnd(position)
                },
                effect: 'glow'
              }
            }
          }
        }
        this.scroll = ScrollBar.init(this.$el, option)
      }
    },
    uninit() {
      if (this.scroll) {
        this.scroll.destroy()
        this.scroll = null
      }
    }
  },
  beforeDestroy() {
    this.uninit()
  }
}
</script>
<style lang="sass" scoped>
.smooth-scroll
  position: relative
  /deep/.scroll-content
    +size(100%,100%,null)
</style>
