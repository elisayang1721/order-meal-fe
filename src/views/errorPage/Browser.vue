<template lang="pug">
  #errorPage
    .box
      img(src="~@img/browser.jpg", alt="alt")
      .notice
        | Oops! IE 瀏覽器不支援，請改用 Chrome 瀏覽器
</template>
<script>
export default {
  name: 'BrowserNotSupported',
  beforeDestroy() {
    window.history.forward()
  }
}
</script>
<style lang="sass" scoped>
#errorPage
  height: 100vh
  background-color: #97d6f7
  .box
    position: absolute
    top: 40%
    left: 50%
    transform: translate(-50%,-50%)
  .notice
    font-size: 30px
    font-weight: 700
    color: #277bc1
    text-align: center
    text-shadow: 2px 2px 0 rgba(255,255,255,.45)
    margin-top: 50px
</style>
