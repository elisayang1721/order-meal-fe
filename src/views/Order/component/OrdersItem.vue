<template lang="pug">
  .itemWrapper
    .list
      .navHead
        ul
          li {{dateFormatter}}
          li {{myOrderData.storeName}}
      .content
        ul
          li(v-for="(meal, i) in myOrderData.meals"
            :key="i")
            | {{`${meal.item} ${meal.remark ? meal.remark: ''} ${meal.isEvaluated ? '已評論' : '未評論'}`}}
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
      const date = this.myOrderData.createdOn
      const weekNum = ['日', '一', '二', '三', '四', '五', '六']
      const d = new Date(date)
      const mm = d.getMonth() + 1
      const dd = d.getDate()
      const day = d.getDay()
      return `${mm.toString().padStart(2, '0')}/${dd.toString().padStart(2, '0')} (${weekNum[day]})`
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
  /deep/.el-icon-s-comment
    cursor: pointer
    font-size: 30px
    margin-right: 30px
</style>
