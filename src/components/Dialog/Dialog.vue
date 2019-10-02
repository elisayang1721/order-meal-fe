<template lang="pug">
  transition(name="dialog-fade")
    .DialogFrame
      .DialogBg(@click="closeDialog")
      .DialogContent
        .DialogHeader
          .DialogTitle {{componentTitle}}
          .HeaderPanel
            .close(@click="closeDialog")
              i.el-icon-close
        .DialogComponent
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

.DialogFrame
  @extend %setWrapper
  .DialogBg
    +size(100%)
  .DialogContent
    @extend %setCenter
    +Bgc($c1)
  .DialogHeader
    +Bgc(#404040)
    +size(100%,4rem)
    +Flex(space-between)
    position: relative
    padding: 0 1rem
    .DialogTitle
      line-height: 4rem
      color: $c1
    .close
      cursor: pointer
      position: relative
      font-size: 1.5rem
      font-weight: 700
      color: #B3B3B3
  .DialogComponent
    padding: 1rem
</style>
