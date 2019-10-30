<template lang="pug">
  ScrollBar#storeInfo
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
        span {{store.address}}
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
import ScrollBar from '@c/ScrollBar/ScrollBar'
import orderForm from '@api/orderForm'

export default {
  name: 'StoreInfo',
  props: ['storeId'],
  mounted() {
    this.getStoreInfo()
  },
  methods: {
    getStoreInfo() {
      orderForm.getStoreInfoId(this.storeId).then(res => {
        this.store = res
      })
    }
  },
  data() {
    return {
      store: {}
    }
  },
  components: {
    ScrollBar
  }
}
</script>
