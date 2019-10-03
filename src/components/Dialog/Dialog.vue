<template lang="pug">
  transition(name="dialog-fade")
    .dialogFrame
      .dialogBg(@click="closeDialog")
      .dialogContent
        .dialogHeader
          .dialogTitle {{componentTitle}}
          .headerPanel
            .close(@click="closeDialog")
              i.el-icon-close
        .dialogComponent
          ScrollBar.scroll
            .viewFix
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
  created() {},
  mounted() {
    const html = document.getElementsByTagName('html')
    html[0].classList.add('noScroll')
  },
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
    ...mapActions(['closeDialog'])
  },
  beforeDestroy() {
    const html = document.getElementsByTagName('html')
    html[0].classList.remove('noScroll')
  }
}
</script>
<style lang="sass" scope>
// .dialog-fade-enter-active
// .dialog-fade-leave-active
//   transition: opacity 2.3s ease

// .dialog-fade-enter
// .dialog-fade-leave-to
//   opacity: 0

/* transition modal */
// .dialog-zoom-enter-active
// .dialog-zoom-leave-active
//   transition opacity 0.3s ease

// .dialog-zoom-enter
// .dialog-zoom-leave-active
//   opacity: 0

// .dialog-zoom-enter
// .dialog-zoom-leave-active
//   transform: scale(3)

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
      color: #B3B3B3
  .dialogComponent
    padding: 1rem
    .scroll
      max-width: 1000px
      max-height: 600px
</style>
