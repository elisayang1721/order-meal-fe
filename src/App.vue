<template lang="pug">
  #app
    AppHeader
    router-view(v-if="checkToken" :emsToken="emsToken")
    Dialog
</template>
<script>
import Dialog from '@c/Dialog/Dialog'
import axios from 'axios'
import AppHeader from '@/layout/AppHeader'

export default {
  name: 'app',
  computed: {
    checkToken() {
      return this.emsToken || localStorage.apiToken
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development' && !localStorage.apiToken) {
      this.devApi()
      if (this.$route.path !== '/') {
        this.$router.push({
          path: '/'
        })
      }
    }
    if (process.env.NODE_ENV === 'production' && !localStorage.apiToken) {
      const token = this.$route.query.token
      this.emsToken = token
    }
  },
  methods: {
    devApi() {
      const data = {
        employee: `${process.env.VUE_APP_ACC}`,
        password: `${process.env.VUE_APP_PWD}`
      }
      localStorage.clear()
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
        })
      })
    }
  },
  data() {
    return {
      emsToken: ''
    }
  },
  components: {
    AppHeader,
    Dialog
  }
}
</script>
