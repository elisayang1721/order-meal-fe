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
      type: Boolean,
      default: undefined,
    },
    needGoTop: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      scroll: null,
      position: [],
      goTopButton: null,
    }
  },
  mounted() {
    this.init()
    clearTimeout(this.timer)
  },
  methods: {
    init() {
      const vm = this
      if (!this.scroll) {
        let option = {
          plugins: {
            overscroll: {
              effect: 'glow',
            },
          },
        }
        if (this.overscroll) {
          ScrollBar.use(OverscrollPlugin)
          option = {
            plugins: {
              overscroll: {
                onScroll(position) {
                  vm.checkIfReachEnd(position)
                },
                effect: 'glow',
              },
            },
          }
        }
        this.scroll = ScrollBar.init(this.$el, option)
      }
      if (this.needGoTop) {
        this.init_GoTop()
      }
    },
    uninit() {
      if (this.scroll) {
        this.scroll.destroy()
        this.scroll = null
      }
    },
    scrollTo() {
      this.scroll.scrollTo(0, 0, 500)
    },
    init_GoTop() {
      const button = document.createElement('button')
      const text = document.createTextNode('Top')
      button.appendChild(text)
      button.classList.add('backToTop')
      this.goTopButton = button
      this.$el.appendChild(this.goTopButton)
      this.goTopButton.addEventListener('click', this.scrollTo)
    },
    uninit_GoTop() {
      if (this.goTopButton) {
        this.goTopButton.removeEventListener('click', this.scrollTo)
        this.goTopButton = null
      }
    },
    checkIfReachEnd(poistion) {
      if (!poistion.y && this.position[this.position.length - 1] > 0) {
        this.$emit('reachEnd')
        this.position = []
      } else {
        this.position.push(poistion.y)
      }
    },
  },
  watch: {
    'scroll.scrollTop': {
      handler(val) {
        if (this.goTopButton) {
          if (!val) {
            this.goTopButton.classList.remove('goTopShow')
            this.goTopButton.classList.add('goTopHide')
          } else {
            this.goTopButton.classList.remove('goTopHide')
            this.goTopButton.classList.add('goTopShow')
          }
        }
      },
      deep: true,
    },
    'scroll.track.yAxis._isShown': {
      handler(val) {
        if (this.goTopButton) {
          if (!val) {
            this.goTopButton.classList.remove('goTopShow')
          }
        }
      },
    },
  },
  beforeDestroy() {
    this.uninit_GoTop()
    this.uninit()
  },
}
</script>
<style lang="sass" scoped>
.smooth-scroll
  position: relative
  /deep/.scroll-content
    +size(100%,100%,null)
</style>
