<template lang="pug">
  #totalComment
    .head
      div {{item.meals}}
      RatingBar(:score="item.score" :isSelectable="false")
    .section
      span {{item.comment}}
    .footer
      .commentedBy {{`美食評論家： ${item.commentedBy}`}}
      .date
        span {{item.commentedOn}}
</template>
<script>
import RatingBar from '@c/RatingBar/RatingBar'

export default {
  name: 'TotalCommentItem',
  props: ['item'],
  components: {
    RatingBar
  }
}
</script>
