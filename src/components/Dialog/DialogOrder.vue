<template lang="pug">
  #order(v-loading="loading")
    .row
      .cell
        span 名稱
      .cell
        span 價格
      .cell
        span 數量
      .cell
        span 說明
    template(v-for="obj in menuList")
      .row
        .cell
          span {{obj.menuType}}
      .row(v-for="(item, i) in obj.items" :key="item.cate")
        .cell
          span {{item.cate}}
        .cell
          template(v-if="item.meals.length === 1")
            span {{item.meals[0].price}}
          template(v-else)
            .radio(v-for="meal in item.meals" :key="meal.id")
              input(type="radio" :value="meal.id" :id="meal.id"
                v-model="orderSet[obj.menuType][i].menuItemId")
              label(:for="meal.id") {{`${meal.name} ${meal.price}`}}
        .cell
          el-input-number(:min="0" v-model="orderSet[obj.menuType][i].amount")
        .cell
          el-input(v-model="orderSet[obj.menuType][i].remark")
    .confirmBlock
      el-button(type="danger") 取消
      el-button(type="success" @click="confirm") 確認
</template>
<script>
import store from '@api/store'
import order from '@api/order'
import { mapActions } from 'vuex'

export default {
  name: 'DialogOrder',
  created() { },
  mounted() {
    this.loading = true
    store.getStoreMenu(this.$store.state.prop.storeId).then(res => {
      this.menuList = res.list
      this.orderInfo()
      this.loading = false
    })
  },
  computed: {},
  methods: {
    ...mapActions(['closeDialog']),
    orderInfo() {
      const orderSet = {}
      this.menuList.forEach(el => {
        orderSet[el.menuType] = orderSet[el.menuType] || []
        el.items.forEach(item => {
          const payLoad = {
            menuItemId: item.meals.length === 1 ? item.meals[0].id : null,
            amount: 0,
            remark: null
          }
          orderSet[el.menuType].push(payLoad)
        })
      })
      this.orderSet = orderSet
    },
    confirm() {
      const load = {
        orders: []
      }
      Object.keys(this.orderSet).forEach(key => {
        this.orderSet[key].forEach(obj => {
          if (obj.amount && obj.menuItemId) {
            load.orders.push(obj)
          }
        })
      })
      if (load.orders.length) {
        order.addOrder(this.$store.state.prop.id, load).then(res => {
          console.log('新增成功')
          this.closeDialog()
          this.$bus.$emit('refreshMyOrderHistory')
        })
      }
    }
  },
  watch: {},
  data() {
    return {
      menuList: [],
      orderSet: {},
      loading: false
    }
  },
  components: {}
}
</script>
<style lang="sass" scoped>
/deep/.el-input-number
  width: 120px
  line-height: 25px
  .el-input-number__decrease,.el-input-number__increase
    line-height: 25px
/deep/.el-input
  input
    height: 25px
    line-height: 25px
</style>
