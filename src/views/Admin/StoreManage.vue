<template lang="pug">
  .tabContainer
    .adminPanel
      .search
        p 店名:
        el-input.input(
          v-model="condition.searchByName"
          placeholder="請輸入店名"
          prefix-icon="el-icon-search")

      .add
        el-button.addBtn(
          @click.prevet="toggleDialog('add')"
          type="success"
          icon="el-icon-plus") 新增
    .adminPanel
      .type
        p 類型:
        el-checkbox(v-model="condition.searchAll") 全部
        el-checkbox-group(v-model="condition.searchByTypes")
          el-checkbox(v-for="type in storeType" :label="type.id" :key="type.id") {{type.name}}
    el-table(
      v-loading="loading"
      :data="storeData"
      border
      height="60vh"
      tyle="width: 100%")
      el-table-column(
        prop="name"
        label="店名")
      el-table-column(
        prop="phone"
        label="電話")
      el-table-column(
        prop="address"
        label="地址"
        width="75")
        template(slot-scope="scope")
          el-tooltip( effect="dark" placement="bottom")
            div( slot="content") {{scope.row.address}}
            i.el-icon-location-outline.address
      el-table-column(
        prop=""
        label="評價")
        template(slot-scope="scope")
          div Comming Soon
      el-table-column(
        prop="updatedOn"
        label="更新時間"
        width="300")
      el-table-column(
        prop="updatedBy"
        label="更新者")
      el-table-column(
        prop=""
        label="功能"
        width="250")
        template(slot-scope="scope")
          el-button(
            @click.prevet="toggleDialog('edit',scope.row)"
            type="info"
            icon="el-icon-edit") 編輯
          el-button(
            @click.prevet="toggleDialog('delete',scope.row)"
            type="danger"
            icon="el-icon-close") 刪除
    el-pagination(
      :current-page.sync="pageNum"
      @current-change="getData"
      :page-size="8"
      layout="prev, pager, next"
      :total="totalSize")

</template>
<script>
import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import { injectState } from '@js/model'

import store from '@api/store'


export default {
  name: 'StoreManage',
  mounted() {
    this.getData()
    this.getStoreType()
    this.$bus.$on('refresh', () => {
      this.condition.searchByTypes = []
      this.getData()
    })
  },
  methods: {
    ...mapActions(['showDialog']),
    getData: debounce(function () {
      const init = {
        name: this.condition.searchByName,
        page: this.pageNum,
        pageSize: 8,
        sort: 'ASC',
        sortName: 'updatedOn',
        types: this.condition.searchAll ? [] : this.condition.searchByTypes
      }
      this.loading = true
      store.getStoreList(init).then(res => {
        this.storeData = res.list
        this.totalSize = res.totalSize
        this.loading = false
      })
    }, 500),
    getStoreType() {
      store.getStoreType().then(res => {
        this.storeType = res.list
      })
    },
    toggleDialog(action, row = null) {
      let load
      const prop = {
        action
      }
      if (action === 'add') {
        load = {
          name: 'Store',
          title: '新增店家'
        }
      }
      if (action === 'edit' || action === 'delete') {
        prop.id = row.id
        if (action === 'edit') {
          load = {
            name: 'Store',
            title: `編輯店家 – ${row.name}`
          }
        } else {
          load = {
            name: 'Confirm',
            title: '確認刪除'
          }
        }
      }
      injectState(prop)
      this.showDialog(load)
    }
  },
  watch: {
    'condition': {
      handler() {
        this.pageNum = 1
        this.getData()
      },
      deep: true
    }
  },
  data() {
    return {
      storeData: [],
      storeType: [],
      totalSize: null,
      pageNum: 1,
      condition: {
        searchByName: '',
        searchByTypes: [],
        searchAll: false
      },
      loading: false
    }
  },
  beforeDestroy() {
    this.$bus.$off('refresh')
  }
}
</script>
<style lang="sass" scoped>
.tabContainer
  /deep/.el-checkbox-group
    margin-left: 30px
.adminPanel
  .addBtn
    +Bgc($yelColor)
    border-color: $yelColor
</style>
