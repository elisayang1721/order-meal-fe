<template lang="pug">
  .itemWrapper
    .list.left
      .navHead
        .restaurantName {{list.storeName}}
        .deadLine {{countDown}}
      .orderContent
        .amount
          .amountTitle 總數
          span.txt {{list.totalAmount}}
        .amount(:class="{'minimun': minDeliveryPrice()}")
          .amountTitle 金額
          template(v-if="minDeliveryPrice()")
            el-tooltip(effect="dark" placement="bottom")
              div(slot="content") {{`還差 ${balance} 成單`}}
              el-button.basicRate-bar
                .progressRate-bar(:style="{'width': deliveryPrice()}")
                span {{addComma}}
          template(v-else)
            span.txt {{addComma}}
        .amount
          .amountTitle(v-if="list.bulletin") 公告事項
          span.txt(v-if="list.bulletin" :title="list.bulletin") {{list.bulletin}}
        .amount(@click="toggleDialog('Rating')")
          .amountTitle
            span 評分
            span {{list.avgScore}}
            el-badge(:value="list.totalComment"
              :max="99"
              :class="{pointerEvent: !list.totalComment}")
              i(class="el-icon-s-comment")
          RatingBar(:score="list.avgScore" :isSelectable="false" :type="'Float'")
    .list.right
      .navHead(:class="{'manage':checkPermission}")
        span(:title="neededTitle") {{list.createdByName}}
        .managerBtn
          el-button.orderManagementBtn(
            v-if="checkPermission"
            icon="el-icon-setting"
            @click="toggleDialog('OrderManagement')") 訂單管理
      .content
        el-button.detailBtn(icon="el-icon-document"
          :disabled="countDown === '已截止'"
          @click="toggleDialog('Detail')") 明細
        el-button(type="success" icon="el-icon-fork-spoon"
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
    RatingBar,
  },
  mounted() {
    this.timestamp = this.list.finishedTime
    this.checkCountDown()
  },
  computed: {
    addComma() {
      return addComma(this.list.totalPrice)
    },
    neededTitle() {
      return this.list.createdByName.length > 5 ? this.list.createdByName.length : ''
    },
    checkPermission() {
      const userData = JSON.parse(sessionStorage.userData)
      return this.list.createdByName === userData.memberName || userData.isAdmin
    },
    balance() {
      return addComma(this.balancePrice)
    },
  },
  methods: {
    ...mapActions(['showDialog']),
    toggleDialog(cName) {
      let title
      switch (cName) {
        case 'OrderManagement':
          title = `${this.list.createdByName} - ${this.list.storeName} - 訂單管理`
          break
        case 'Detail':
          title = `${this.list.createdByName} - ${this.list.storeName} - 訂單明細`
          break
        case 'Rating':
          title = `${this.list.storeName} 的店家評價`
          break
        default:
          title = `我也要訂 - ${this.list.storeName}`
          break
      }
      const load = {
        name: cName,
        title,
      }
      const prop = {
        id: this.list.id,
        storeId: this.list.storeId,
        storeName: this.list.storeName,
        owner: this.list.createdByName,
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
            this.countDown = `截止於：${countDown(this.timestamp)}`
          }
        }, 60000)
      } else {
        this.time = setInterval(() => {
          this.timestamp -= 1
          if (this.timestamp === 0) {
            this.countDown = '已截止'
            this.stopTimer()
          } else {
            this.countDown =  '截止於：' + countDown(this.timestamp)
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
    },
    checkCountDown() {
      this.stopTimer()
      if (this.timestamp > 0) {
        this.countDown = `截止於：${countDown(this.timestamp)}`
        this.setTimer()
      } else if (this.list.limitedPrice) {
        this.countDown = `截止金額：${this.list.limitedPrice.format()}`
      } else {
        this.countDown = '手動截止'
      }
    },
    minDeliveryPrice() {
      return this.list.minDeliveryPrice > 0 && this.list.totalPrice < this.list.minDeliveryPrice
    },
    deliveryPrice() {
      const minPrice = this.list.minDeliveryPrice
      const ratePrice =  this.list.totalPrice
      const rate = Math.round((ratePrice / minPrice) * 100) + '%'
      this.balancePrice = minPrice - ratePrice

      return rate
    },
  },
  data() {
    return {
      countDown: null,
      timestamp: null,
      balancePrice: 0,    // 成單差額
    }
  },
  watch: {
    'list': {
      handler(val) {
        this.timestamp = val.finishedTime
        this.checkCountDown()
      },
      deep: true,
    },
  },
  beforeDestroy() {
    this.stopTimer()
  },
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
    &.is-disabled
      +Bgc(#c2c1bc)
      border-color: #c2c1bc
      &:hover,
      &:active,
      &:focus
        +Bgc(#c2c1bc)
        border-color: #c2c1bc
  /deep/.el-rate
    width: 100%
  /deep/.el-badge
    cursor: pointer
    font-size: 24px
    z-index: 10
    .el-badge__content
      display: inline-flex
      align-items: center
  .itemWrapper
    .list
      .content
        /deep/.el-button
          padding: 10px
          width: 80px
          &+.el-button
            margin-left: 0
  .basicRate-bar
    position: relative
    left: -10px
    color: #fff
    font-size: 16px
    width: 70%
    text-align: center
    border-radius: 25px
    background: #999890
    padding: 3px 0
    border: none
    overflow: hidden
    .progressRate-bar
      position: absolute
      top: 0
      left: 0
      width: 70%
      height: 100%
      background: #47975e
    span
      position: relative
</style>
