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
    const isEdge = navigator.userAgent.indexOf('Edge') > -1
    if (userAgent.indexOf('trident') > 0 || isEdge) {
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
        this.channel()
        const token = this.$route.query.token
        this.emsToken = token
        const data = {
          emsToken: this.emsToken,
          channel: this.emschannel
        }
        this.login(data)
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
      this.emsChannel = ''
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
          this.channel()
          this.emsToken = resp.data.data
          const data = {
            emsToken: this.emsToken,
            channel: this.emsChannel
          }
          this.login(data)
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
    login(data) {
      user.login(data).then(res => {
        localStorage.setItem('apiToken', res.token)
        localStorage.setItem('userData', JSON.stringify(res))
        this.hasToken = localStorage.apiToken
        if (this.$route.query.url !== null && this.$route.query.url !== undefined) {
          const returnurl = this.$route.query.url
          this.$router.push(returnurl)
          return
        }

        this.$socket.client.emit('join', {
          userName: res.memberName,
          companyCode: res.companyCode,
          systemCode: 'oms',
          deptId: res.deptId,
          groupId: null,
          account: res.account,
          socketId: this.$socket.client.id,
          connected_on: new Date()
        })

        // vue-router 3.1 版本後 push/replace 返回promise，但promise被reject，未被catch
        this.$router.push('/').catch(() => {})
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$router.push({
          path: '/401'
        })
      })
    },
  },
  data() {
    return {
      emsToken: '',
      emsChannel: '',
      loading: false,
      hasToken: '',
      browser: true
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
