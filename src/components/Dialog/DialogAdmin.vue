<template lang="pug">
  div
    .dialogAdmin
      .adminItem
        p 帳號 ：
        el-input(
          v-model="memberId"
          placeholder="請輸入帳號"
          clearable)
      .adminItem
        p 可刪除店家 ：
        el-switch(
          v-model="canDeleteStore"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否")
      .adminItem
        p 可增修管理員 ：
        el-switch(
          v-model="canModifyAdmin"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否")
      .adminItem
        p 狀態 ：
        el-switch(
          v-model="isEnabled"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否")
    .commonBtnGroup
      el-button(@click="closeDialog") 取消
      el-button(type="primary") 儲存
</template>
<script>
// vuex
import { mapActions } from 'vuex'

export default {
  name: 'DialogAdmin',
  methods: {
    ...mapActions(['closeDialog'])
  },
  watch: {},
  data() {
    return {
      memberId: '',
      isEnabled: false,
      canModifyAdmin: false,
      canDeleteStore: false

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
