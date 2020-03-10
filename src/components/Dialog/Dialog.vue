<template lang="pug">
  transition(name="dialog-fade")
    .dialogFrame(v-if="dialog.length"
      @click.self="close"
      :class="{'smallDialog': checkSmallDialog}")
      .dialogContent
        .dialogHeader
          .dialogTitle {{componentTitle}}
          .headerPanel
            .close(@click="close")
              i.el-icon-close
        .dialogComponent(
          :class="{'order': componentName === 'DialogOrder','rating': ratingClassCheck }")
          ScrollBar.scroll(:needGoTop="goTop")
            .viewFix(:class="sliceName()")
              component(
                :is="componentName"
                :ref="componentName"
                @getOrderCost="getOrderCost"
              )
          template(v-if="componentName === 'DialogOrder' || isNeededFooter")
            .submitWrap
              template(
                v-if="componentName === 'DialogOrder'"
              )
                .amount {{ `金額小計： ${totalAmount.format()}` }}
              el-button(
                type="danger"
                @click="close") {{componentName === 'DialogRating' ? '關閉' : '取消'}}
              el-button(
                type="success"
                @click="sendConfirm") {{componentName === 'DialogRating' ? '儲存' : '確定'}}
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
      goTop: false,
      isNeededFooter: false,
      totalAmount: 0,
    }
  },
  components: {
    ScrollBar,
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
    },
    ratingClassCheck() {
      return this.componentName === 'DialogRating' && this.isNeededFooter
    },
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyup)
    this.$bus.$on('AddFooter', this.setFooter)
  },
  methods: {
    ...mapActions(['closeDialog']),
    getOrderCost(val) {
      this.totalAmount = val
    },
    close() {
      this.isNeededFooter = false
      this.closeDialog()
    },
    setFooter() {
      this.isNeededFooter = true
    },
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
    },
    sendConfirm() {
      if (this.componentName === 'DialogOrder') {
        this.$refs[this.componentName].confirm()
      }
      if (this.componentName === 'DialogRating') {
        this.$refs[this.componentName].triggerSubmitDebounce()
      }
    },
    handleKeyup(event) {
      const e = event || window.event
      if (!e) return
      const key = e.key
      if (key === 'Escape') {
        this.closeDialog()
      }
    },
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
      deep: true,
    },
    '$store.state.dialog': {
      handler(val) {
        if (!val.length) {
          this.goTop = false
        }
      },
    },
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyup)
    this.$bus.$off('AddFooter')
  },
}
</script>
<style lang="sass" scope>
.dialogFrame
  @extend %setWrapper
  +Flex()
  z-index: 2000
  .commonBtnGroup
    border-bottom: 1px solid $tableLineColor
    .el-button
      width: 70px
  .dialogContent
    position: relative
    +Bgc($ligntGray)
    overflow: hidden
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
    background: $ligntGray
    @media(max-width: 1200px),(max-height: 800px)
      height: calc(100% - 4rem)
    .confirm, .admin
      min-width: 250px
    .scroll
      padding: 0 0.7rem 0 0
      max-width: 1200px
      max-height: 800px
      @media(max-width: 1200px),(max-height: 800px)
        max-height: 100%
        max-width: 100%
        height: 100%
    &.order,&.rating
      padding-bottom: 74px
      .scroll
        max-height: 75vh
  .submitWrap
    +Flex(flex-end,center)
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border: 0
    border-top: 1px solid #e6dedb
    box-shadow: 0 -5px 5px rgba(230, 230, 230, 0.4)
    padding: .6rem 1rem
    background: $c1
    .el-button
      width: 80px
    .amount
      margin-right: 20px
</style>
