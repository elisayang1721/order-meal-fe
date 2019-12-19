<template lang="pug">
  #OrderMerge
    .infoBlock      
      .infoDetail
        ul
          li 全部：
          li {{`共 ${getSummery.total} 項，`}}
          li {{`共 ${getSummery.price.format()} 元`}}
        el-button.export-button(type="info" @click="getDebounce"
          :disabled="checkDisable") 匯出合併訂單
      .checkBlock
        el-checkbox-group(v-model="checked")
          el-checkbox(v-for="list in orderList.list" :key="list.id"
            :label="list.id")
            span {{`發起人： ${list.ownerName} `}}
            span {{list.storeName}}
            span {{list.createdOn}}
    .listBlock(v-loading="loading")
      .listTable.tableFrame(v-if="checked.length")
        .row
          .cell
            span 訂購人
          .cell
            span 訂購資訊
          .cell
            span 總價
        .listBody(v-if="listTotal.length")
          .row(v-for="(obj,i) in listTotal" :key="i")
            .cell
              span {{obj.name}}
            .cell
              ul
                li(v-for="(order, idx) in obj.meals"
                  :key="idx") {{`${order.cate} $${order.price}元 x ${order.amount}`}}
            .cell
              span {{getOrderPrice(obj.meals)}}
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import { exportExcel } from '@js/model'
import mergeOrder from '@api/mergeOrder'
import debounce from 'lodash/debounce'

export default {
  name: 'DialogMergeOrder',
  mounted() {
    mergeOrder.updateMergeOptions().then(res => {
      this.orderList = res
    })
  },
  computed: {
    getSummery() {
      let total = 0
      let price = 0
      this.listTotal.forEach(obj => {
        obj.meals.forEach(el => {
          total += el.amount
          price += el.price * el.amount
        })
      })
      return { total, price }
    },
    checkDisable() {
      return !this.checked.length
    },
    getOrderId() {
      const orderId = {
        orderId: this.checked
      }
      return orderId
    }
  },
  methods: {
    getOrderPrice(order) {
      let price = 0
      order.forEach(el => {
        price += el.price * el.amount
      })
      return price.format()
    },
    getMergeOrder: debounce(vm => {
      vm.loading = true
      mergeOrder.getMergeTotal(vm.getOrderId).then(res => {
        vm.listTotal = res.list
        vm.loading = false
      })
    }, 500),
    getDebounce() {
      const vm = this
      this.exportMergeOrder(vm)
    },
    exportMergeOrder: debounce(vm => {
      mergeOrder.exportExcel(vm.getOrderId).then(res => {
        exportExcel(res)
      })
    }, 500),
    neededTitle(info) {
      return info.length > 10 ? info : ''
    }
  },
  watch: {
    'checked': {
      handler() {
        this.listTotal = []
        const vm = this
        this.getMergeOrder(vm)
      }
    }
  },
  data() {
    return {
      orderList: {},
      listTotal: [],
      checked: [],
      loading: false
    }
  },
  components: {
    ScrollBar
  }
}
</script>
<style lang="sass" scoped>
#OrderMerge
  /deep/ .scroll-content
    +Flex(flex-start,strech)
    flex-wrap: wrap
    height: unset
  .export-button
    width: 100px
  .infoDetail
    ul
      li
        display: inline-block
        &+li
          margin-left: 8px
/deep/.el-checkbox-group
  display: flex
  justify-content: flex-start
  flex-wrap: wrap
  margin-left: 0
  .el-checkbox
    min-width: 223px
    +Flex()
    justify-content: flex-start
    margin-top: .2rem
    margin-right: .85rem
    margin-bottom: .5rem
    padding: .35rem .45rem .35rem .55rem
    border-radius: 4px
    border-left: 4px solid $brownC2
    background: #fff
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15)
    .el-checkbox__input
      display: none
      &.is-checked
        &+.el-checkbox__label
          color: $c1
    .el-checkbox__label
      +Flex()
      flex-direction: column
      padding-left: unset
      width: 100%
      span
        display: block
        width: 100%
        &:nth-child(2)
          font-size: 16px
          font-weight: 700
          margin: 6px 0
        &:last-child
          text-align: right
          font-size: 13px
    &.is-checked
      box-shadow: unset
      background: $brownC2
</style>
