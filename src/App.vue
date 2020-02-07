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
  created() {
    document.title = ''
  },
  mounted() {
    const userAgent = navigator.userAgent.toLowerCase()
    const isEdge = navigator.userAgent.indexOf('Edge') > -1
    if (userAgent.indexOf('trident') > 0 || isEdge) {
      this.$router.push({
        path: '/browser',
      })
      return
    }
    if (process.env.NODE_ENV === 'development') {
      this.devApi()
    }
    if (process.env.NODE_ENV === 'production') {
      this.urlTitle()
      if (this.$route.query.token) {
        this.channel()
        const token = this.$route.query.token
        this.emsToken = token
        const data = {
          emsToken: this.emsToken,
          channel: this.emsChannel,
        }
        this.login(data)
      } else if (sessionStorage.apiToken) {
        this.hasToken = true
      } else {
        this.$router.push({
          path: '/401',
        })
      }
    }

    this.$bus.$on('clearToken', () => {
      this.hasToken = ''
      this.emsToken = ''
      this.emsChannel = ''
    })
  },
  methods: {
    devApi() {
      const data = {
        employee: `${process.env.VUE_APP_ACC}`,
        password: `${process.env.VUE_APP_PWD}`,
      }
      sessionStorage.removeItem('apiToken')
      sessionStorage.removeItem('userData')
      this.loading = true
      axios({
        url: 'http://pub.bck.bckplat.info/api/login',
        method: 'post',
        data,
      }).then(res => {
        const loginToken = res.data.data.apiToken
        axios({
          url: 'http://pub.bck.bckplat.info/api/redirect/206',
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + loginToken,
          },
        }).then(resp => {
          this.urlTitle()
          this.channel()
          this.emsToken = resp.data.data
          const load = {
            emsToken: this.emsToken,
            channel: this.emsChannel,
          }
          this.login(load)
        })
      }).catch(() => {
        this.loading = false
      })
    },
    channel() {
      if (this.$route.query.channel) {
        const channel = this.$route.query.channel
        this.emsChannel = channel
      } else {
        this.emsChannel = null
      }
    },
    urlTitle() {
      if (this.$route.query.token) {
        if (this.$route.query.title) {
          sessionStorage.setItem('userTitle', this.$route.query.title)
        } else {
          sessionStorage.removeItem('userTitle')
        }
      }
      if (sessionStorage.userTitle) {
        document.title = sessionStorage.userTitle
      } else {
        console.log(this.webTitle)
        document.title = this.webTitle
      }
    },
    login(data) {
      user.login(data).then(res => {
        sessionStorage.setItem('apiToken', res.token)
        sessionStorage.setItem('userData', JSON.stringify(res))
        this.hasToken = sessionStorage.apiToken
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
          path: '/401',
        })
      })
    },
  },
  data() {
    return {
      emsToken: '',
      emsChannel: null,
      loading: false,
      hasToken: '',
      browser: true,
      webTitle: '訂餐系統',
    }
  },
  components: {
    AppHeader,
    Dialog,
  },
  beforeDestroy() {
    this.$bus.$off('clearToken')
  },
}
</script>
