<template lang="pug">
  #myComment
    .head
      div {{item.meals}}
      .submitBlock
        RatingBar(:score="item.score" ref="ratingBar")
        el-button(type="success" @click="triggerDebounce") 送出
    .section
      el-input(v-model="item.comment"
        placeholder="請撰寫評論(選擇性)"
        type="textarea"
        maxlength="255"
        show-word-limit)
</template>
<script>
import RatingBar from '@c/RatingBar/RatingBar'
import rating from '@api/rating'
import debounce from 'lodash/debounce'

export default {
  name: 'MyCommentItem',
  props: ['item'],
  computed: {
    getPayLoad() {
      const load = {
        score: this.$refs.ratingBar.rateScore,
        comment: this.item.comment
      }
      return load
    }
  },
  methods: {
    submitRating: debounce(vm => {
      rating.updateEvaluation(vm.item.orderRecordId, vm.getPayLoad).then(() => {
        vm.$message({
          message: '評論成功',
          type: 'success'
        })
        vm.$bus.$emit('refreshMyorder')
        vm.$bus.$emit('refreshSystem')
        vm.$bus.$emit('refreshTotalComments')
      })
    }, 500),
    errorMessage: debounce(vm => {
      vm.$message({
        message: '分數尚未選取',
        type: 'error'
      })
    }, 500),
    triggerDebounce() {
      const vm = this
      if (!this.$refs.ratingBar.rateScore) {
        this.errorMessage(vm)
      } else {
        this.submitRating(vm)
      }
    }
  },
  components: {
    RatingBar
  }
}
</script>
