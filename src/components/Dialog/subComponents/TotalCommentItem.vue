<template lang="pug">
  #totalComment
    .head
      div {{`${item.meals} - ${item.commentedBy}`}}
      RatingBar(:score="item.score" :isSelectable="false")
    .section
      span Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
