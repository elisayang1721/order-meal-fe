<template lang="pug">
  #rating(v-loading="loading")
    .ratingInner
      .innerHead 大家的評論
        .avgScore {{storeEvaluation.avgScore}}
      TotalCommentItem(v-for="(obj,i) in storeEvaluation.list" :key="i" :item="obj")
    .ratingInner
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
  },
  components: {
    TotalCommentItem,
    MyCommentItem
  }
}
</script>
