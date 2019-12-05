<template lang="pug">
  #rating(v-loading="loading")
    .ratingInner
      .innerHead 大家的評論
        .avgScore {{storeEvaluation.avgScore}}
      template(v-if="storeEvaluation.totalSize === 0")
        .noComment 目前尚未有任何美食家評論
      template(v-else)
        TotalCommentItem(v-for="(obj,i) in storeComments" :key="i" :item="obj")
    .ratingInner.myCommenInner
      .innerHead 本次訂餐評論
      template(v-if="myComment.totalSize === 0")
        .noComment 目前尚未點餐
      template(v-else)
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
      storeComments: [],
      myComment: {}
    }
  },
  mounted() {
    this.getAllEvaluations()
    this.$bus.$on('refreshTotalComments', this.getAllEvaluations)
  },
  components: {
    TotalCommentItem,
    MyCommentItem
  },
  methods: {
    getAllEvaluations() {
      this.loading = true
      const orderId = this.$store.state.prop.id
      const storeId = this.$store.state.prop.storeId
      axios.all([
        rating.getAllEvaluations(storeId),
        rating.getMyEvaluations(orderId)
      ]).then(axios.spread((allEvaluations, myEvaluation) => {
        this.storeComment(allEvaluations)
        this.storeEvaluation = allEvaluations
        this.myComment = myEvaluation        
        this.loading = false
      }))
    },
    storeComment(info) {
      const allComment = info.list 
      allComment.forEach(type => {
        type.comment = type.comment.replace(/\n/g,'<br>')
      })
      this.storeComments = allComment
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
