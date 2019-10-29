<template lang="pug">
  .itemWrapper
    .list.left
      .navHead
        .restaurantName {{list.name}}
        .deadLine 截止於：{{countDown}}
      .content
        .amount
          .amountTitle 總數
          span {{list.totalAmount}}
        .amount
          .amountTitle 金額
          span {{addComma}}
        .amount(v-if="list.bulletin")
          .amountTitle 公告事項
          span(:title="list.bulletin") {{list.bulletin}}
    .list.right
      .navHead
        span(:title="neededTitle") {{list.createdByName}}
        el-button.orderManagementBtn(
          v-if="checkPermission"
          icon="el-icon-setting"
          @click="toggleDialog('OrderManagement')") 訂單管理
      .content
        el-button.detailBtn(icon="el-icon-edit"
          @click="toggleDialog('Detail')") 明細
        el-button(type="success" icon="el-icon-potato-strips"
          @click="toggleDialog('Order')") 點餐
</template>
<script>
import { injectState, countDown } from '@js/model'
import { mapActions } from 'vuex'

export default {
  name: 'OrderInProgressItem',
  props: ['list'],
  mounted() {
    this.timestamp = this.list.finishedTime
    this.countDown = countDown(this.timestamp)
    this.setTimer()
  },
  computed: {
    addComma() {
      return '$' + this.list.totalPrice.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    },
    neededTitle() {
      return this.list.createdByName.length > 5 ? this.list.createdByName.length : ''
    },
    checkPermission() {
      const userData = JSON.parse(localStorage.userData)
      return this.list.createdByName === userData.memberName || userData.isAdmin
    }
  },
  methods: {
    ...mapActions(['showDialog']),
    toggleDialog(cName) {
      let title
      if (cName === 'OrderManagement') {
        title = `${this.list.createdByName} - ${this.list.name} - 訂單管理`
      } else if (cName === 'Detail') {
        title = `${this.list.createdByName} - ${this.list.name} - 訂單明細`
      } else {
        title = `我也要訂 - ${this.list.name}`
      }
      const load = {
        name: cName,
        title
      }
      const prop = {
        id: this.list.id,
        storeId: this.list.storeId,
        storeName: this.list.name,
        owner: this.list.createdByName
      }
      if (cName === 'Order') {
        prop.action = 'order'
      }
      injectState(prop)
      this.showDialog(load)
    },
    timer() {
      this.time = setInterval(() => {
        this.timestamp -= 60
        if (this.timestamp <= 0) {
          this.$bus.$emit('refreshSystem')
          this.stopTimer()
        } else {
          this.countDown = countDown(this.timestamp)
        }
      }, 60000)
    },
    setTimer() {
      this.timer()
    },
    stopTimer() {
      if (this.time) {
        clearInterval(this.time)
      }
    }
  },
  data() {
    return {
      countDown: null,
      timestamp: null
    }
  },
  beforeDestroy() {
    this.stopTimer()
  }
}
</script>
<style lang="sass" scoped>
  .orderManagementBtn
    +Bgc(#94593f)
    border-color: #94593f
    color: #fff
    &:hover,
    &:active,
    &:focus
      +Bgc(#9e6952)
  .detailBtn
    +Bgc(#999890)
    border-color: #999890
    color: #fff
    &:hover,
    &:active,
    &:focus
      +Bgc(#a8a7a1)
</style>
