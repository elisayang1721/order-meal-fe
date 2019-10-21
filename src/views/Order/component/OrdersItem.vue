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
            :key="i") {{`${meal.item} ${meal.remark ? meal.remark: ''}`}}
        //- el-button(type="primary") 評比
</template>
<script>
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
  }
}
</script>
<style lang="sass" scoped>
  .itemWrapper
    height: unset
    min-height: 120px
    +BrdRad(8px,8px,0,0)
    .list
      .navHead
        background-color: #8b8b8b
</style>
