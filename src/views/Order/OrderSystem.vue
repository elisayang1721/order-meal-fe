<template lang="pug">
  #orderSystem
    .progressTitle 進行中的訂單 - {{progressList.list.length}} 項進行中
    ScrollBar.listContainer
      .contentViewFix
        OrderInProgressItem(v-for="obj in progressList.list" :key="obj.id" :list="obj")
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import OrderInProgressItem from './component/OrderInProgressItem'

export default {
  name: 'OrderSystem',
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      progressList: {
        'totalSize': 30,
        'list': [
          {
            'id': 1,
            'storeId': 3,
            'status': 1,
            'storeName': '條條有理',
            'bulletin': 'A1 B1 B2 請點這家~',
            'totalAmount': 25,
            'totalPrice': 295,
            'createdByName': '松庭',
            'createdBy': 16,
            'ownerId': 16,
            'createdOn': '2018-08-07 15:00'
          },
          {
            'id': 2,
            'storeId': 4,
            'status': 0,
            'storeName': '麵麵俱到',
            'bulletin': null,
            'totalAmount': 25,
            'totalPrice': 295,
            'createdByName': '松庭',
            'createdBy': 16,
            'ownerId': 16,
            'createdOn': '2018-08-07 15:00'
          },
          {
            'id': 3,
            'storeId': 6,
            'status': 2,
            'storeName': '力大麵食',
            'bulletin': null,
            'totalAmount': 25,
            'totalPrice': 295,
            'createdByName': '松庭',
            'createdBy': 16,
            'ownerId': 16,
            'createdOn': '2018-08-07 15:00'
          }
        ]
      }
    }
  },
  components: {
    OrderInProgressItem,
    ScrollBar
  }
}
</script>
