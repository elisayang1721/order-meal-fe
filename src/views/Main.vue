<template lang="pug">
  main(v-loading="loading")
    router-view(v-if="checkToken")
</template>
<script>
import user from '@api/user'

export default {
  name: 'Main',
  props: ['emsToken'],
  created() { },
  mounted() {
    if (!localStorage.apiToken) {
      this.login()
    }
  },
  computed: {
    checkToken() {
      return !!this.hasToken
    }
  },
  methods: {
    login() {
      this.loading = true
      user.login(this.emsToken).then(res => {
        localStorage.setItem('apiToken', res.token)
        this.$store.state.userData = res
        this.hasToken = localStorage.apiToken
        this.loading = false
      }).catch(err => {
        this.$router.push({
          path: '/401'
        })
      })
    }
  },
  watch: {},
  data() {
    return {
      loading: false,
      hasToken: localStorage.apiToken
    }
  }
}
</script>
