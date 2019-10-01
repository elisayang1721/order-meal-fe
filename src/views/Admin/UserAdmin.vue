<template lang="pug">
  p(@click="showDailog({name:'Order',title:'123'})") admin
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserAdmin',
  created() { },
  mounted() { },
  computed: {},
  methods: {
    ...mapActions(['showDailog'])
  },
  watch: {},
  data() {
    return {}
  },
  components: {}
}
</script>
