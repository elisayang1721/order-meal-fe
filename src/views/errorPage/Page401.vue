<template lang="pug">
  #errorPage.orange
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
  figure
    display: none
  .box
    padding: 0 40px 0 0
  &.orange
    // background-color: #ffd74d
    .title
      font-size: 110px
      text-align: center
      font-weight: bold
    .section
      font-size: 26px
      text-align: center
      line-height: 1.5
    figure
      display: block
      position: absolute
      bottom: 0
      right: 35px
      transform: translateY(40%)
      // margin: 40px 0 0
      img
        height: 100vh

</style>
