<template lang="pug">
  div(v-loading="loading")
    .dialoStore.tableFrame
      .storeHead
        .title 基本資料
        .title 菜單設定
          el-tooltip.tooltip(
            effect="dark"
            placement="bottom")
            div(slot="content") {菜單分類}
              br
              | 菜單項目分類:價錢
              br
              | 菜單項目分類:菜單項目1.價錢,菜單項目2.價錢
              br
              br
              | 範例
              br
              | {漢堡}
              br
              | 大麥克:129
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
              p
                span *
                | 店名：
              el-input(
                v-model="storeInfo.name"
                placeholder="請輸入店家名稱"
                maxlength="25"
                clearable)
            .contentItem
              p
                span *
                | 電話：
              el-input(
                v-model="storeInfo.phone"
                placeholder="請輸入店家電話"
                maxlength="25"
                clearable)
            .contentItem
              p
                span *
                | 地址：
              el-input(
                v-model="storeInfo.address"
                placeholder="請輸入店家地址"
                maxlength="50"
                clearable)
            .contentItem
              p 低消：
              el-input(
                v-model="storeInfo.minDeliveryPrice"
                placeholder="請輸入店家外送金額"
                maxlength="4"
                clearable)
            .contentItem
              p 簡介：
              el-input(
                v-model="storeInfo.description"
                type="textarea"
                maxlength="255"
                show-word-limit
                :autosize="{ minRows: 3 }"
                placeholder="請輸入店家簡介")
          .content
            .title 服務類型
              span (請至少選擇一項)
            .contentItem.mTop
              el-checkbox-group.selectGroup(v-model="storeInfo.types")
                el-checkbox(v-for="type in storeType" :label="type.id" :key="type.id") {{type.name}}
          .content
            .title 訂購說明
            .contentItem.mTop
              el-input(
                v-model="storeInfo.remark"
                type="textarea"
                maxlength="255"
                show-word-limit
                :autosize="{ minRows: 3 }"
                placeholder="請輸入訂購說明")
        .contentRight
          .content
            .contentItem.marginRm
              .formatForm
                el-input(
                  v-model="storeInfo.menuText"
                  type="textarea"
                  :placeholder="placeholder")
                span(v-if="storeInfo.menuError") 菜單格式錯誤
              .showForm
                .formViewFix(v-if="storeInfo.menuJson")
                  .menu.tableFrame
                    .row.heading
                      .cell
                        span 品名
                      .cell
                        span 價格
                    template(v-for="obj in storeInfo.menuJson.list")
                      .row
                        .cell.menuType
                          span {{obj.menuType}}
                      .row(v-for="(item, i) in obj.items" :key="item.cate")
                        .cell
                          span {{item.cate}}
                        .cell.menuItem
                          template(v-if="item.meals.length === 1")
                            span {{formatPrice(item.meals[0].price)}}
                          template(v-else)
                            span(v-for="meal in item.meals"
                            :key="meal.id") {{`${meal.name}  ${formatPrice(meal.price)}`}}

    .commonBtnGroup
      el-button(type="danger" @click="closeDialog") 取消
      el-button(
        type="success"
        @click="submit()") {{`${$store.state.prop.action === 'add' ? '新增' : '修改'}`}}
</template>
<script>
// vuex
import { mapActions } from 'vuex'
import ScrollBar from '@c/ScrollBar/ScrollBar'
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
        store.getStoreId(this.$store.state.prop.id),
      ]).then(axios.spread((type, info) => {
        this.storeType = type.list
        this.storeInfo = info
        this.loading = false
      })).catch(() => {
        this.$bus.$emit('refresh')
        this.closeDialog()
      })
    }
  },
  computed: {
    getMenuJson() {
      return this.storeInfo.menuText ? textToJson(this.storeInfo.menuText) : ''
    },
  },
  methods: {
    ...mapActions(['closeDialog']),
    getStoreType() {
      store.getStoreType().then(res => {
        this.storeType = res.list
      })
    },
    addStore: debounce(vm => {
      store.addStore(vm.storeInfo).then(() => {
        vm.submitSuccess()
      })
    }, 500),
    updateStore: debounce(vm => {
      const id = vm.$store.state.prop.id
      store.updateStore(id, vm.storeInfo).then(() => {
        vm.submitSuccess()
      })
    }, 500),
    submit() {
      const vm = this
      const hasMenuItem = this.storeInfo.menuJson
        ? this.storeInfo.menuJson.list[0].items.length > 0 : false

      if (this.storeInfo.menuText && this.submitable && hasMenuItem) {
        if (this.$store.state.prop.action === 'add') {
          this.addStore(vm)
        } else {
          this.updateStore(vm)
        }
      } else {
        this.$message({
          message: '請輸入完整且格式正確之菜單',
          type: 'warning',
        })
      }
    },
    submitSuccess() {
      let message = ''
      if (this.$store.state.prop.action === 'add') {
        message = '新增店家成功'
      } else {
        message = '編輯店家成功'
      }
      this.$message({
        message,
        type: 'success',
      })
      this.$bus.$emit('refresh')
      this.closeDialog()
    },
    errorMessage: debounce(vm => {
      // vm.$message({
      //   message: '格式錯誤',
      //   type: 'error'
      // })
      vm.storeInfo.menuError = true
    }, 500),
    formatPrice(price) {
      return parseInt(price, 0).format()
    },
  },
  watch: {
    'storeInfo.menuText': {
      handler() {
        try {
          this.submitable = false
          this.storeInfo.menuJson = deepClone(this.getMenuJson)
          this.submitable = true
          this.storeInfo.menuError = false
        } catch (e) {
          const vm = this
          this.errorMessage(vm)
        }
      },
    },
  },
  data() {
    return {
      submitable: false,
      storeType: [],
      storeInfo: {
        name: null,
        phone: null,
        address: null,
        minDeliveryPrice: null,
        description: null,
        remark: null,
        types: [],
        menuText: null,
        menuJson: null,
        menuError: false,
      },
      loading: false,
      placeholder: '{菜單分類}\n菜單項目分類:價錢\n菜單項目分類:菜單項目1.價錢,菜單項目2.價錢\n\n{漢堡}\n大麥克:123\n\n{飲料類}\n可樂:大杯.40,中杯.30,小杯.20',
    }
  },
  components: {
    ScrollBar,
  },
}
</script>
<style lang="sass" scope>
.dialoStore
  +Flex(center,center)
  flex-direction: column
  position: relative
  &.tableFrame
    border-right: 1px solid $tableLineColor
  .title
    width: 100%
    +Bgc($tableHeadColor)
    color: $c1
    font-size: 1.125rem
    letter-spacing: 1px
    text-align: center
    padding: 0.6rem 0
    >span
      margin-left: 5px
      font-size: .9rem
  .storeHead
    display: flex
    width: 100%
    .title:first-child
      flex: 2
    .title:last-child
      flex: 4
      .tooltip
        margin-left: 5px
  .storeContent
      +Flex(center,stretch)
      padding: 1rem
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
            width: 4rem
            margin-right: 0.5rem
            font-size: 15px
            color: $darkGray
            text-align: right
            padding-right: 0.2rem
            >span
              margin-right: 5px
              color: red
        .showForm, .formatForm
          height: 100%
        .formatForm
          width: 45%
          margin-right: 0.5rem
          position: relative
          .el-textarea
            height: 100%
          span
            position: absolute
            bottom: 5px
            right: 5px
            color: red
        .el-textarea__inner
          resize: none
          border-radius: 4px
          height: 100%
          padding: 5px 10px 20px 10px
          box-sizing: border-box
        .showForm
          width: 55%
          margin-left: .5rem
          border-radius: 4px
          .formViewFix
            +size(100%,auto,null)
            .menu
              width: 100%
              margin: 0 auto
          .tableFrame
            .row
              &:first-child
                .cell
                  padding: 0.6rem 0.5rem
              .cell
                &:last-child
                  flex: 2
                &.menuItem
                  padding: 0.2rem 0.5rem !important
                  span
                    padding: 0 8px
                    margin: 5px 0 !important
                    &+span
                      border-left: 1px solid #969595
        .mTop
          margin-top: 1rem
        &:last-child
          margin-bottom: unset
      .contentLeft
        width: 33.33%
        padding-right: 0.7rem
        margin-right: 0.3rem
      .contentRight
        width: 66.66%
        .content
          height: 100%
          .contentItem
            height: 100%
.selectGroup
  padding-left: 20px
  .el-checkbox
    width: 5rem
    font-size: 1rem
    margin-bottom: 0.35rem
</style>
