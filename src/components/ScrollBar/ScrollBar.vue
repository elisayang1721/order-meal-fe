<template lang="pug">
  section.smooth-scroll
    slot
</template>
<script>
import ScrollBar from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'

export default {
  name: 'ScrollBar',
  props: {
    overscroll: {
      default: undefined
    },
    dom: {
      default: null
    }
  },
  data() {
    return {
      scroll: null,
      position: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const vue = this
      if (!this.scroll) {
        let option = {}
        if (this.overscroll) {
          ScrollBar.use(OverscrollPlugin)
          option = {
            plugins: {
              overscroll: {
                onScroll(position) {
                  vue.checkIfReachEnd(position)
                }
              }
            }
          }
        }
        this.scroll = ScrollBar.init(this.$el, option)
      }
    },
    checkIfReachEnd(p) {
      if (!p.y && this.position[this.position.length - 1] > 0) {
        const event = new Event('reachEnd')
        this.dom.dispatchEvent(event)
        this.position = []
      } else {
        this.position.push(p.y)
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
