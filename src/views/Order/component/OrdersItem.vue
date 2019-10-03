<template lang="pug">
  .itemWrapper
    .list
      .navHead
        ul
          li 09/30 (一)
          li 八方雲集
      .content
        ul
          li {{`酸辣湯餃 $70 x1 不加醋`}}
          li {{`酸辣湯餃 $70 x1 不加醋`}}
          li {{`酸辣湯餃 $70 x1 不加醋`}}
          li {{`酸辣湯餃 $70 x1 不加醋`}}
          li {{`酸辣湯餃 $70 x1 不加醋`}}
        //- el-button(type="primary") 評比
</template>
<script>
export default {
  name: 'OrdersItem',
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {}
  },
  components: {}
}
</script>
<style lang="sass" scoped>
  .itemWrapper
    height: unset
    +BrdRad(8px,8px,0,0)
    .list
      .navHead
        background-color: #8b8b8b
</style>
