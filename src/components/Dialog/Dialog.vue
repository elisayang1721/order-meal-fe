<template lang="pug">
  transition(name="dialog-fade")
    .dialogFrame(v-if="dialog.length" @click.self="closeDialog")
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
  computed: {
    ...mapState(['dialog']),
    componentName() {
      const maxlength = this.dialog.length - 1
      return this.dialog[maxlength].name
    },
    componentTitle() {
      const maxlength = this.dialog.length - 1
      return this.dialog[maxlength].title
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
      const maxlength = this.dialog.length - 1
      const name = this.dialog[maxlength].name
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
  +Flex()
  .dialogContent
    +Bgc($c1)
    @media(max-width: 1200px),(max-height: 800px)
      +size(100%,100%,null)
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
    @media(max-width: 1200px),(max-height: 800px)
      height: calc(100% - 4rem)
    .confirm, .admin
      min-width: 250px
    .scroll
      max-width: 1200px
      max-height: 800px
      @media(max-width: 1200px),(max-height: 800px)
        max-height: 100%
        height: 100%
</style>
