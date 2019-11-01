<template lang="pug">
  ScrollBar#allEvaluation(v-loading="loading")
    .ratingInner
      .innerHead 大家的評論
        .avgScore {{storeEvaluations.avgScore}}
      TotalCommentItem(v-for="(obj,i) in storeEvaluations.list" :key="i" :item="obj")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import rating from '@api/rating'
import TotalCommentItem from './TotalCommentItem'

export default {
  name: 'AllEvaluation',
  props: ['storeId'],
  mounted() {
    this.loading = true
    rating.getAllEvaluations(this.storeId).then(res => {
      this.storeEvaluations = res
      this.loading = false
    })
  },
  data() {
    return {
      storeEvaluations: {},
      loading: false
    }
  },
  components: {
    ScrollBar,
    TotalCommentItem
  }
}
</script>
