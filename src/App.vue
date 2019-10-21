<template lang="pug">
  #app(v-loading="loading")
    AppHeader(v-if="hasToken")
    router-view( v-if="hasToken || $route.path === '/401'")
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
    if (process.env.NODE_ENV === 'development' && !localStorage.apiToken) {
      this.devApi()
      if (this.$route.path !== '/') {
        this.$router.push({
          path: '/'
        })
      }
    } else {
      const token = this.$route.query.token
      this.emsToken = token
    }
    this.$bus.$on('clearToken', () => {
      this.hasToken = ''
      this.emsToken = ''
    })
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
        url: 'http://larla.info/api/login',
        method: 'post',
        data
      }).then(res => {
        const loginToken = res.data.data.apiToken
        axios({
          url: 'http://larla.info/api/redirect/206',
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + loginToken
          }
        }).then(resp => {
          this.emsToken = resp.data.data
          this.login()
        })
      })
    },
    login() {
      user.login(this.emsToken).then(res => {
        localStorage.setItem('apiToken', res.token)
        localStorage.setItem('userData', JSON.stringify(res))
        this.hasToken = localStorage.apiToken
        this.loading = false
      }).catch(() => {
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
      hasToken: localStorage.apiToken
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
