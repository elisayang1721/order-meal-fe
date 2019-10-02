<template lang="pug">
  #app
    AppHeader
    router-view
</template>
<script>
import AppHeader from '@/layout/AppHeader'

export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>
