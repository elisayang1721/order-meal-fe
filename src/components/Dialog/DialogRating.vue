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
        MyCommentItem(v-for="(obj,i) in myComment.list" :key="i" :item="obj" ref="ratingLoad")
</template>
<script>
import axios from 'axios'
import rating from '@api/rating'
import debounce from 'lodash/debounce'
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
        if (this.myComment.list.length) {
          this.$bus.$emit('AddFooter')
        }
      }))
    },
    storeComment(info) {
      const allComment = info.list
      allComment.forEach(type => {
        type.comment = type.comment.replace(/\n/g, '<br>')
      })
      this.storeComments = allComment
    },
    triggerSubmitDebounce() {
      const vm = this
      this.submitAtOnce(vm)
    },
    submitAtOnce: debounce(vm => {
      if (vm.collectLoads()) {
        vm.updateComment()
      } else {
        vm.$message({
          message: '已撰寫評論項目尚未評分',
          type: 'warning'
        })
      }
    }, 300),
    collectLoads() {
      const loads = []
      let shouldISubmit = true
      this.$refs.ratingLoad.forEach(vComp => {
        if (vComp.getPayLoad.score) {
          loads.push(vComp.getPayLoad)
        } else if (vComp.getPayLoad.comment) {
          shouldISubmit = false
        }
      })
      return shouldISubmit ? loads : false
    },
    updateComment() {
      const callUpdate = []
      this.collectLoads().forEach(load => {
        callUpdate.push(rating.updateEvaluation(load.orderRecordId, {
          score: load.score,
          comment: load.comment
        }))
      })
      axios.all(callUpdate).then(() => {
        this.$message({
          message: '評論成功',
          type: 'success'
        })
        this.$bus.$emit('refreshMyorder', false)
        this.$bus.$emit('refreshSystem')
        this.$bus.$emit('refreshTotalComments')
      })
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
