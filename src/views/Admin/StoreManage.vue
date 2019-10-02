<template lang="pug">
  p(@click="showDialog({name:'Detail',title:'123'})") store
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'StoreManage',
  created() { },
  mounted() { },
  computed: {},
  methods: {
    ...mapActions(['showDialog'])
  },
  watch: {},
  data() {
    return {}
  },
  components: {}
}
</script>
