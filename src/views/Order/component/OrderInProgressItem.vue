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
        .amount
          .amountTitle(v-if="list.bulletin") 公告事項
          span(v-if="list.bulletin" :title="list.bulletin") {{list.bulletin}}
        .amount
          .amountTitle
            span 評分
            span {{list.avgScore}}
            el-badge(:value="list.totalComment" :max="99" @click.native="toggleDialog('Rating')")
              i(class="el-icon-s-comment")
          RatingBar(:score="list.avgScore" :isSelectable="false")
    .list.right
      .navHead
        span(:title="neededTitle") {{list.createdByName}}
        el-button.orderManagementBtn(
          v-if="checkPermission"
          icon="el-icon-setting"
          @click="toggleDialog('OrderManagement')") 訂單管理
      .content
        el-button.detailBtn(icon="el-icon-edit"
          :disabled="countDown === '已截止'"
          @click="toggleDialog('Detail')") 明細
        el-button(type="success" icon="el-icon-potato-strips"
          :disabled="countDown === '已截止'"
          @click="toggleDialog('Order')") 點餐
</template>
<script>
import { injectState, countDown, addComma } from '@js/model'
import RatingBar from '@c/RatingBar/RatingBar'
import { mapActions } from 'vuex'

export default {
  name: 'OrderInProgressItem',
  props: ['list'],
  components: {
    RatingBar
  },
  mounted() {
    this.timestamp = this.list.finishedTime
    this.countDown = countDown(this.timestamp)
    this.setTimer()
  },
  computed: {
    addComma() {
      return addComma(this.list.totalPrice)
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
      switch (cName) {
        case 'OrderManagement':
          title = `${this.list.createdByName} - ${this.list.name} - 訂單管理`
          break
        case 'Detail':
          title = `${this.list.createdByName} - ${this.list.name} - 訂單明細`
          break
        case 'Rating':
          title = `${this.list.name} 的店家評價`
          break
        default:
          title = `我也要訂 - ${this.list.name}`
          break
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
      if (this.timestamp > 120) {
        this.time = setInterval(() => {
          this.timestamp -= 60
          if (this.timestamp <= 60) {
            this.stopTimer()
            this.setTimer()
          } else {
            this.countDown = countDown(this.timestamp)
          }
        }, 60000)
      } else {
        this.time = setInterval(() => {
          this.timestamp -= 1
          if (this.timestamp === 0) {
            this.countDown = '已截止'
            this.stopTimer()
          } else {
            this.countDown = countDown(this.timestamp)
          }
        }, 1000)
      }
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
  watch: {
    'list': {
      handler(val) {
        this.timestamp = val.finishedTime
        this.countDown = countDown(this.timestamp)
        this.stopTimer()
        this.setTimer()
      },
      deep: true
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
  /deep/.el-rate
    width: 100%
  /deep/.el-badge
    cursor: pointer
    font-size: 24px
    left: -20px
    .el-badge__content
      display: inline-flex
      align-items: center
</style>
