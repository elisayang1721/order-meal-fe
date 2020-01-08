<template lang="pug">
  .commonTabs
    .commonTab-wrap
      .commonTab(v-for="(item, index) in tabs"
        @click="clickTabs(item.name)"
        :class="{'active' : active === item.name }"
        :style="(`z-index: ${ 98 - index } `)") {{item.title}}

</template>
<script>
export default {
  name: 'tab',
  props: {
    tabs: Array,
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
    },
  },
  data() {
    return {
      active: '',
    }
  },
}
</script>
<style lang="sass">
// tabs
.commonTabs
  position: relative
  z-index: 5
  background: #efebea
  border-bottom: 1px solid $tableLineColor
  .commonTab-wrap
    +Flex(flex-start)
    margin-bottom: -1px
    overflow: hidden
  .commonTab
    cursor: pointer
    position: relative
    z-index: 2
    color: #f7f3f3
    background: #908480
    padding: 1.2rem 1.8rem
    white-space: nowrap
    border-right: 1px solid $tableLineColor
    &:hover
      background: #81736e
    &.active
      font-weight: 700
      color: $brownC1
      background: $ligntGray
      z-index: 98 !important
      box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.15)
</style>
