<template lang="pug">
  header
    .icon(@click="switchRoute('/')")
      img(:src="require('@img/oms-icon.svg')")
      span 訂餐系統
    ul.navTabs
      li(@click="switchRoute('/admin')")
        el-link(icon="el-icon-s-home") 管理中心
      li
        el-link(icon="el-icon-user-solid") {{`${userData.memberName} [${userData.account}]`}}
      li(@click="logout")
        el-link(icon="el-icon-s-opportunity") 登出
</template>
<script>
import user from '@api/user'

export default {
  name: 'AppHeader',
  mounted() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
  },
  sockets: {
    connect() {
      // console.log('socket connected')
    }
  },
  methods: {
    switchRoute(path) {
      if (this.$route.path !== path) {
        this.$router.push({
          path
        })
      }
    },
    logout() {
      user.logOut().then(() => {
        localStorage.clear()
        this.$bus.$emit('clearToken')
        this.$message({
          message: '登出成功',
          type: 'success'
        })
        this.$router.push({
          path: '/401'
        })
      })
    }
  },
  data() {
    return {
      userData: {}
    }
  }
}
</script>
<style lang="sass" scoped>
/deep/.el-link
  margin: 10px 0 10px 10px
  font-size: 12pt
  &.el-link--default
    color: #fff
    &:hover
      color: #409EFF
</style>
