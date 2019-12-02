<template lang="pug">
  #detail.tableFrame(v-loading="loading")
    .row
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
      .row(v-for="(item, idx) in ordersDetail" :key="idx")
        .cell
          span {{checkItemName(item.itemName)}}
        .cell
          span {{item.totalAmount}}
        .cell
          span {{item.price.format()}}
        .cell.flexFix.subscriberInfo
          .subscriberCell(v-for="(obj, i) in item.orderRecords" :key="obj.id"
            :class="recordClass(obj)"
            @click="orderSubmit(obj, $event)")
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
</template>
<script>
import history from '@api/history'
import order from '@api/order'
import { shallowClone, injectState } from '@js/model'
import { mapActions } from 'vuex'
import EditBlock from './subComponents/EditBlock'

export default {
  name: 'DialogDetail',
  mounted() {
    this.getRecordsInfo()
    this.userData = JSON.parse(localStorage.getItem('userData'))
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
    orderSubmit(obj, e) {
      const hasCell = e.target.className.includes('subscriberCell')
      // class不是subscriberCell，不做開關
      if (!hasCell) return
      if (this.userData.isAdmin || this.userData.memberName === this.owner) {
        e.target.classList.toggle('bg-active')
        const hasActive = e.target.className.includes('bg-active')
        order.updateOrderStatus(obj.id, { status: hasActive }).then(() => {
          this.$bus.$emit('updateOrderAmount', { status: hasActive, cal: obj.amount })
        })
      }
    },
    checkPermission(name) {
      const role = this.userData.memberName
      return this.userData.isAdmin || role === this.owner || role === name
    },
    recordClass(obj) {
      const classNames = []
      const classList = {
        isAdditional: 'bg-green',
        isFirst: 'bg-yellow',
        memberName: 'border-red',
        status: 'bg-active'
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
      return classNames
    },
    edit(orderId) {
      const load = {
        name: 'Order',
        title: `我也要訂 - ${this.$store.state.prop.storeName} - 編輯`
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
          type: 'success'
        })
        this.getRecordsInfo()
        this.$bus.$emit('refreshSystem')
        this.$bus.$emit('refreshOrderForm')
        this.$bus.$emit('refreshMyorder',false)
      })
    }
  },
  data() {
    return {
      ordersDetail: [],
      userData: {},
      owner: '',
      loading: false
    }
  },
  components: {

    EditBlock
  }
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
  border: 1px solid $tableLineColor
  border-right: 0
#detail
  .row
    &:first-child
      .cell
        padding: 0.6rem 0.4rem
    .cell
      padding: 0.4rem
  .noComment
    border-right: 1px solid #e6dedb
</style>
