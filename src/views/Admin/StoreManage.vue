<template lang="pug">
  p(@click="showDailog({name:'Detail',title:'123'})") store
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'StoreManage',
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
