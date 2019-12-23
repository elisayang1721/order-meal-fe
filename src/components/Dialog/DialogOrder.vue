<template lang="pug">
  #order.tableFrame(v-loading="loading")
    .row
      .cell
        span 名稱
      .cell
        span 項目價格
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
        .cell.price
          template(v-if="item.meals.length === 1")
            span {{`${item.meals[0].price.format()}`}}
          template(v-else)
            el-radio-group(v-model="orderSet[obj.menuType][i].menuItemId")
              el-radio.input-radio(v-for="meal in item.meals" :label="meal.id" :key="meal.id"
                @change="setAmount(obj.menuType,i)") {{`${meal.name} ${meal.price.format()}`}}
        .cell.toolTip
          el-input-number(v-model="orderSet[obj.menuType][i].amount"
            :min="0" :max="99" :disabled="!orderSet[obj.menuType][i].menuItemId"
            :class="{focus: orderSet[obj.menuType][i].isFocus}"
            @change="checkAmount(obj.menuType, i,item.meals.length)")
          template(v-if="!orderSet[obj.menuType][i].menuItemId")
            .remark 請先點選左側項目
        .cell(@mouseover="checkOrder(obj.menuType,i)" @mouseout="resetOrderSet()")
          el-input(v-model="orderSet[obj.menuType][i].remark"
          maxlength="25"
          :disabled="checkIfOrdered(obj.menuType,i)")
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
    this.$bus.$on('sendOrderForm', () => {
      this.confirm()
    })
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
      this.orderSet[type][i].isFocus = false
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
            remark: null,
            isFocus: false
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
      this.orderSet[type][i].isFocus = false
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
      this.$bus.$emit('refreshMyorder', true)
      this.$bus.$emit('refreshUserExpenses')
      this.closeDialog()
    },
    checkIfOrdered(type, i) {
      return this.orderSet[type][i].amount === 0
    },
    checkOrder(type, i) {
      this.resetOrderSet()
      const orderRow = this.orderSet[type][i]
      if (!orderRow.menuItemId && !orderRow.amount) {
        this.orderSet[type][i].isFocus = true
      } else if (!orderRow.amount) {
        this.orderSet[type][i].isFocus = true
      }
    },
    resetOrderSet() {
      Object.keys(this.orderSet).forEach(key => {
        this.orderSet[key].forEach(obj => {
          const list = obj
          list.isFocus = false
        })
      })
    }
  },
  data() {
    return {
      menuList: [],
      orderSet: {},
      loading: false,
      orderItem: {},
      isOrder: Number,
      isMenuType: ''
    }
  },
  beforeDestroy() {
    this.$bus.$off('sendOrderForm')
  }
}
</script>
<style lang="sass" scoped>
/deep/.el-input-number
  width: 120px
  line-height: 25px
  &.focus
    .el-input__inner
      border-color: #c75656
      transition: border-color .2s cubic-bezier(.645,.045,.355,1)
    .el-input-number__decrease
      border-color: #c75656
      transition: border-color .2s cubic-bezier(.645,.045,.355,1)
    .el-input-number__increase
      border-color: #c75656
      transition: border-color .2s cubic-bezier(.645,.045,.355,1)
  .el-input-number__decrease,.el-input-number__increase
    top: 0
    height: 28px
    line-height: 25px
    background: #bfb6b3
    background: #a69a9a
    color: #fff
    &:hover
      color: $c1
      background: #837272
  &.is-disabled
    .el-input-number__decrease, .el-input-number__increase
      color: #d0c9c9
      background: #f3f0ef
  .el-input-number__decrease.is-disabled, .el-input-number__increase.is-disabled
      color: #d0c9c9
      background: #f3f0ef
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
/deep/.el-radio-group
  display: inline-flex
  flex-wrap: wrap
/deep/.el-radio__label
  padding-left: 8px
#order
  .confirmBlock
    border-left: none
</style>
