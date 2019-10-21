<template lang="pug">
  header
    .icon(@click="switchRoute('/')")
      img(:src="require('@img/oms-icon.svg')")
      span 訂餐系統
    ul.navTabs
      li(@click="switchRoute('/admin')")
        p 管理中心
      li
        p {{`${userData.memberName} [${userData.account}]`}}
      li
        el-button(type='info' @click="logout") 登出
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
