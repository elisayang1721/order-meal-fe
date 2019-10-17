<template lang="pug">
  .tabContainer
    .adminPanel
      .search
        p 店名 ：
        el-input.input(
          placeholder="請輸入店名"
          prefix-icon="el-icon-search")

      .add
        el-button(
          @click.prevet="showDialog({name:'Store',title:'新增店家'})"
          type="success"
          icon="el-icon-plus") 新增
    .adminPanel
      .type
        p 類型 ：
        el-radio(label="全部") 全部
        el-checkbox(:label="type.name" v-for="type in storeType") {{type.name}}

    el-table(
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
            @click.prevet="editStore(scope)"
            type="info"
            icon="el-icon-edit") 編輯
          el-button(
            @click.prevet="showDialog({name:'Confirm',title:''})"
            type="danger"
            icon="el-icon-close") 刪除
    el-pagination(
      v-model="pageNum"
      layout="prev, pager, next"
      :total="50")

</template>
<script>
import { mapActions } from 'vuex'

import { injectState } from '@js/model'

import store from '@api/store'


export default {
  name: 'StoreManage',
  created() { },
  mounted() {
    this.getData()
    this.getStoreType()
  },
  computed: {},
  methods: {
    ...mapActions(['showDialog']),
    getData() {
      const init = {
        name: '',
        page: this.pageNum,
        pageSize: 10,
        sort: 'ASC',
        sortName: '',
        types: []
      }
      store.getStoreList(init).then(res => {
        this.storeData = res.list
      })
    },
    getStoreType() {
      store.getStoreType().then(res => {
        this.storeType = res.list
      })
    },
    addStore() { },
    editStore(scope) {
      injectState(scope.row.id)
      this.showDialog({ name: 'Store', title: `編輯店家 – ${scope.row.name}` })
    },
    delStore() { }
  },
  data() {
    return {
      storeData: [],
      storeType: [],
      pageNum: 1
    }
  }
}
</script>
