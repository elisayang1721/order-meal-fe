<template lang="pug">
  header
    .icon(@click="switchRoute('/')")
      //- img(:src="require('@img/oms-icon.png')")
      img(:src="require('@img/oms-icon.svg')")
      span 訂餐系統
    ul.navTabs
      li(@click="switchRoute('/admin')")
        p 管理中心
      li
        p user info
</template>
<script>
export default {
  name: 'AppHeader',
  created() {},
  mounted() {},
  computed: {},
  methods: {
    switchRoute(path) {
      if (this.$route.path !== path) {
        this.$router.push({
          path
        })
      }
    }
  },
  watch: {},
  data() {
    return {}
  },
  components: {}
}
</script>
