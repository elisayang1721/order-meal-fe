<template lang="pug">
  #storeInfo
    .row
      .cell
        span 店家資訊
    .row
      .cell
        span 店家
      .cell
        span {{store.name}}
    .row
      .cell
        span 電話
      .cell
        span {{store.phone}}
    .row
      .cell
        span 地址
      .cell
        span {{store.addrress}}
    .row
      .cell
        span 簡介
      .cell
        span {{store.description}}
    .row
      .cell
        span 補充
      .cell
        span {{store.remark}}
    .row
      .cell
        span 最後修改人
      .cell
        span {{store.updatedBy}}
    .row
      .cell
        span 最後修改日
      .cell
        span {{store.updatedOn}}
</template>
<script>
export default {
  name: 'StoreInfo',
  props: ['storeId'],
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      store: {
        'id': 1,
        'name': '條條有理',
        'phone': '0912345678',
        'addrress': '台中市精誠路308號(近大墩11街口)',
        'description': null,
        'remark': null,
        'updatedBy': '松庭',
        'updatedOn': '2018-08-07 15:00'
      }
    }
  },
  components: {}
}
</script>
