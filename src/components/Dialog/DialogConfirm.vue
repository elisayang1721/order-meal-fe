<template lang="pug">
  .dialogConfirm
    .msg
      i.el-icon-warning
      span 是否刪除
    .btnGroup
      el-button(
        type="danger"
        @click="closeDialog") 取消
      el-button(
        type="success"
        @click="confirm") 確定

</template>
<script>
// vuex
import { mapActions } from 'vuex'
import store from '@api/store'

export default {
  name: 'DialogConfirm',
  methods: {
    ...mapActions(['closeDialog']),
    confirm() {
      const id = this.$store.state.prop.id
      store.delStore(id).then(() => {
        this.$message({
          message: '刪除店家成功',
          type: 'success',
        })
        this.$bus.$emit('refresh')
        this.closeDialog()
      }).catch(() => {
        this.$bus.$emit('refresh')
        this.closeDialog()
      })
    },
  },
}
</script>
<style lang="sass" scoped>
  .dialogConfirm
    text-align: center
    .msg
      font-size: 2rem
      margin-bottom: 1rem
      .el-icon-warning
        color: #b24242
        margin-right: 1rem
    .btnGroup
      +Flex(space-around)
</style>
