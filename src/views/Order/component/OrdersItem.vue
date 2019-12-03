<template lang="pug">
  .itemWrapper
    .list
      .navHead
        ul
          li {{dateFormatter}}
          li {{myOrderData.storeName}}
        .totalPrice {{`總計: ${totalPrice.price.format()}`}}
      .content
        ul.ordersItem
          li(v-for="(meal, i) in myOrderData.meals"
            :key="i")
            span.meal {{ meal.itemName }}
            span.price {{ meal.price.format() }}
            span.amount {{ `x${meal.amount}` }}            
            span.remark {{ `${meal.remark ? `- ${meal.remark}` : ''}` }}
            span.comment(:class="{'evaluate':meal.isEvaluated}") {{`${meal.isEvaluated ? '【已評分】' : '【未評分】'}`}}
        el-tooltip(effect="dark" content="評比" placement="top-start")
          i.el-icon-s-comment(@click="toggleDialog('Rating')")
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
      let total = 0
      let price = 0
      this.myOrderData.meals.forEach(el => {
        total += el.amount
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
    height: unset
    min-height: 120px
    .list
      .navHead
        background-color: $tableHeadColor
  .el-icon-s-comment
    cursor: pointer
    font-size: 28px
    margin-right: 30px
    color: #626262
</style>
