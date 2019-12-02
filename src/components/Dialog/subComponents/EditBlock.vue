<template lang="pug">
  .editBlock(:class="{confirmDelete: isBtnShow}")
    el-button(type="info"
      @click.stop="edit") 編輯
    el-button(type="danger"
      @click.stop="deleteOrder") 刪除
    el-button.reconfirm(type="danger" icon="el-icon-warning-outline"
      @click.once="confirmDelete") 確認刪除？
</template>
<script>
export default {
  name: 'EditBlock',
  data() {
    return {
      isBtnShow: false
    }
  },
  methods: {
    deleteOrder() {
      this.isBtnShow = true
      setTimeout(() => {
        this.isBtnShow = false
      }, 2000)
    },
    edit() {
      this.$emit('edit')
    },
    confirmDelete() {
      this.$emit('confirmDelete')
    }
  }
}
</script>
