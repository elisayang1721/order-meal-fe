<template lang="pug">
  transition(name="dailog-fade")
    .DailogFrame
      .DailogBg(@click="closeDailog")
      .DailogContent
        .DailogHeader
          .DailogTitle {{componentTitle}}
          .HeaderPanel
            .close(@click="closeDailog")
              i.el-icon-close
        .DailogComponent
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
    ...mapState(['dailog']),
    componentName() {
      return this.dailog.name
    },
    componentTitle() {
      return this.dailog.title
    }
  },
  methods: {
    ...mapActions(['closeDailog'])
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

.DailogFrame
  @extend %setWrapper
  .DailogBg
    +size(100%)
  .DailogContent
    @extend %setCenter
    +Bgc($c1)
  .DailogHeader
    +Bgc(#404040)
    +size(100%,4rem)
    +Flex(space-between)
    position: relative
    padding: 0 1rem
    .DailogTitle
      line-height: 4rem
      color: $c1
    .close
      cursor: pointer
      position: relative
      font-size: 1.5rem
      font-weight: 700
      color: #B3B3B3
  .DailogComponent
    padding: 1rem
</style>
