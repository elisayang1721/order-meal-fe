<template lang="pug">
  transition(name="dialog-fade")
    .dialogFrame(v-if="componentName")
      .dialogBg(@click="closeDialog")
      .dialogContent
        .dialogHeader
          .dialogTitle {{componentTitle}}
          .headerPanel
            .close(@click="closeDialog")
              i.el-icon-close
        .dialogComponent
          ScrollBar.scroll
            .viewFix(:class="sliceName()")
              component(:is="componentName")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
// vuex
import { mapActions, mapState } from 'vuex'

// componentIndex
import componentIndex from './index'

componentIndex()

export default {
  components: {
    ScrollBar
  },
  mounted() {},
  computed: {
    ...mapState(['dialog']),
    componentName() {
      return this.dialog.name
    },
    componentTitle() {
      return this.dialog.title
    }
  },
  methods: {
    ...mapActions(['closeDialog']),
    dailogFixed(name) {
      const html = document.getElementsByTagName('html')
      if (name) {
        html[0].classList.add('noScroll')
      } else {
        html[0].classList.remove('noScroll')
      }
    },
    sliceName() {
      const name = this.dialog.name
      const className = name.toLowerCase().split('dialog')
      return className
    }
  },
  watch: {
    'dialog': {
      handler(val) {
        this.dailogFixed(val.name)
      },
      deep: true
    }
  }
}
</script>
<style lang="sass" scope>
.dialogFrame
  @extend %setWrapper
  .dialogBg
    +size(100%)
  .dialogContent
    @extend %setCenter
    +Bgc($c1)
  .dialogHeader
    +Bgc(#b24242)
    +size(100%,4rem)
    +Flex(space-between)
    position: relative
    padding: 0 1rem
    .dialogTitle
      line-height: 4rem
      color: $c1
    .close
      cursor: pointer
      position: relative
      font-size: 1.5rem
      font-weight: 700
      color: $c1
  .dialogComponent
    padding: 1rem
    overflow: hidden
    .confirm, .admin
      min-width: 250px
    .scroll
      max-width: 1000px
      max-height: 600px
</style>
