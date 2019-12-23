<template lang="pug">
  .itemWrapper.history
    .navHead
      ul.left-area
        li {{dateFormatter}}
        li {{myOrderData.storeName}}
      .right-area
        .owner 發起人：{{myOrderData.ownerName}}
        el-button.ratingBtn(
          icon="el-icon-s-comment"
          @click="toggleDialog('Rating')") 評分
    .content
      .left-area
        ul.ordersItem
          li(v-for="(meal, i) in myOrderData.meals"
            :key="i")
            span.meal {{`${meal.itemName} ${meal.price.format()} x ${meal.amount}`}}
            span.remark {{ `${meal.remark ? `- ${meal.remark}` : ''}` }}
            span.comment(:class="{'evaluate':meal.isEvaluated}")
              | {{`${meal.isEvaluated ? '已評分' : '未評分'}`}}
      .right-area
        .totalPrice {{`總計：${totalPrice.price.format()}`}}
</template>
<script>
import { injectState } from '@js/model'
import { mapActions } from 'vuex'

export default {
  name: 'OrdersItem',
  props: ['myOrderData'],
  computed: {
    dateFormatter() {
      const date = this.myOrderData.createdOn.replace(/\s/, 'T')
      const weekNum = ['日', '一', '二', '三', '四', '五', '六']
      const d = new Date(date)
      const mm = d.getMonth() + 1
      const dd = d.getDate()
      const day = d.getDay()
      return `${mm.toString().padStart(2, '0')}/${dd.toString().padStart(2, '0')} (${weekNum[day]})`
    },
    totalPrice() {
      let price = 0
      this.myOrderData.meals.forEach(el => {
        price += el.price * el.amount
      })
      return { price }
    }
  },
  methods: {
    ...mapActions(['showDialog']),
    toggleDialog(cName) {
      const load = {
        name: cName,
        title: `${this.myOrderData.storeName} 的店家評價`
      }
      const prop = {
        id: this.myOrderData.orderId,
        storeId: this.myOrderData.storeId
      }
      injectState(prop)
      this.showDialog(load)
    }
  }
}
</script>
<style lang="sass" scoped>
  .itemWrapper
    flex-wrap: wrap
    height: unset
    min-height: 120px
    &.history
      .navHead
        +Flex(space-between,center)
        width: 100%
        background-color: $tableHeadColor
        font-size: 17px
        height: 42px
        line-height: 42px
        color: #fff
        padding: 0px 15px
        >ul
          align-items: center
          >li
            margin-right: 10px
        .owner
          +ellipsis()
      .content
        +Flex(space-between,center)
        width: 100%
        padding: 10px 15px
        min-height: 75px
        color: #626262
        .ordersItem
          width: 100%
          display: block
          li
            line-height: 26px
            list-style: disc
            margin: 0 50px
            word-break: break-all
          .remark
            color: #878686
          .comment
            font-size: 14px
            color: #878686
            background: #e4e4e4
            margin: 0 10px
            padding: 2px 10px
            border-radius: 25px
            &.evaluate
              color: #fff
              background: #a09797
      .left-area
        +Flex(flex-start,center)
        display: inline-flex
        flex: 3
      .right-area
        +Flex(flex-end,center)
        display: inline-flex
        flex: 1
  .el-icon-s-comment
    cursor: pointer
    font-size: 20px
    margin-left: 25px
  .ratingBtn
    +Bgc(#714444)
    width: auto
    padding: 5px 10px
    margin-left: 20px
    color: #fff
    border-color: #714444
    &:hover,
    &:active,
    &:focus
      +Bgc(#7f5656)
</style>
