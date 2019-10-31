<template lang="pug">
  #app(v-loading="loading")
    AppHeader(v-if="hasToken")
    router-view(v-if="hasToken || $route.path === '/401'")
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
      }).catch(() => {
        this.loading = false
      })
    },
    login() {
      user.login(this.emsToken).then(res => {
        localStorage.setItem('apiToken', res.token)
        localStorage.setItem('userData', JSON.stringify(res))
        this.hasToken = localStorage.apiToken
        if (this.$route.path !== '/') {
          this.$router.push({
            path: '/'
          })
        }
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
