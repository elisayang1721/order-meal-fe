<template lang="pug">
  div
    .dialogAdmin.tableFrame
      .adminItem
        p 帳號
        el-input(
          v-model="adminData.companyAccount"
          placeholder="請輸入帳號"
          maxlength="30"
          clearable
          :disabled="mode")
      .adminItem
        p 可刪除店家
        el-switch(
          v-model="adminData.canDeleteStore"
          active-color="#47975e"
          inactive-color="#c75656"
          active-text="是"
          inactive-text="否")
      .adminItem
        p 可增修管理員
        el-switch(
          v-model="adminData.canModifyAdmin"
          active-color="#47975e"
          inactive-color="#c75656"
          active-text="是"
          inactive-text="否")
      .adminItem
        p 是否啟用
        el-switch(
          v-model="adminData.isEnabled"
          active-color="#47975e"
          inactive-color="#c75656"
          active-text="是"
          inactive-text="否")
    .commonBtnGroup
      el-button(type="danger" @click="closeDialog") 取消
      el-button(
        @click="sendData"
        type="success") {{this.$store.state.prop.action === 'add' ? '新增' : '儲存'}}
</template>
<script>
// vuex
import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import admin from '@api/admin'

export default {
  name: 'DialogAdmin',
  mounted() {
    this.init()
  },
  computed: {},
  methods: {
    ...mapActions(['closeDialog']),
    init() {
      const id = this.$store.state.prop.id
      if (id) {
        this.getData(id)
        this.mode = !this.mode
      }
    },
    getData(id) {
      admin.getAdminId(id).then(res => {
        const resData = res
        resData.companyAccount = resData.companyCode + '_' + resData.account
        for (const prop in resData) {
          this.adminData[prop] = resData[prop]
        }
      })
    },
    addAdmin: debounce(vm => {
      let message = ''
      let shouldIAdd = true
      const params = vm.adminData
      if (!params.companyAccount.length) {
        message = '請輸入管理員帳號'
        shouldIAdd = false
      }
      if (!vm.regExpId(params.companyAccount)) {
        message = '帳號格式有誤，請輸入"公司代號"_"員工編號"'
        shouldIAdd = false
      }

      if (shouldIAdd) {
        admin.addAdmin(params).then(() => {
          vm.submitSuccess()
        })
      } else {
        vm.$message({
          showClose: true,
          message,
          type: 'error'
        })
      }
    }, 500),
    updateAdmin: debounce(vm => {
      const load = {}
      const id = vm.adminData.id
      for (const prop in vm.adminData) {
        if (typeof vm.adminData[prop] === 'boolean') {
          load[prop] = vm.adminData[prop]
        }
      }
      admin.updateAdmin(id, load).then(() => {
        vm.submitSuccess()
      })
    }, 500),
    sendData() {
      const action = this.$store.state.prop.action
      const vm = this
      if (action === 'add') {
        this.addAdmin(vm)
      } else {
        this.updateAdmin(vm)
      }
    },
    submitSuccess() {
      let message = ''
      if (this.$store.state.prop.action === 'add') {
        message = '帳號新增成功'
      } else {
        message = '更新成功'
      }
      this.$message({
        message,
        type: 'success'
      })
      this.$bus.$emit('refresh')
      this.closeDialog()
    },
    regExpId(text) {
      const regex = /_/g
      return regex.test(text)
    }
  },
  data() {
    return {
      adminData: {
        companyAccount: '',
        isEnabled: false,
        canModifyAdmin: false,
        canDeleteStore: false
      },
      mode: false
    }
  }
}
</script>
<style lang="sass" scope>
.dialogAdmin
  padding: 15px 10px 10px
  &.tableFrame
    border-right: 1px solid $tableLineColor
.adminItem
  +Flex(flex-start)
  margin-bottom: 1rem
  font-size: 1.125rem
  p
    font-size: 16px
    color: $darkGray
    width: 135px
    margin-right: 1rem
    text-align: right
  .is-disabled
    .el-input__inner
      color: #000
  .el-switch
    flex: 1
    +Flex(space-around)
    .el-switch__label--left
      color: #c75656
    &.is-checked
      .el-switch__label--left
        color: #766f6f
      .el-switch__label--right
        color: #47975e
  .el-switch__label
    color: #766f6f
    *
      font-size: 16px

</style>
