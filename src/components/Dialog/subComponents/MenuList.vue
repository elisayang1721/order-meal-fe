<template lang="pug">
  ScrollBar#menuList(v-if="menu.length")
    .row
      .cell
        span {{`${storeName} 菜單`}}
    template(v-for="obj in menu")
      .row
        .cell
          span {{obj.menuType}}
      .row(v-for="(item, i) in obj.items" :key="item.cate")
        .cell
          span {{item.cate}}
        .cell
          template(v-if="item.meals.length === 1")
            span {{`$${item.meals[0].price}`}}
          template(v-else)
            span(v-for="meal in item.meals" :key="meal.id") {{`${meal.name} $${meal.price}`}}
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
    }
  },
  data() {
    return {
      menu: []
    }
  },
  components: {
    ScrollBar
  }
}
</script>
