<template lang="pug">
  #totalComment
    .head
      div {{`${item.meals} - ${item.commentedBy}`}}
      RatingBar(:score="item.score" :isSelectable="false")
    .section
      span {{item.comment}}
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
