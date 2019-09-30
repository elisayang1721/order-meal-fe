<template lang="pug">
  div
    HistoryItem(v-for="i in 5" :key="i")
</template>
<script>
import HistoryItem from './historyItem'

export default {
  name: 'ordersHistoryFrame',
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
    HistoryItem
  }
}
</script>
