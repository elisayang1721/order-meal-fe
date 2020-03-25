<template lang="pug">
  ScrollBar#storeInfo.tableFrame
    .row.heading
      .cell.title
        span 店家資訊
    .memList
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
          span 訂購說明
        .cell
          span {{store.remark}}
      .row
        .cell
          span 低消
        .cell
          span {{ store.minDeliveryPrice }}
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
        Object.keys(this.store).forEach(key => {
          const minDeliveryPrice = this.store.minDeliveryPrice
          if (key === 'minDeliveryPrice') {
            this.store.minDeliveryPrice = minDeliveryPrice != null ? minDeliveryPrice.format() : '無'
          }
        })
      })
    },
  },
  data() {
    return {
      store: {},
    }
  },
  components: {
    ScrollBar,
  },
}
</script>
