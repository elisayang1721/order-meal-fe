<template lang="pug">
  div
    .dialoStore
      .data
        .dialoItem
          .titile 基本資料
          .content
            .contentItem
              p 店名 ：
              el-input(
                placeholder="請輸入店家名稱"
                clearable)
            .contentItem
              p 電話 ：
              el-input(
                placeholder="請輸入店家電話"
                clearable)
            .contentItem
              p 地址 ：
              el-input(
                placeholder="請輸入店家地址"
                clearable)
            .contentItem
              p 簡介 ：
              el-input(
                type="textarea"
                :autosize="{ minRows: 4 }"
                placeholder="請輸入店家簡介")
        .dialoItem
          .titile 服務類型
          .content
            el-checkbox-group( v-model="checked")
              el-checkbox( v-for="list in checkList" :label="list")
        .dialoItem
          .titile 訂購說明
          .content
            el-input(
              type="textarea"
              :autosize="{ minRows: 4 }"
              placeholder="請輸入店家簡介")
      .menu
        .dialoItem
          .titile 菜單設定
            el-tooltip(
              effect="dark"
              placement="bottom")
              div(slot="content") {菜單分類}
                br
                | 菜單項目分類.價錢
                br
                | 菜單項目分類:菜單項目1.價錢,菜單項目2.價錢
                br
                br
                | 範例
                br
                | {漢堡}}
                br
                | 大麥克.129
                br
                br
                | {飲料類}
                br
                | 可樂:大杯.40,中杯.30,小杯.20
              i.el-icon-question
          .content
            .contentItem
              el-input.formatForm(
                type="textarea"
                placeholder="請輸入菜單內容")
              .showForm
    .commonBtnGroup
      el-button(@click="closeDialog") 取消
      el-button(type="primary") 儲存

</template>
<script>
// vuex
import { mapActions } from 'vuex'

export default {
  name: 'DialogStore',
  created() { },
  mounted() { },
  computed: {},
  methods: {
    ...mapActions(['closeDialog'])
  },
  watch: {},
  data() {
    return {
      checkList: ['便當', '素食', '麵食', '冰品', '速食', '點心', '其他', '健康餐'],
      checked: []
    }
  },
  components: {}
}
</script>
<style lang="sass" scope>
  .dialoStore
    +Flex(space-between,flex-start)
    position: relative
    .data
      width: 400px
    .menu
      width: 600px
    .dialoItem
      .titile
        +Bgc(#8b8b8b)
        color: $c1
        font-size: 1.125rem
        letter-spacing: 1px
        text-align: center
        padding: 1rem 0
      .content
        padding: 1rem
        .el-checkbox
          margin-bottom: 1rem
      .contentItem
        +Flex(space-between)
        margin-bottom: 1rem
        p
          width: 3.25rem
          margin-right: 1rem
        .el-textarea
          flex: 1
        .showForm, .formatForm
          +size(50%,610px)
        .formatForm
          .el-textarea__inner
            border-radius: 0
            height: 100%
        .showForm
          margin-left: -1px
          border: 1px solid #8b8b8b

</style>
