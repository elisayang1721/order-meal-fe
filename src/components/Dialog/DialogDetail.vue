<template lang="pug">
  #detail
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
    .row(v-for="(item, idx) in ordersDetail[0].list" :key="idx")
      .cell
        span {{item.itemName}}
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DialogDetail',
  created() { },
  mounted() {
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
    }
  },
  watch: {},
  data() {
    return {
      ordersDetail: [{
        totalSize: 3,
        list: [
          {
            itemName: '咖哩便當-不辣',
            totalAmount: 3,
            price: 80,
            orderRecords: [
              {
                memberName: '松庭',
                deptId: 8,
                remark: '我要加飯',
                status: 1,
                id: 1,
                isFirst: false
              },
              {
                memberName: '裕智4',
                deptId: 8,
                remark: '半飯謝謝',
                status: 0,
                id: 6,
                isFirst: true
              },
              {
                memberName: '裕智4',
                deptId: 8,
                remark: '半飯謝謝',
                status: 0,
                id: 16,
                isFirst: true
              },
              {
                memberName: '裕智4',
                deptId: 8,
                remark: '半飯謝謝',
                status: 0,
                id: 26,
                isFirst: true
              },
              {
                memberName: '裕智4',
                deptId: 8,
                remark: '半飯謝謝',
                status: 0,
                id: 7,
                isFirst: false
              }
            ]
          },
          {
            itemName: '泡菜-新韓式',
            totalAmount: 2,
            price: 40,
            orderRecords: [
              {
                memberName: 'elic2',
                deptId: 8,
                remark: null,
                status: 0,
                id: 2,
                isFirst: false
              }
            ]
          },
          {
            itemName: '小黃瓜-韓式',
            totalAmount: 3,
            price: 20,
            orderRecords: [
              {
                memberName: 'RAVEN3',
                deptId: 8,
                remark: null,
                status: 0,
                id: 3,
                isFirst: true
              }
            ]
          }
        ]
      }],
      owner: 'owner',
      role: ''
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
