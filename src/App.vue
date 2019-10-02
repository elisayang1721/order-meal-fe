<template lang="pug">
  #app
    AppHeader
    router-view
    Dialog(v-if="dialog.name")
</template>
<script>
// import Main from '@v/Main'
import Dialog from '@c/Dialog/Dialog'
import { mapState } from 'vuex'
import AppHeader from '@/layout/AppHeader'

export default {
  name: 'app',
  components: {
    AppHeader,
    Dialog
  },
  computed: {
    ...mapState(['dialog'])
  }
}
</script>
