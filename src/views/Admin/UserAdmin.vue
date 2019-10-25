<template lang="pug">
  .tabContainer
    .adminPanel
      .search
        p 狀態 ：
        el-select(
          v-model="value"
          placeholder="全部")
          el-option(
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value")
      .add
        el-button.addBtn(
          @click.prevet="showDialog({name:'Admin',title:'新增管理員'})"
          type="success"
          icon="el-icon-plus") 新增

    el-table(
      :data="fakeData"
      border
      height="60vh"
      tyle="width: 100%")
      el-table-column(
        prop="companyAccount"
        label="帳號")
      el-table-column(
        prop="memberId"
        label="名稱")
      el-table-column(
        prop=""
        label="狀態")
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
            @click.prevet="showDialog({name:'Admin',title:`編輯管理員 – `})"
            type="info"
            icon="el-icon-edit") 編輯
    el-pagination(
      layout="prev, pager, next"
      :total="50")

</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserAdmin',
  created() { },
  mounted() { },
  computed: {},
  methods: {
    ...mapActions(['showDialog'])
  },
  watch: {},
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      fakeData: [
        {
          memberId: '低GI',
          companyAccount: '20190909',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isEbabled: false,
          menuText: ''
        },
        {
          memberId: '低GI',
          companyAccount: '20190909',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isEbabled: false,
          menuText: ''
        },
        {
          memberId: '低GI',
          phone: '0987654322',
          companyAccount: '20190909',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isEbabled: false,
          menuText: ''
        },
        {
          memberId: '低GI',
          companyAccount: '20190909',
          phone: '0987654322',
          address: '台中市西屯區河南路三段120號',
          updatedOn: '2019-09-30 05:20',
          updatedBy: '巧玲',
          remark: '',
          description: '',
          isEbabled: false,
          menuText: ''
        }
      ]
    }
  }
}
</script>
<style lang="sass">
.adminPanel
  .addBtn
    +Bgc($yelColor)
    border-color: $yelColor
</style>
