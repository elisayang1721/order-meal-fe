<template lang="pug">
  header
    .icon(@click="switchRoute('/')")
      img(:src="require('@img/oms-icon.svg')")
      span 訂餐系統
    ul.navTabs
      li
        el-link(icon="el-icon-s-order"
          @click="toggleDialog") 匯出訂單
      li
        el-link(icon="el-icon-s-home"
          v-if="checkPermission && $route.path === '/admin'"
          @click="switchRoute('/')") 點餐首頁
      li
        el-link(icon="el-icon-s-home"
          v-if="checkPermission && $route.path === '/'"
          @click="switchRoute('/admin')") 管理中心
      li
        el-link.user(icon="el-icon-user-solid"
          :underline="false") {{`${userData.memberName} [${userData.account}]`}}
      li
        el-link(icon="el-icon-s-opportunity"
          @click.once="logout") 登出
</template>
<script>
import user from '@api/user'
import { mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  mounted() {
    this.userData = JSON.parse(localStorage.getItem('userData'))
  },
  computed: {
    checkPermission() {
      const userData = JSON.parse(localStorage.userData)
      return userData.isAdmin
    }
  },
  sockets: {
    bck_oms() {
      // handle 訂單狀態、截止時間更動
      this.$bus.$emit('refreshRecordsList')
      this.$bus.$emit('refreshOrderForm')
      this.$bus.$emit('refreshSystem')
    }
  },
  methods: {
    ...mapActions(['showDialog']),
    switchRoute(path) {
      if (this.$route.path !== path) {
        this.$router.push({
          path
        })
      } else {
        window.location.reload()
      }
    },
    toggleDialog() {
      const load = {
        name: 'MergeOrder',
        title: '合併訂單'
      }
      this.showDialog(load)
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
      color: $yelColor
    &.user:hover
      cursor: default
      color: $c1
  &.is-underline
    &:hover
    &:after
      border-color: $yelColor
</style>
