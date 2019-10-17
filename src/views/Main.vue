<template lang="pug">
  main
    router-view
</template>
<script>

import user from '@api/user'

import axios from 'axios'

export default {
  name: 'Main',
  created() { },
  mounted() {
    if (process.env.NODE_ENV === 'development' && !localStorage.hasOwnProperty('emsToken')) return this.devApi()

    if (localStorage.hasOwnProperty('emsToken')) return this.login()
  },
  computed: {},
  methods: {
    devApi() {
      const data = {
        employee: `${process.env.VUE_APP_ACC}`,
        password: `${process.env.VUE_APP_PWD}`
      }
      axios({
        url: 'http://larla.info/api/login',
        method: 'post',
        data
      }).then(res => {
        if (res.data.code === 200) {
          console.log('無emsToken')
          localStorage.setItem('emsToken', res.data.data.apiToken)
          this.login()
        }
      })
    },
    login() {
      user.login().then(res => {
        if (res.code === 401) {
          this.devApi()
        }
        this.$store.state.userData = res
        localStorage.setItem('apiToken', res.token)
      })
    }
  },
  watch: {},
  data() {
    return {}
  }
}
</script>
