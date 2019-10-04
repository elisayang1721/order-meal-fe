<template lang="pug">
  .dialogConfirm
    .msg
      i.el-icon-warning
      span 是否刪除
    .btnGroup
      el-button(
        type="danger") 確定
      el-button(
        type="primary"
        @click="closeDialog") 取消

</template>
<script>
// vuex
import { mapActions } from 'vuex'

export default {
  name: 'DialogConfirm',
  created() { },
  mounted() { },
  computed: {},
  methods: {
    ...mapActions(['closeDialog'])
  },
  watch: {},
  data() {
    return {}
  },
  components: {}
}
</script>
<style lang="sass" scope>
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
