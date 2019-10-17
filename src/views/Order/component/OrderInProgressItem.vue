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
        el-button(type="warning"
          icon="el-icon-setting"
          @click="toggleDialog('OrderManagement')") 訂單管理
      .content
        el-button(icon="el-icon-edit"
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
  created() {},
  mounted() {
    this.countDown = countDown(this.list.finishedOn)
    this.setTimer()
  },
  computed: {
    addComma() {
      return '$' + this.list.totalPrice.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    },
    neededTitle() {
      return this.list.createdByName.length > 5 ? this.list.createdByName.length : ''
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
      const my = this
      this.time = setInterval(() => {
        this.countDown = countDown(this.list.finishedOn)
      }, 3600)
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
  watch: {},
  data() {
    return {
      countDown: ''
    }
  },
  components: {},
  beforeDestroy() {
    this.stopTimer()
  }
}
</script>
