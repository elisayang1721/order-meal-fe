<template lang="pug">
  #errorPage
    .box
      .title 401
      .section 您的登入已過期
        br
        | 請自員工系統重新登入
    figure
      img(src="~@img/person.png", alt="alt")
</template>
<script>
export default {
  name: 'Page401',
  beforeDestroy() {
    window.history.forward()
  },
}
</script>
<style lang="sass" scoped>
#errorPage
  position: fixed
  +size(100%,100%,null)
  +Flex()
  flex-direction: column
  .box
    padding: 0 40px 0 0
    .title
      margin-bottom: 20px
      font-size: 110px
      text-align: center
      font-weight: bold
    .section
      font-size: 26px
      text-align: center
      line-height: 1.5
  figure
    position: absolute
    bottom: 0
    right: 35px
    transform: translateY(40%)
    img
      height: 90vh

</style>
