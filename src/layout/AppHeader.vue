<template lang="pug">
  header
    .icon(@click="switchRoute('/')")
      img(:src="require('@img/oms-icon.svg')")
      span {{webTitle}}
    ul.navTabs
      li
        el-link(icon="el-icon-s-order"
          @click="toggleDialog") 匯出訂單
      li
        el-link(icon="el-icon-s-home"
          v-if="userData.isAdmin && $route.path === '/admin'"
          @click="switchRoute('/')") 點餐首頁
      li
        el-link(icon="el-icon-s-tools"
          v-if="userData.isAdmin && $route.path === '/'"
          @click="switchRoute('/admin')") 管理中心
      li
        el-link.user(icon="el-icon-user-solid"
          :underline="false") {{`${userData.memberName} [${userData.account}]`}}
      li
        el-link.user(icon="el-icon-wallet"
          :underline="false") 當月花費總額： {{this.userExpenses}}
      li
        el-link(icon="el-icon-switch-button"
          @click.once="logout") 登出
</template>
<script>
import user from '@api/user'
import { mapActions } from 'vuex'
// socket.io client side setting
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import Vue from 'vue'

export default {
  name: 'AppHeader',
  async mounted() {
    this.userData = JSON.parse(sessionStorage.getItem('userData'))
    this.getMonthlyExpenses()

    const {
      companyCode,
      memberName,
      deptId,
      account,
    } = this.userData
    const socket = io(`${process.env.VUE_APP_SOCKET_URL}/${companyCode}_oms`)
    Vue.use(VueSocketIOExt, socket)
    await this.$nextTick()

    this.$socket.client.emit('join', {
      userName: memberName,
      companyCode,
      systemCode: 'oms',
      deptId,
      groupId: null,
      account,
      socketId: this.$socket.client.id,
      connected_on: new Date(),
    })

    this.$socket.$subscribe(`${this.userData.companyCode}_oms`, this.handleOrderStatusChange)
    console.log(`${process.env.VUE_APP_SOCKET_URL}/${companyCode}_oms`)
    this.$bus.$on('refreshUserExpenses', () => {
      this.getMonthlyExpenses()
    })
  },
  sockets: {
    kickout() {
      this.logout()
    },
  },
  methods: {
    ...mapActions(['showDialog']),
    switchRoute(path) {
      if (this.$route.path !== path) {
        this.$router.push({
          path,
        })
      } else {
        window.location.reload()
      }
    },
    toggleDialog() {
      const load = {
        name: 'MergeOrder',
        title: '合併訂單',
      }
      this.showDialog(load)
    },
    logout() {
      user.logOut().then(() => {
        sessionStorage.clear()
        this.$bus.$emit('clearToken')
        this.$message({
          message: '登出成功',
          type: 'success',
        })
        this.$router.push({
          path: '/401',
        })
      })
    },
    getMonthlyExpenses() {
      user.monthlyExpenses().then(res => {
        this.userExpenses = res.sum.format()
      })
    },
    handleOrderStatusChange() {
      console.log('in statusChange')
      this.$bus.$emit('refreshRecordsList')
      this.$bus.$emit('refreshOrderForm')
      this.$bus.$emit('refreshSystem')
    },
  },
  data() {
    return {
      userData: {},
      userExpenses: 0,
      webTitle: document.title,
    }
  },
  beforeDestroy() {
    this.$bus.$off('refreshUserExpenses')
    this.$socket.$unsubscribe(`${this.userData.companyCode}_oms`)
  },
}
</script>
<style lang="sass" scoped>
.navTabs
  li
    &+li
      margin-left: 3px
/deep/.el-link
  margin: 10px 0 10px 10px
  font-size: 12pt
  &.el-link--default
    color: #fff
    &:hover
    &.user:hover
      cursor: default
      color: $c1
  &.is-underline
    &:hover
    &:after
      border-color: #fff
</style>
