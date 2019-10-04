<template lang="pug">
  #app
    AppHeader
    router-view
    Dialog
</template>
<script>
// import Main from '@v/Main'
import Dialog from '@c/Dialog/Dialog'
import AppHeader from '@/layout/AppHeader'

export default {
  name: 'app',
  components: {
    AppHeader,
    Dialog
  },

}
</script>
