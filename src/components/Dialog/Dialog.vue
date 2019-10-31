<template lang="pug">
  transition(name="dialog-fade")
    .dialogFrame(v-if="dialog.length"
      @click.self="closeDialog"
      :class="{'smallDialog': checkSmallDialog}")
      .dialogContent
        .dialogHeader
          .dialogTitle {{componentTitle}}
          .headerPanel
            .close(@click="closeDialog")
              i.el-icon-close
        .dialogComponent
          ScrollBar.scroll(:needGoTop="goTop")
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
  data() {
    return {
      goTop: false
    }
  },
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
    },
    checkSmallDialog() {
      const name = this.$store.state.dialog[0].name
      return name === 'DialogConfirm' || name === 'DialogAdmin'
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
        if (val.length) {
          if (val[0].name === 'DialogRating') {
            this.goTop = true
          }
        }
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
    +Bgc($ligntGray)
    @media(max-width: 1200px),(max-height: 800px)
      +size(100%,100%,null)
  &.smallDialog
    .dialogContent
      @media(max-width: 1200px),(max-height: 800px)
        width: unset
        height: unset
  .dialogHeader
    +Bgc($brownC1)
    +size(100%,3.5rem)
    +Flex(space-between)
    position: relative
    padding: 0 1rem
    .dialogTitle
      line-height: 3.5rem
      color: $c1
      font-size: 18px
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
