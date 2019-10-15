<template lang="pug">
  #orderManagement
    .managementContent
      .contentBlock
        .contentNav 進度設定
        .content
          ul.alignStart
            li
              span 截止時間
              el-date-picker(v-model="orderInfo.finishedOn"
                @change="checkDateTime"
                type="datetime"
                placeholder="选择日期时间")
            li
              span 截止金額
              span {{orderInfo.limitedPrice || '無'}}
            li
              span 訂單狀態
              .switchBlock
                span 截止
                el-switch(v-model="orderInfo.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949")
                span 進行
            li
              el-button(type="success") 匯出Excel
      .contentBlock
        .contentNav 訂單計算
        .content
          ul.alignStart
            li 共 {{orderInfo.totalAmount}} 份
            li 已訂購： {{orderInfo.orderedAmount}}份
            li 未訂購： {{orderInfo.paidAmount}}份
            li 總價： ${{orderInfo.totalPrice}}
      .contentBlock
        .contentNav 公告事項
        .content
          el-input(v-model="orderInfo.bulletin"
            type="textarea"
            maxlength="255"
            show-word-limit)
    .confirmBlock
      .phone
        i.el-icon-phone
        span {{orderInfo.storePhone}}
      el-button(type="danger") 取消
      el-button(type="success") 確認
    DialogDetail
</template>
<script>
import history from '@api/history'
import DialogDetail from './DialogDetail'

export default {
  name: 'DialogOrderManagement',
  created() { },
  mounted() {
    history.getRecordsId(this.$store.state.prop.id).then(res => {
      this.orderInfo = res
      this.init_dateTime = this.orderInfo.finishedOn
    })
  },
  computed: {},
  methods: {
    checkDateTime() {
      if (!this.orderInfo.finishedOn) {
        this.$nextTick(() => {
          this.orderInfo.finishedOn = this.init_dateTime
        })
      }
    }
  },
  watch: {},
  data() {
    return {
      init_dateTime: '',
      orderInfo: {}
    }
  },
  components: {
    DialogDetail
  }
}
</script>
<style lang="sass" scoped>
/deep/.el-input
  width: 180px
  >input
    padding: 0 10px 0 30px
    height: 24px
    line-height: 24px
  .el-input__prefix,.el-input__suffix
    .el-input__icon
      line-height: 24px
  .el-input__suffix
    right: 0
/deep/.el-button
  padding: 6px 10px
/deep/.el-switch
  margin: 0 5px
/deep/.el-textarea
  .el-textarea__inner
    height: 100%
    resize: none
</style>
