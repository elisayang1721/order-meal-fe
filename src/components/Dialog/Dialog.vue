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
          component(:is="componentName")


</template>
<script>

// vuex
import { mapActions, mapState } from 'vuex'

// componentIndex
import componentIndex from './index'

componentIndex()

export default {
  created() { },
  mounted() { },
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
  }
}
</script>
<style lang="sass" scope>
.modal-fade-enter-active
.modal-fade-leave-active
  transition: opacity 0.3s ease

.modal-fade-enter
.modal-fade-leave-to
  opacity: 0

/* transition modal */
.modal-zoom-enter-active
.modal-zoom-leave-active
  transition opacity 0.3s ease

.modal-zoom-enter
.modal-zoom-leave-active
  opacity: 0

.modal-zoom-enter
.modal-zoom-leave-active
  transform: scale(1.1)

.dialogFrame
  @extend %setWrapper
  .dialogBg
    +size(100%)
  .dialogContent
    @extend %setCenter
    +Bgc($c1)
  .dialogHeader
    +Bgc(#404040)
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
</style>
