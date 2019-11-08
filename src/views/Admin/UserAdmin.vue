<template lang="pug">
  .tabContainer
    .adminPanel
      .search
        p 狀態
        el-select(
          v-model="isEnabled"
          placeholder="全部")
          el-option(
            v-for="item in statusList"
            :key="item.isEnabled"
            :label="item.text"
            :value="item.isEnabled")
      .add
        el-button.add-button(
          @click.prevet="toggleDialog('add')"
          type="success"
          icon="el-icon-plus") 新增
    .tableWrapper
      el-table(
        v-loading="loading"
        :data="adminData"
        border
        tyle="width: 100%")
        el-table-column(
          prop="memberId"
          label="帳號")
        el-table-column(
          prop="name"
          label="名稱")
        el-table-column(
          prop="isEnabled"
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
              @click.prevet="toggleDialog('edit',scope.row)"
              type="info"
              icon="el-icon-edit") 編輯
    el-pagination(
      :current-page.sync="pageNum"
      @current-change="triggerDebounce"
      :total="totalSize"
      layout="prev, pager, next"
      :page-size="9")

</template>
<script>
import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import admin from '@api/admin'
import { injectState } from '@js/model'

export default {
  name: 'UserAdmin',
  mounted() {
    this.triggerDebounce()
    this.$bus.$on('refresh', () => {
      this.triggerDebounce()
    })
  },
  computed: {
    getPayLoad() {
      const load = {
        isEnabled: this.isEnabled,
        page: this.pageNum,
        pageSize: 9
      }
      return load
    }
  },
  methods: {
    ...mapActions(['showDialog']),
    getData: debounce(vm => {
      vm.loading = true
      admin.getAdminList(vm.getPayLoad).then(res => {
        const resData = res.list

        vm.loading = false
        resData.forEach((list, i) => {
          resData[i].memberId = list.companyCode + '_' + list.account
        })
        vm.totalSize = res.totalSize
        vm.adminData = resData
      })
    }, 500),
    triggerDebounce() {
      const vm = this
      this.getData(vm)
    },
    toggleDialog(action, row = null) {
      let load
      const prop = {
        action
      }
      if (action === 'add') {
        load = {
          name: 'Admin',
          title: '新增管理員：'
        }
      }
      if (action === 'edit') {
        prop.id = row.id
        load = {
          name: 'Admin',
          title: `編輯管理員： ${row.name}`
        }
      }
      injectState(prop)
      this.showDialog(load)
    }
  },
  beforeDestroy() {
    this.$bus.$off('refresh')
  },
  watch: {
    isEnabled: {
      handler() {
        this.pageNum = 1
        this.triggerDebounce()
      },
      deep: true
    }
  },
  data() {
    return {
      statusList: [
        {
          isEnabled: null,
          text: '全部'
        },
        {
          isEnabled: true,
          text: '啟用中'
        },
        {
          isEnabled: false,
          text: '已停用'
        }
      ],
      isEnabled: null,
      totalSize: null,
      pageNum: 1,
      adminData: [],
      loading: false
    }
  }
}
</script>
<style lang="sass" scoped>
/deep/.el-input
  .el-input__inner
    background-color: $c1
::v-deep.el-select
  .el-input
    .el-select__caret
      color: $tableHeadColor
    &.is-focus, &:hover
      .el-input__inner
        border-color: #a59796
  .el-input__inner
    &:focus
      border-color: #a59796
::v-deep.el-select-dropdown__item
  &.hover, &:hover
    background-color: #f7f3f3
  &.selected
    color: $brownC2
  .tableWrapper
    height: 650px

</style>
