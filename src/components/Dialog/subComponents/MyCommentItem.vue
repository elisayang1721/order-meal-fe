<template lang="pug">
  #myComment
    .head
      div {{item.meals}}
      .submitBlock
        .RatingBlock
          RatingBar(:score="item.score" ref="ratingBar")
    .section
      el-input(v-model="item.comment"
        placeholder="請撰寫評論(選擇性)"
        type="textarea"
        maxlength="255"
        show-word-limit)
</template>
<script>
import RatingBar from '@c/RatingBar/RatingBar'

export default {
  name: 'MyCommentItem',
  props: ['item'],
  computed: {
    getPayLoad() {
      const load = {
        score: this.$refs.ratingBar.rateScore,
        comment: this.item.comment,
        orderRecordId: this.item.orderRecordId
      }
      return load
    }
  },
  components: {
    RatingBar
  }
}
</script>
<style lang="sass" scoped>
  .submit-button
    width: 60px
    padding: 8px
  .replace-button
    background-color: #edf7f0
    color: #47975e
    border-color: #6ab07e
    &:hover
      +Bgc(#6ab07e)
      color: #fff
    &:active,
    &:focus
      background-color: #edf7f0
      color: #47975e
</style>
