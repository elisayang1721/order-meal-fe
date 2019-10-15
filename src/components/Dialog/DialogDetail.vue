<template lang="pug">
  #detail(v-loading="loading")
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
                span － 點選訂購人，該項目會變成紅底表示已付款
              li
                span.border-red
                span － 紅色外框表示該項目為自已訂購
              li
                span.font-blue 藍色文字
                span － 藍色文字表示該項目的說明
            i.el-icon-question
    .row(v-for="(item, idx) in ordersDetail" :key="idx")
      .cell
        span {{checkItemName(item.itemName)}}
      .cell
        span {{item.totalAmount}}
      .cell
        span {{item.price}}
      .cell.flexFix
        .subscriberCell.border-grey(v-for="(obj, i) in item.orderRecords" :key="obj.id"
          :class="recordClass(obj)"
          @click="orderSubmit(idx, i , obj.status, $event)")
          span {{obj.memberName}}
          span.font-blue {{obj.remark}}
          .editBlock
            el-button(type="success"
              @click.stop="edit") 編輯
            el-button(type="danger") 刪除
</template>
<script>
import history from '@api/history'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DialogDetail',
  created() { },
  mounted() {
    this.loading = true
    history.getRecordsInfo(this.$store.state.prop.id).then(res => {
      this.ordersDetail = res.list
      this.loading = false
    })
    this.owner = this.$store.state.prop.owner
    this.role = this.$store.state.userData.memberName
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    ...mapActions(['showDialog']),
    orderSubmit(idx, i, status, e) {
      const hasCell = e.target.className.includes('subscriberCell')
      // class不是subscriberCell，不做開關
      if (!hasCell) return

      e.target.classList.toggle('bg-active')
      const hasActive = e.target.className.includes('bg-active')
      if (hasActive) {
        // do somthing
      } else {
        // do other thing
      }
    },
    checkPermission(name) {
      return this.role === 'admin' || this.role === this.owner || this.role === name
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
    edit() {
      this.showDialog({ name: 'Order', title: '我也要訂 - ＸＸＸ - 編輯' })
    },
    checkItemName(name) {
      const arr = name.split('-')
      return arr[0] === arr[1] ? arr[0] : name
    }
  },
  watch: {},
  data() {
    return {
      ordersDetail: [],
      owner: '',
      role: '',
      loading: false
    }
  },
  components: {}
}
</script>
<style lang="sass" scoped>
/deep/.el-button
  padding: 6px 10px
  width: 60px
</style>
