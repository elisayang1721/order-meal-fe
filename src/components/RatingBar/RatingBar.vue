<template lang="pug">
  #ratingBar
    ul(v-if="isSelectable"
      @mouseleave="leave")
      li(v-for="(face,i) in faces" :key="i"
        :data-score="face.isHighLighted ? currentIdx : null"
        @mouseover="mouseover(i)"
        @click="submitScore(i)")
        img(:src="require('@img/score3.svg')" v-if="!face.isHighLighted")
        img(:src="require(`@img/score${currentIdx + 1}.svg`)" v-else)
    //- 為了處理不必要的事件，這邊html區分兩塊
    ul(v-else)
      li(v-for="(face,i) in faces" :key="i"
        class="noEdit"
        :data-score="face.isHighLighted ? currentIdx : null")
        img(:src="require('@img/score3.svg')" v-if="!face.isHighLighted")
        img(:src="require(`@img/score${currentIdx + 1}.svg`)" v-else)
</template>
<script>
export default {
  name: 'RatingBar',
  props: {
    'score': {
      type: Number,
      default: null
    },
    'isSelectable': {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      faces: [
        {
          isHighLighted: false
        },
        {
          isHighLighted: false
        },
        {
          isHighLighted: false
        },
        {
          isHighLighted: false
        },
        {
          isHighLighted: false
        }
      ],
      currentIdx: null,
      isSubmit: false,
      rateScore: null
    }
  },
  mounted() {
    this.checkScore()
  },
  methods: {
    resetHighLight() {
      this.faces.forEach((face, idx) => {
        this.faces[idx].isHighLighted = false
      })
    },
    setHighLight(i) {
      this.faces.forEach((face, idx) => {
        if (i >= idx) {
          this.faces[idx].isHighLighted = true
        }
      })
    },
    checkScore() {
      this.rateScore = this.score
      if (this.score) {
        let idx
        if (this.score <= 1.8) {
          idx = 0
        } else if (this.score <= 2.6) {
          idx = 1
        } else if (this.score <= 3.4) {
          idx = 2
        } else if (this.score <= 4.2) {
          idx = 3
        } else {
          idx = 4
        }
        this.currentIdx = idx
        this.setHighLight(idx)
      }
    },
    mouseover(i) {
      this.currentIdx = i
      this.isSubmit = false
      this.resetHighLight()
      this.setHighLight(i)
    },
    leave() {
      if (!this.isSubmit) {
        this.currentIdx = null
        this.resetHighLight()
      }
      // handle if already set the score
      if (this.rateScore) {
        this.currentIdx = this.rateScore - 1
        this.setHighLight(this.currentIdx)
      }
    },
    submitScore(i) {
      // call api  after
      this.currentIdx = i
      this.rateScore = i + 1
      this.isSubmit = true
    }
  },
  watch: {
    'score': {
      handler() {
        this.checkScore()
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  #ratingBar
    position: relative
    ul
      +Flex(flex-start,center)
      width: 150px
      li
        +size(25px,25px,null)
        border-radius: 50%
        border: 1px solid #000
        margin-right: 5px
        background: #eee
        cursor: pointer
        &[data-score="0"]
          background: #f15354
        &[data-score="1"]
          background: #f68937
        &[data-score="2"]
          background: #ffcc28
        &[data-score="3"]
          background: #49bb7d
        &[data-score="4"]
          background: #16b6d6
        &.noEdit
          cursor: unset
</style>
