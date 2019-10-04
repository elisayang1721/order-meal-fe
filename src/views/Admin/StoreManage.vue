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
        el-checkbox(label="便當") 便當
        el-checkbox(label="素食") 素食
        el-checkbox(label="麵食") 麵食
    el-table(
      :data="fakeData"
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
            @click.prevet="showDialog({name:'Store',title:`編輯店家 – ${scope.row.name}`})"
            type="info"
            icon="el-icon-edit") 編輯
          el-button(
            @click.prevet="showDialog({name:'Confirm',title:''})"
            type="danger"
            icon="el-icon-close") 刪除
    el-pagination(
      layout="prev, pager, next"
      :total="50")

</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'StoreManage',
  created() { },
  mounted() { },
  computed: {},
  methods: {
    ...mapActions(['showDialog'])
  },
  watch: {},
  data() {
    return {
      fakeData: [
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        }, {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        },
        {
          name: '低GI',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isDeleted: false,
          menuText: ''
        }

      ]
    }
  }
}
</script>
