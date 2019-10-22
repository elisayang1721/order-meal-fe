<template lang="pug">
  div(v-loading="loading")
    .dialoStore
      .storeHead
        .title 基本資料
        .title 菜單設定
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
              | {漢堡}
              br
              | 大麥克.129
              br
              br
              | {飲料類}
              br
              | 可樂:大杯.40,中杯.30,小杯.20
            i.el-icon-question
      .storeContent
        .contentLeft
          .content
            .contentItem
              p 店名 ：
              el-input(
                v-model="storeInfo.name"
                placeholder="請輸入店家名稱"
                clearable)
            .contentItem
              p 電話 ：
              el-input(
                v-model="storeInfo.phone"
                placeholder="請輸入店家電話"
                clearable)
            .contentItem
              p 地址 ：
              el-input(
                v-model="storeInfo.address"
                placeholder="請輸入店家地址"
                clearable)
            .contentItem
              p 簡介 ：
              el-input(
                v-model="storeInfo.description"
                type="textarea"
                :autosize="{ minRows: 4 }"
                placeholder="請輸入店家簡介")
          .content
            .title 服務類型
            .contentItem.mTop
              el-checkbox-group(v-model="storeInfo.types")
                el-checkbox(v-for="type in storeType" :label="type.id" :key="type.id") {{type.name}}
          .content
            .title 訂購說明
            .contentItem.mTop
              el-input(
                v-model="storeInfo.remark"
                type="textarea"
                :autosize="{ minRows: 4 }"
                placeholder="請輸入訂購說明")
        .contentRight
          .content
            .contentItem.marginRm
              el-input.formatForm(
                v-model="storeInfo.menuText"
                type="textarea"
                placeholder="請輸入菜單內容")
              .showForm
                .menu(v-if="storeInfo.menuJson")
                  .row
                    .cell
                      span 品名
                    .cell
                      span 價格
                  template(v-for="obj in storeInfo.menuJson.list")
                    .row
                      .cell
                        span {{obj.menuType}}
                    .row(v-for="(item, i) in obj.items" :key="item.cate")
                      .cell
                        span {{item.cate}}
                      .cell
                        template(v-if="item.meals.length === 1")
                          span {{item.meals[0].price}}
                        template(v-else)
                          span(v-for="meal in item.meals"
                          :key="meal.id") {{`${meal.name}${meal.price}`}}

    .commonBtnGroup
      el-button(@click="closeDialog") 取消
      el-button(
        type="primary"
        @click="submit()") {{`${$store.state.prop.action === 'add' ? '新增' : '修改'}`}}
</template>
<script>
// vuex
import { mapActions } from 'vuex'
import axios from 'axios'
import debounce from 'lodash/debounce'
import { textToJson, deepClone } from '@js/model'
import store from '@api/store'

export default {
  name: 'DialogStore',
  mounted() {
    this.loading = true
    if (this.$store.state.prop.action === 'add') {
      store.getStoreType().then(res => {
        this.storeType = res.list
        this.loading = false
      })
    }
    if (this.$store.state.prop.action === 'edit') {
      axios.all([
        store.getStoreType(),
        store.getStoreId(this.$store.state.prop.id)
      ]).then(axios.spread((type, info) => {
        this.storeType = type.list
        this.storeInfo = info
        this.loading = false
      }))
    }
  },
  computed: {
    getMenuJson() {
      return this.storeInfo.menuText ? textToJson(this.storeInfo.menuText) : ''
    }
  },
  methods: {
    ...mapActions(['closeDialog']),
    getStoreType() {
      store.getStoreType().then(res => {
        this.storeType = res.list
      })
    },
    addStore() {
      store.addStore(this.storeInfo).then(() => {
        this.$message({
          message: '新增店家成功',
          type: 'success'
        })
        this.$bus.$emit('refresh')
        this.closeDialog()
      })
    },
    editStore() {
      const id = this.$store.state.prop.id
      store.updateStore(id, this.storeInfo).then(() => {
        this.$message({
          message: '編輯店家成功',
          type: 'success'
        })
        this.$bus.$emit('refresh')
        this.closeDialog()
      })
    },
    submit() {
      if (this.$store.state.prop.action === 'add') {
        this.addStore()
      } else {
        this.editStore()
      }
    },
    errorMessage: debounce(vm => {
      vm.$message({
        message: '格式錯誤',
        type: 'error'
      })
    }, 500)
  },
  watch: {
    'storeInfo.menuText': {
      handler() {
        try {
          this.storeInfo.menuJson = deepClone(this.getMenuJson)
        } catch (e) {
          const vm = this
          this.errorMessage(vm)
        }
      }
    }
  },
  data() {
    return {
      storeType: [],
      storeInfo: {
        name: null,
        phone: null,
        address: null,
        description: null,
        remark: null,
        types: [],
        menuText: null,
        menuJson: null
      },
      loading: false
    }
  }
}
</script>
<style lang="sass" scope>
  .dialoStore
    +Flex(center,center)
    flex-direction: column
    position: relative
    .title
      width: 100%
      +Bgc(#8b8b8b)
      color: $c1
      font-size: 1.125rem
      letter-spacing: 1px
      text-align: center
      padding: 1rem 0
    .storeHead
      display: flex
      width: 100%
      .title:first-child
        flex: 2
      .title:last-child
        flex: 4
    .storeContent
      +Flex(center,stretch)
      padding: 1rem 0
      .content
        +Flex(center)
        flex-direction: column
        margin-bottom: 1rem
        .contentItem
          width: 100%
          +Flex(center)
          margin-bottom: 1rem
          &:last-child
            margin-bottom: unset
          p
            width: 3.25rem
            margin-right: 1rem
        .showForm, .formatForm
          +size(50%,100%)
        .formatForm
          margin-right: .5rem
          .el-textarea__inner
            border-radius: 0
            height: 100%
        .showForm
          margin-left: .5rem
          border: 1px solid #8b8b8b
          .menu
            width: 100%
            padding: 10px
            .cell
              >span
                margin: 0 5px
        .mTop
          margin-top: 1rem
        &:last-child
          margin-bottom: unset
      .contentLeft
        flex: 2
      .contentRight
        flex: 4
        padding-left: 1rem
        .content
          height: 100%
          .contentItem
            height: 100%
            .el-textarea__inner
              resize: none
              height: 100%
</style>
