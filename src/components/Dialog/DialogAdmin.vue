<template lang="pug">
  div
    .dialogAdmin
      .adminItem
        p 帳號 ：
        el-input(
          v-model="adminData.companyAccount"
          placeholder="請輸入帳號"
          clearable
          :disabled="mode")
      .adminItem
        p 可刪除店家 ：
        el-switch(
          v-model="adminData.canDeleteStore"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否")
      .adminItem
        p 可增修管理員 ：
        el-switch(
          v-model="adminData.canModifyAdmin"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否")
      .adminItem
        p 狀態 ：
        el-switch(
          v-model="adminData.isEnabled"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否")
    .commonBtnGroup
      el-button(@click="closeDialog") 取消
      el-button(
        @click="sendData"
        type="primary") 儲存
</template>
<script>
// vuex
import { mapActions } from 'vuex'
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
    sendData() {
      const action = this.$store.state.prop.action
      const params = {}
      const apiData = { ...this.adminData }
      const id = apiData.id
      if (action === 'add') {
        for (const prop in apiData) {
          params[prop] = apiData[prop]
        }
        if (!params.companyAccount.length) {
          return this.$message({
            showClose: true,
            message: '請輸入管理員帳號',
            type: 'error'
          })
        }
        if (!this.regExpId(params.companyAccount)) {
          return this.$message({
            showClose: true,
            message: '帳號格式有誤，請輸入"公司代號"_"員工編號"',
            type: 'error'
          })
        }
        admin.addAdmin(params).then(res => {
          if (res.status === 201) {
            this.$bus.$emit('refresh')
            this.closeDialog()
            return this.$message({
              showClose: true,
              message: '帳號新增成功。',
              type: 'success'
            })
          }
          if (res.status === 400) {
            return this.$message({
              showClose: true,
              message: ' 新增失敗。',
              type: 'error'
            })
          }
        })
      } else {
        for (const prop in apiData) {
          if (typeof apiData[prop] !== 'boolean') {
            continue
          }
          params[prop] = apiData[prop]
        }
        admin.updateAdmin(id, params).then(res => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.$bus.$emit('refresh')
          this.closeDialog()
        })
      }
    },
    regExpId(text) {
      const regex = /_/g
      return regex.test(text)
    }
  },
  watch: {},
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
  .adminItem
    +Flex(flex-start)
    margin-bottom: 1rem
    font-size: 1.125rem
    p
      width: 150px
      margin-right: 1rem
      text-align: right
    .is-disabled
      .el-input__inner
        color: #000
    .el-switch
      flex: 1
      +Flex(space-around)
      .el-switch__label--left
        color: #ff4949
      &.is-checked
        .el-switch__label--left
          color: #000
        .el-switch__label--right
          color: #13ce66
</style>
