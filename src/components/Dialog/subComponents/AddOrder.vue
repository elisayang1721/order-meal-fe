<template lang="pug">
  #addOrder
    .row
      .cell
        span 負責人
      .cell
        span 裕介
    .row
      .cell
        span 截止時間
      .cell
        el-date-picker(v-model="dateTime"
          type="datetime"
          placeholder="选择日期时间")
    .row
      .cell
        span 公告事項
      .cell
        textarea
</template>
<script>
export default {
  name: 'AddOrder',
  props: ['storeId'],
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      dateTime: ''
    }
  },
  components: {}
}
</script>
