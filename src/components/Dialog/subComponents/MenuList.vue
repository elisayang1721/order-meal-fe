<template lang="pug">
  ScrollBar#menuList.tableFrame(v-if="menu.length")
    .row
      .cell
        span {{`${storeName} 菜單`}}
    template(v-for="obj in menu")
      .row
        .cell.menuType
          span {{obj.menuType}}
      .row(v-for="(item, i) in obj.items" :key="item.cate")
        .cell
          span {{item.cate}}
        .cell.menuItem
          template(v-if="item.meals.length === 1")
            span {{item.meals[0].price.format()}}
          template(v-else)
            span(v-for="meal in item.meals"
              :key="meal.id") {{`${meal.name} ${meal.price.format()}`}}
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import store from '@api/store'

export default {
  name: 'MenuList',
  props: ['storeId', 'storeName'],
  mounted() {
    this.getMenus()
  },
  methods: {
    getMenus() {
      store.getStoreMenu(this.storeId).then(res => {
        this.menu = res.list
      })
    },
  },
  data() {
    return {
      menu: [],
    }
  },
  components: {
    ScrollBar,
  },
}
</script>
<style lang="sass">
#menuList
  .row
    .cell
      &.menuItem
        flex: 2
        padding: 0.2rem 0.5rem !important
        span
          padding: 0 8px
          margin: 5px 0 !important
          &+span
            border-left: 1px solid #969595
</style>
