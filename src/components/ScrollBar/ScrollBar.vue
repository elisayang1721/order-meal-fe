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
    },
    needGoTop: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      scroll: null,
      position: [],
      goTopButton: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const vm = this
      if (!this.scroll) {
        let option = {
          plugins: {
            overscroll: {
              effect: 'glow'
            }
          }
        }
        if (this.overscroll) {
          ScrollBar.use(OverscrollPlugin)
          option = {
            plugins: {
              overscroll: {
                onScroll(position) {
                  vm.checkIfReachEnd(position)
                },
                effect: 'glow'
              }
            }
          }
        }
        this.scroll = ScrollBar.init(this.$el, option)
        if (this.needGoTop) {
          this.init_GoTop()
        }
      }
    },
    uninit() {
      if (this.scroll) {
        this.scroll.destroy()
        this.scroll = null
      }
    },
    init_GoTop() {
      const button = document.createElement('button')
      const text = document.createTextNode('backToTop')
      button.appendChild(text)
      button.classList.add('backToTop')
      this.goTopButton = button
      this.$el.appendChild(this.goTopButton)
      this.goTopButton.addEventListener('click', () => {
        this.scroll.scrollTop = 0
      })
    },
    uninit_GoTop() {
      if (this.goTopButton) {
        this.goTopButton.removeEventListener('click', () => {})
        this.goTopButton = null
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
    }
  },
  watch: {
    'scroll.scrollTop': {
      handler(val) {
        if (this.goTopButton) {
          if (!val) {
            this.goTopButton.classList.add('goTopHide')
          } else {
            this.goTopButton.classList.remove('goTopHide')
          }
        }
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.uninit()
    this.uninit_GoTop()
  }
}
</script>
<style lang="sass" scoped>
.smooth-scroll
  position: relative
  /deep/.scroll-content
    +size(100%,100%,null)
</style>
