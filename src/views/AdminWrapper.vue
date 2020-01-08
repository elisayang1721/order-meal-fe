<template lang="pug">
  ScrollBar#AdminWrapper
    Admin
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import Admin from './Admin'

export default {
  name: 'AdminWrapper',
  components: {
    ScrollBar,
    Admin,
  },
}
</script>
