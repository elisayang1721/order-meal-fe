<template lang="pug">
  #errorPage
    .title 401
    .section 您的登入已過期，請自員工系統重新登入。
</template>
<script>
export default {
  name: 'Page401',
  beforeDestroy() {
    window.history.forward()
  }
}
</script>
<style lang="sass" scoped>
#errorPage
  position: fixed
  +size(100%,100%,null)
  +Flex()
  flex-direction: column
  .title
    font-size: 80px
    margin-bottom: 20px
  .section
    font-size: 32px
</style>
