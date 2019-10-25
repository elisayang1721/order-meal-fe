<template lang="pug">
  #OrderMerge.tabContainer
    .infoBlock
      .checkBlock
        el-checkbox-group(v-model="checked")
          el-checkbox(v-for="list in orderList.list" :key="list.id"
            :label="list.id")
            span {{list.orderName.split(',')[0]}}
            span {{list.orderName.split(',')[1]}}
      .infoDetail
        ul
          li {{`全部共 ${getSummery.total} 項`}}
          li {{`全部共 ${getSummery.price} 元`}}
        el-button(type="primary" @click="exportMergeOrder"
          :disabled="checkDisable") 匯出合併訂單
    .listBlock(v-loading="loading")
      .listTable(v-if="checked.length")
        .row
          .cell
            span 訂購人
          .cell
            span 訂購資訊
          .cell
            span 總價
          .cell(class="toggleHead")
            span 訂購人
          .cell(class="toggleHead")
            span 訂購資訊
          .cell(class="toggleHead")
            span 總價
        ScrollBar.listBody(v-if="listTotal.length")
          .row(v-for="(obj,i) in listTotal" :key="i")
            .cell
              span {{obj.name}}
            .cell
              ul
                li(v-for="(order, idx) in obj.meals"
                  :key="idx") {{`${order.cate} ${order.price}元 x${order.amount}`}}
            .cell
              span {{`${getOrderPrice(obj.meals)}元`}}
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import { exportExcel } from '@js/model'
import mergeOrder from '@api/mergeOrder'
import debounce from 'lodash/debounce'

export default {
  name: 'OrderMerge',
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
    }
  },
  methods: {
    getOrderPrice(order) {
      let price = 0
      order.forEach(el => {
        price += el.price * el.amount
      })
      return price
    },
    getMergeOrder: debounce(function (orderId) {
      this.loading = true
      mergeOrder.getMergeTotal(orderId).then(res => {
        this.listTotal = res.list
        this.loading = false
      })
    }, 500),
    exportMergeOrder() {
      if (!this.checked.length) {
        // 若無選擇合併訂單，則return
        return
      }
      const orderId = {
        orderId: this.checked
      }
      mergeOrder.exportExcel(orderId).then(res => {
        exportExcel(res)
      })
    }
  },
  watch: {
    'checked': {
      handler(val) {
        this.listTotal = []
        const orderId = {
          orderId: val
        }
        this.getMergeOrder(orderId)
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
/deep/.el-checkbox-group
  display: flex
  justify-content: flex-start
  flex-wrap: wrap
  .el-checkbox
    width: 200px
    +Flex()
    margin: .2rem
    padding: .2rem
    box-shadow: 0px 4px rgba(#000, .2)
    border-radius: 4px
    border: 1px solid #000
    .el-checkbox__input
      display: none
    .el-checkbox__label
      +Flex()
      flex-direction: column
      padding-left: unset
    &.is-checked
      box-shadow: unset
      transform: translateY(4px)
      border-color: #409EFF
</style>
