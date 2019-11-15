<template lang="pug">
  #ratingBar
    ul(v-if="isSelectable"
      @mouseleave="leave")
      li(v-for="(face,i) in faces" :key="i"
        :data-score="face.isHighLighted ? currentIdx : null"
        @mouseover="mouseover(i)"
        @click="submitScore(i)")
        img(:src="require('@img/score3.svg')" v-if="!face.isHighLighted")
        img(:src="require(`@img/score${currentIdx}.svg`)" v-else)
    //- 為了處理不必要的事件，這邊html區分兩塊
    ul(v-else)
      li(v-for="(face,i) in faces" :key="i"
        class="noEdit"
        :data-score="face.isHighLighted ? currentIdx : null")
        img(:src="require('@img/score3.svg')" v-if="!face.isHighLighted")
        img(:src="require(`@img/score${currentIdx}.svg`)" v-else)
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
    },
    'type': {
      type: String,
      default: 'Num'
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
    this.setIndex()
  },
  methods: {
    resetHighLight() {
      this.faces.forEach((face, idx) => {
        this.faces[idx].isHighLighted = false
      })
    },
    setHighLight(i) {
      this.faces.forEach((face, idx) => {
        if (i - 1 >= idx) {
          this.faces[idx].isHighLighted = true
        }
      })
    },
    setIndex() {
      this.rateScore = this.score
      if (this.score) {
        let idx
        if (this.score <= 1.8) {
          idx = 1
        } else if (this.score <= 2.6) {
          idx = 2
        } else if (this.score <= 3.4) {
          idx = 3
        } else if (this.score <= 4.2) {
          idx = 4
        } else {
          idx = 5
        }
        this.currentIdx = idx
        this.setHighLight(idx)
      }
    },
    checkScore() {
      this.rateScore = this.score
      this.currentIdx = this.score
      this.resetHighLight()
      this.setHighLight(this.currentIdx)
    },
    mouseover(i) {
      this.currentIdx = i + 1
      this.isSubmit = false
      this.resetHighLight()
      this.setHighLight(this.currentIdx)
    },
    leave() {
      if (!this.isSubmit) {
        this.currentIdx = null
        this.resetHighLight()
      }
      // handle if already set the score
      if (this.rateScore) {
        this.currentIdx = this.rateScore
        this.setHighLight(this.currentIdx)
      }
    },
    submitScore(i) {
      // call api  after
      this.currentIdx = i + 1
      this.rateScore = i + 1
      this.isSubmit = true
    }
  },
  watch: {
    'score': {
      handler() {
        if (this.type === 'Num') {
          this.checkScore()
        } else {
          this.setIndex()
        }
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
        // border: 1px solid #000
        margin-right: 5px
        background: #e4e4e4
        cursor: pointer
        &[data-score="1"]
          background: #f15354
        &[data-score="2"]
          background: #f47149
        &[data-score="3"]
          background: #f8903e
        &[data-score="4"]
          background: #fcae33
        &[data-score="5"]
          background: #ffcc28
        &.noEdit
          cursor: unset
</style>
