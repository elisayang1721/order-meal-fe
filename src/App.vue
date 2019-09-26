<template lang="pug">
  #app
    AppHeader
    router-view
</template>
<script>
// import Main from '@v/Main'
import AppHeader from '@/layout/AppHeader'

export default {
  name: 'app',
  components: {
    AppHeader,
    // Main,
  },
}
</script>
