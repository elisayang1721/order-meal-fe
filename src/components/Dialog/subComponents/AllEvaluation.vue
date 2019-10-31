<template lang="pug">
  ScrollBar#allEvaluation
    .ratingInner
      .innerHead 大家的評論
        .avgScore {{storeEvaluation.avgScore}}
      TotalCommentItem(v-for="(obj,i) in storeEvaluation.list" :key="i" :item="obj")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import TotalCommentItem from './TotalCommentItem'

export default {
  name: 'AllEvaluation',
  data() {
    return {
      storeEvaluation: {
        totalSize: 0,
        avgScore: 1.2,
        list: [
          {
            meals: 'XXX',
            commentedBy: 'AAA',
            score: 1,
            commentedOn: '2019-10-30 17:20'
          },
          {
            meals: 'YYY',
            commentedBy: 'BBB',
            score: 2,
            commentedOn: '2019-10-30 17:20'
          },
          {
            meals: 'ZZZ',
            commentedBy: 'CCC',
            score: 3,
            commentedOn: '2019-10-30 17:20'
          },
          {
            meals: 'WWW',
            commentedBy: 'DDD',
            score: 4,
            commentedOn: '2019-10-30 17:20'
          },
          {
            meals: 'XXX',
            commentedBy: 'EEE',
            score: 5,
            commentedOn: '2019-10-30 17:20'
          },
          {
            meals: 'XXX',
            commentedBy: 'EEE',
            score: 5,
            commentedOn: '2019-10-30 17:20'
          },
          {
            meals: 'XXX',
            commentedBy: 'EEE',
            score: 5,
            commentedOn: '2019-10-30 17:20'
          },
          {
            meals: 'XXX',
            commentedBy: 'EEE',
            score: 5,
            commentedOn: '2019-10-30 17:20'
          }
        ]
      }
    }
  },
  components: {
    ScrollBar,
    TotalCommentItem
  }
}
</script>
