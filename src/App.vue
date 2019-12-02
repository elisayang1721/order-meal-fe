<template lang="pug">
  #app(v-loading="loading")
    AppHeader(v-if="hasToken")
    router-view(v-if="hasToken || $route.path === '/401' || $route.path === '/browser'")
    Dialog(v-if="hasToken")
</template>
<script>
import Dialog from '@c/Dialog/Dialog'
import axios from 'axios'
import user from '@api/user'
import AppHeader from '@/layout/AppHeader'

export default {
  name: 'app',
  mounted() {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('trident')>0) {
      console.log('4ie')
      this.$router.push({
        path: '/browser'
      })
      return
    } 

    if (process.env.NODE_ENV === 'development') {
      this.devApi()
    }
    if (process.env.NODE_ENV === 'production') {
      if (this.$route.query.token) {
        const token = this.$route.query.token
        this.emsToken = token
        this.login()
      } else if (localStorage.apiToken) {
        this.hasToken = true
      } else {
        this.$router.push({
          path: '/401'
        })
      }
    }

    this.$bus.$on('clearToken', () => {
      this.hasToken = ''
      this.emsToken = ''
    })
  },
  sockets: {
    connect() {
      console.log('Your socket  has connected!')
    }
  },
  methods: {
    devApi() {
      const data = {
        employee: `${process.env.VUE_APP_ACC}`,
        password: `${process.env.VUE_APP_PWD}`
      }
      localStorage.clear()
      this.loading = true
      axios({
        url: 'http://pub.bck.bckplat.info/api/login',
        method: 'post',
        data
      }).then(res => {
        const loginToken = res.data.data.apiToken
        axios({
          url: 'http://pub.bck.bckplat.info/api/redirect/206',
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + loginToken
          }
        }).then(resp => {
          this.emsToken = resp.data.data
          this.login()
        })
      }).catch(() => {
        this.loading = false
      })
    },
    login() {
      user.login(this.emsToken).then(res => {
        localStorage.setItem('apiToken', res.token)
        localStorage.setItem('userData', JSON.stringify(res))
        this.hasToken = localStorage.apiToken
        if (this.$route.query.url !== null && this.$route.query.url !== undefined) {
          const returnurl = this.$route.query.url
          this.$router.push(returnurl)
          return
        }
        // vue-router 3.1 版本後 push/replace 返回promise，但promise被reject，未被catch
        this.$router.push('/').catch(() => {})
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$router.push({
          path: '/401'
        })
      })
    }
  },
  data() {
    return {
      emsToken: '',
      loading: false,
      hasToken: ''
    }
  },
  components: {
    AppHeader,
    Dialog
  },
  beforeDestroy() {
    this.$bus.$off('clearToken')
  }
}
</script>
