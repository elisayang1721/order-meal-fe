<template lang="pug">
  #detail.tableFrame(v-loading="loading")
    .row.heading
      .cell
        span 品項
      .cell
        span 數量
      .cell
        span 單價
      .cell
        div
          span 訂購者
          el-tooltip(effect="light" placement="bottom")
            ul.explanation(slot="content")
              li
                span.bg-yellow
                span － 黃底的項目表示第一次訂購
              li
                span.bg-green
                span － 綠底的項目表示加訂
              li
                span.bg-active
                span － 點選訂購人，該項目會變成紅底表示已向店家確認點餐
              li
                span.border-red
                span － 紅色外框表示該項目為自己訂購
              li
                span.font-blue 藍色文字
                span － 藍色文字表示該項目的說明
            i.el-icon-question
    template(v-if="ordersDetail.length")
      .memList
        .row(v-for="(item, idx) in ordersDetail" :key="idx")
          .cell
            span {{checkItemName(item.itemName)}}
          .cell
            span {{item.totalAmount}}
          .cell
            span {{item.price.format()}}
          .cell.flexFix.subscriberInfo(:key="orderTableKey")
            .subscriberCell(v-for="(obj, i) in item.orderRecords" :key="obj.id"
              :class="recordClass(obj)"
              @click="getDebounce(obj, idx)")
              template(v-if="obj.remark")
                el-tooltip( effect="dark" placement="top-start")
                  div(slot="content") {{obj.remark}}
                  el-button
                    span {{`${obj.memberName} x${obj.amount}`}}
                    span.font-blue {{obj.remark}}
                    EditBlock(@edit='edit(obj.id)' @confirmDelete="confirmDelete(obj.id)")
              template(v-else)
                el-button
                  span {{`${obj.memberName} x${obj.amount}`}}
                  span.font-blue {{obj.remark}}
                  EditBlock(@edit='edit(obj.id)' @confirmDelete="confirmDelete(obj.id)")
    template(v-else)
      .noComment 目前尚未有任何點餐
    .selectAmount(
      v-if="this.orderCost != 0"
    ) {{ `選取餐點總計：${this.orderCost.format()}` }}
</template>
<script>
import history from '@api/history'
import order from '@api/order'
import debounce from 'lodash/debounce'
import { shallowClone, injectState } from '@js/model'
import { mapActions } from 'vuex'
import EditBlock from './subComponents/EditBlock'

export default {
  name: 'DialogDetail',
  mounted() {
    this.getRecordsInfo()
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    this.owner = this.$store.state.prop.owner
  },
  methods: {
    ...mapActions(['showDialog']),
    getRecordsInfo() {
      this.loading = true
      history.getRecordsInfo(this.$store.state.prop.id).then(res => {
        this.ordersDetail = res.list
        this.loading = false
      })
    },
    getDebounce(obj, idx) {
      const vm = this
      if (!this.orderOwnerEnter) {
        this.orderCount(obj, idx, vm)
      } else if (this.userData.isAdmin || this.userData.memberName === this.owner) {
        this.orderSubmit(obj, vm)
      }
    },
    orderCount(obj, idx) {
      obj.enable = !obj.enable
      const price = this.ordersDetail[idx].price
      const amount = obj.amount

      if (obj.enable) {
        this.orderCost += amount * price
      } else {
        this.orderCost -= amount * price
      }
    },
    orderSubmit: debounce((obj, vm) => {
      obj.status = !obj.status
      order.updateOrderStatus(obj.id, { status: obj.status }).then(() => {
        vm.$bus.$emit('updateOrderAmount', { status: obj.status, cal: obj.amount })
      })
      vm.orderTableKey = Math.random()
    }, 300),
    checkPermission(name) {
      const role = this.userData.memberName
      if (this.orderOwnerEnter) {
        return this.userData.isAdmin || role === this.owner || role === name
      }
      return role === name
    },
    recordClass(obj) {
      const classNames = []
      const classList = {
        isAdditional: 'bg-green',
        isFirst: 'bg-yellow',
        memberName: 'border-red',
        status: 'bg-active',
        enable: 'enable',
      }
      if (obj.isFirst) {
        // 第一次
        classNames.push(classList.isFirst)
      } else {
        // 加購
        classNames.push(classList.isAdditional)
      }
      if (obj.memberName === this.userData.memberName) {
        // 自己
        classNames.push(classList.memberName)
      }
      if (obj.status) {
        // 訂購未訂購
        classNames.push(classList.status)
      }
      // hover編輯區塊是否顯示
      if (this.checkPermission(obj.memberName)) {
        classNames.push('hasPermission')
      }
      if (obj.enable) {
        classNames.push(classList.enable)
      }
      return classNames
    },
    edit(orderId) {
      const load = {
        name: 'Order',
        title: `我也要訂 - ${this.$store.state.prop.storeName} - 編輯`,
      }
      const prop = shallowClone(this.$store.state.prop)
      prop.action = 'edit'
      prop.orderId = orderId
      injectState(prop)
      this.showDialog(load)
    },
    checkItemName(name) {
      const arr = name.split('-')
      return arr[0] === arr[1] ? arr[0] : name
    },
    confirmDelete(id) {
      order.delOrder(id).then(() => {
        this.$message({
          message: '刪除點餐',
          type: 'success',
        })
        this.getRecordsInfo()
        this.$bus.$emit('refreshSystem')
        this.$bus.$emit('refreshOrderForm')
        this.$bus.$emit('refreshMyorder', false)
        this.$bus.$emit('refreshUserExpenses')
      })
    },
  },
  data() {
    return {
      ordersDetail: [],
      userData: {},
      owner: '',
      loading: false,
      orderTableKey: 0,
      orderCost: 0,
    }
  },
  props: {
    orderOwnerEnter: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    EditBlock,
  },
}
</script>
<style lang="sass" scoped>
/deep/.el-button
  padding: 6px 10px
  width: 60px
/deep/.el-tooltip
  margin-left: 5px
/deep/.el-icon-question
  margin-left: 5px
#detail
  .row
    .cell
      padding: 0.4rem
    &:first-child
      .cell
        padding: 0.6rem 0.4rem
  .noComment
    border-right: 1px solid #e6dedb
.editBlock
  /deep/.el-button
    width: auto
    padding: 5px 10px
    margin-top: 4px
</style>
