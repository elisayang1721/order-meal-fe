<template lang="pug">
  #order.tableFrame(v-loading="loading")
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
        .cell.menuType
          span {{obj.menuType}}
      .row(v-for="(item, i) in obj.items" :key="item.cate")
        .cell
          span {{item.cate}}
        .cell
          template(v-if="item.meals.length === 1")
            span {{`${item.meals[0].price.format()}`}}
          template(v-else)
            .radio(v-for="meal in item.meals" :key="meal.id"
              @click="setAmount(obj.menuType,i)")
              input(type="radio" :value="meal.id" :id="meal.id"
                v-model="orderSet[obj.menuType][i].menuItemId")
              label(:for="meal.id") {{`${meal.name} ${meal.price.format()}`}}
        .cell
          el-input-number(v-model="orderSet[obj.menuType][i].amount"
            :min="0" :disabled="!orderSet[obj.menuType][i].menuItemId"
            @change="checkAmount(obj.menuType, i,item.meals.length)")
        .cell
          el-input(v-model="orderSet[obj.menuType][i].remark")
    .confirmBlock
      el-button(type="danger" @click="closeDialog") 取消
      el-button(type="success" @click="confirm") 確認
</template>
<script>
import store from '@api/store'
import order from '@api/order'
import debounce from 'lodash/debounce'
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
    } else {
      axios.all([
        store.getStoreMenu(this.$store.state.prop.storeId),
        order.getSingleOrderRecord(this.$store.state.prop.orderId)
      ]).then(axios.spread((menu, item) => {
        this.menuList = menu.list
        this.orderItem = item
        this.orderInfo()
        this.loading = false
      })).catch(() => {
        // handle 資料不同步問題
        this.closeDialog()
      })
    }
  },
  computed: {
    getLoad() {
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
      return load
    }
  },
  methods: {
    ...mapActions(['closeDialog']),
    checkAmount(type, i, length) {
      if (length !== 1 && !this.orderSet[type][i].amount) {
        this.orderSet[type][i].menuItemId = null
      }
    },
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
    addOrder: debounce(vm => {
      order.addOrder(vm.$store.state.prop.id, vm.getLoad).then(() => {
        vm.submitSuccess()
      })
    }, 500),
    updateOrder: debounce(vm => {
      order.updateOrder(vm.$store.state.prop.id, vm.$store.state.prop.orderId, vm.getLoad)
        .then(() => {
          vm.submitSuccess()
        })
    }, 500),
    errorMessage: debounce(vm => {
      vm.$message({
        message: '請至少點選一樣',
        type: 'error'
      })
    }, 500),
    confirm() {
      const vm = this
      if (this.getLoad.orders.length) {
        if (this.$store.state.prop.action === 'order') {
          this.addOrder(vm)
        } else {
          this.updateOrder(vm)
        }
      } else {
        this.errorMessage(vm)
      }
    },
    setAmount(type, i) {
      this.orderSet[type][i].amount = 1
    },
    submitSuccess() {
      let message = ''
      if (this.$store.state.prop.action === 'order') {
        message = '新增點餐成功'
      } else {
        message = '點餐更新成功'
      }
      this.$message({
        message,
        type: 'success'
      })
      this.$bus.$emit('refreshSystem')
      this.$bus.$emit('refreshMyorder')
      this.closeDialog()
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
    top: 0
    height: 28px
    line-height: 25px
    background: #efebea
    color: #4e3636
    &:hover
      color: $c1
      background: $tableHeadColor
  .el-input-number__decrease.is-disabled, .el-input-number__increase.is-disabled
    color: #C0C4CC
    background: #efebea
  .el-input-number__decrease
    left: 0
    border-right: 1px solid $tableLineColor
    &:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled)
      border-color: $tableLineColor
  .el-input-number__increase
    right: 0
    border-left: 1px solid $tableLineColor
    &:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled)
      border-color: $tableLineColor
/deep/.el-input__inner
  padding: 0 10px
/deep/.el-input
  input
    height: 28px
    line-height: 28px
    background: #f7f7f7
    border-color: $tableLineColor
#order
  .confirmBlock
    border-left: none
</style>
