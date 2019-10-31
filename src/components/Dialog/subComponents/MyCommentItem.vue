<template lang="pug">
  #myComment
    .head
      div {{item.meals}}
      RatingBar
    .section
      el-input(v-model="item.comment"
        type="textarea"
        maxlength="255"
        show-word-limit)
      el-button(type="success") 送出
</template>
<script>
import RatingBar from '@c/RatingBar/RatingBar'

export default {
  name: 'MyCommentItem',
  props: ['item'],
  components: {
    RatingBar
  }
}
</script>
