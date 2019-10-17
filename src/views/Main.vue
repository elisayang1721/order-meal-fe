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
    if (process.env.NODE_ENV === 'development' && !localStorage.hasOwnProperty('emsToken')) {
      this.devApi()
    }

    if (localStorage.hasOwnProperty('emsToken')) {
      this.login()
    }
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
        localStorage.setItem('emsToken', res.data.data.apiToken)
        this.login()
      })
    },
    login() {
      user.login().then(res => {
        localStorage.setItem('apiToken', res.token)
        this.$store.state.userData = res
      })
    }
  },
  watch: {},
  data() {
    return {}
  }
}
</script>
