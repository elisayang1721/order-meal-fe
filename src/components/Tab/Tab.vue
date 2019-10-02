<template lang="pug">
  .commonTabs
    .commonTab(v-for="(item,index) in tabs"
      @click="clickTabs(item.name)"
      :class="{'active' : active === item.name }"
      :style="(`z-index: ${ 98 - index} `)") {{item.title}}

</template>
<script>
export default {
  name: 'tab',
  props: {
    tabs: Array
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$options.parent.active = this.tabs[0].name
      this.active = this.tabs[0].name
    },
    clickTabs(item) {
      this.$options.parent.active = item
      this.active = item
    }
  },
  watch: {},
  data() {
    return {
      active: ''
    }
  }
}
</script>
<style lang="sass">
// tabs
.commonTabs
  +Flex(flex-start)
  position: relative
  z-index: 5
  &:before
    content: ''
    +size(100%,5px)
    +PosAbs(null,0,-5px,0,99)
    +Bgc($c2)
  .commonTab
    cursor: pointer
    position: relative
    z-index: 2
    color: $c2
    padding: 1rem 3rem
    &:before
      content: ''
      +PosAbs(0,0,0,0,-1)
      +Bgc($c1)
      border-radius: 0.5em .5em 0 0
      box-shadow: 0px -5px 10px 1px rgba(0,0,0,.25)
      transform: perspective(12px) rotateX(5deg)
      transition: all .25s ease
    &.active
      color: $c1
      z-index: 98 !important
      &:before
        +Bgc($c2)
    &:first-of-type
      margin-left: 1.5rem

</style>
