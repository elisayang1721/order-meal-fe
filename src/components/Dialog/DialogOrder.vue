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
      el-button(type="danger" @click="closeDialog") 取消
      el-button(type="success" @click="confirm") 確認
</template>
<script>
import store from '@api/store'
import order from '@api/order'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'DialogOrder',
  mounted() {
    this.loading = true
    if (this.$store.state.prop.action === 'order') {
      store.getStoreMenu(this.$store.state.prop.storeId).then(res => {
        this.menuList = res.list
        this.orderInfo()
        this.loading = false
      })
    }
    if (this.$store.state.prop.action === 'edit') {
      axios.all([
        store.getStoreMenu(this.$store.state.prop.storeId),
        order.getSingleOrderRecord(this.$store.state.prop.orderId)
      ]).then(axios.spread((menu, item) => {
        this.menuList = menu.list
        this.orderItem = item
        this.orderInfo()
        this.loading = false
      }))
    }
  },
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
          if (this.$store.state.prop.action === 'edit') {
            item.meals.forEach(meal => {
              if (meal.id === this.orderItem.menuItemId) {
                payLoad.menuItemId = this.orderItem.menuItemId
                payLoad.amount = this.orderItem.amount
                payLoad.remark = this.orderItem.remark
              }
            })
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
        if (this.$store.state.prop.action === 'order') {
          order.addOrder(this.$store.state.prop.id, load).then(res => {
            this.$message({
              message: '新增點餐成功',
              type: 'success'
            })
            this.closeDialog()
            this.$bus.$emit('refreshSystem')
            this.$bus.$emit('refreshMyorder')
          })
        } else {
          order.updateOrder(this.$store.state.prop.id, this.$store.state.prop.orderId, load)
            .then(res => {
              this.$message({
                message: '點餐更新成功',
                type: 'success'
              })
              this.closeDialog()
              this.$bus.$emit('refreshSystem')
              this.$bus.$emit('refreshMyorder')
            })
        }
      }
    }
  },
  data() {
    return {
      menuList: [],
      orderSet: {},
      loading: false,
      orderItem: {}
    }
  }
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
