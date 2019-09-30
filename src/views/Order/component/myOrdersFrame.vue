<template lang="pug">
  #myOrderFrame
    ordersItem(v-for="i in 20" :key="i")
</template>
<script>
import ordersItem from './ordersItem'

export default {
  name: 'myOrdersFrame',
  props: ['data'],
  created() {	},
  mounted() {	},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {}
  },
  components: {
    ordersItem
  }
}
</script>
