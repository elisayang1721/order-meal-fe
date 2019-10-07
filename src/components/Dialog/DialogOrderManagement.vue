<template lang="pug">
  #orderManagement
    .managementContent
      .contentBlock
        .contentNav 進度設定
        .content
          ul.alignStart
            li
              span 截止時間
              el-date-picker(v-model="dateTime"
                @change="checkDateTime"
                type="datetime"
                placeholder="选择日期时间")
            li
              span 截止金額
              span 無
            li
              span 訂單狀態
              .switchBlock
                span 截止
                el-switch(v-model="status"
                  active-color="#13ce66"
                  inactive-color="#ff4949")
                span 進行
            li
              el-button(type="success") 匯出Excel
      .contentBlock
        .contentNav 訂單計算
        .content
          ul.alignStart
            li 共 17 份
            li 已訂購： X份
            li 未訂購： X份
            li 總價： $1390
      .contentBlock
        .contentNav 公告事項
        .content
          textarea(maxlength="255" v-model="bulletin")
    .confirmBlock
      el-button(type="danger") 取消
      el-button(type="success") 確認
    DialogDetail
</template>
<script>
import DialogDetail from './DialogDetail'

export default {
  name: 'DialogOrderManagement',
  created() {},
  mounted() {
    this.init_dateTime = 'native Date Thu Oct 03 2019 11:30:38 GMT+0800 (台北標準時間)'
    this.dateTime = this.init_dateTime
  },
  computed: {},
  methods: {
    checkDateTime() {
      if (!this.dateTime) {
        this.$nextTick(() => {
          this.dateTime = this.init_dateTime
        })
      }
    }
  },
  watch: {},
  data() {
    return {
      init_dateTime: '',
      dateTime: '',
      status: true,
      bulletin: 'test'
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
</style>
