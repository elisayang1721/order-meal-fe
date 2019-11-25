<template lang="pug">
  #rating(v-loading="loading")
    .ratingInner
      .innerHead 大家的評論
        .avgScore {{storeEvaluation.avgScore}}
      template(v-if="storeEvaluation.totalSize === 0")
        .noComment 目前尚未有任何美食家評論
      template(v-else)
        TotalCommentItem(v-for="(obj,i) in storeEvaluation.list" :key="i" :item="obj")
    .ratingInner.myCommenInner
      .innerHead 本次訂餐評論
      MyCommentItem(v-for="(obj,i) in myComment.list" :key="i" :item="obj")
</template>
<script>
import axios from 'axios'
import rating from '@api/rating'
import MyCommentItem from './subComponents/MyCommentItem'
import TotalCommentItem from './subComponents/TotalCommentItem'

export default {
  name: 'DialogRating',
  data() {
    return {
      loading: false,
      storeEvaluation: {},
      myComment: {}
    }
  },
  mounted() {
    this.loading = true
    const orderId = this.$store.state.prop.id
    const storeId = this.$store.state.prop.storeId
    axios.all([
      rating.getAllEvaluations(storeId),
      rating.getMyEvaluations(orderId)
    ]).then(axios.spread((allEvaluations, myEvaluation) => {
      this.storeEvaluation = allEvaluations
      this.myComment = myEvaluation
      this.loading = false
    }))
    this.$bus.$on('refreshTotalComments', this.getAllEvaluations)
  },
  components: {
    TotalCommentItem,
    MyCommentItem
  },
  methods: {
    getAllEvaluations() {
      this.loading = true
      const storeId = this.$store.state.prop.storeId
      rating.getAllEvaluations(storeId).then(res => {
        this.storeEvaluation = res
        this.loading = false
      })
    }
  },
  beforeDestroy() {
    this.$bus.$off('refreshTotalComments')
  }
}
</script>
<style lang="sass" scoped>
  #rating
    justify-content: space-between
    .ratingInner
      &+.ratingInner
        margin-left: 2%
      &.myCommenInner
        border-radius: 8px
        box-shadow: 0 5px 5px rgba(230, 230, 230, 0.6)
        overflow: hidden
        #myComment
          border: none
</style>
