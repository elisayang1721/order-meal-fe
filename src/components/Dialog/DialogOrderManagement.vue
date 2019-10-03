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
                type="datetime"
                placeholder="选择日期时间")
            li
              span 截止金額
              span 無
            li
              span 訂單狀態
              el-switch(v-model="status"
                active-color="#13ce66"
                inactive-color="#ff4949")
            li
              el-button(type="success") 匯出Excel
      .contentBlock
        .contentNav 金額計算
        .content
          .alignStart 共 17 份
          div 已付 $80
          div 剩下 $1310
          div 總價 $1390
      .contentBlock
        .contentNav 公告事項
        .content
          div test
    DialogDetail
</template>
<script>
import DialogDetail from './DialogDetail'

export default {
  name: 'DialogOrderManagement',
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      dateTime: '',
      status: true
    }
  },
  components: {
    DialogDetail
  }
}
</script>
