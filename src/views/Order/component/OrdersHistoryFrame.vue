<template lang="pug">
  ScrollBar.listContainer(id="OrdersHistoryFrame")
    .contentViewFix
      el-table(:data='orderHistoryList.list' border style='width: 100%' align="center")
        el-table-column(prop='createdOn' label='發起時間')
        el-table-column(prop='name' label='店家名稱')
        el-table-column(prop='createdByName' label='負責人')
        el-table-column(label='狀態')
          template(slot-scope="scope")
            span {{`${scope.row.status === 0 ? '已截止' : scope.row.status === 1 ? '進行中' : '重啟'}`}}
        el-table-column(label="功能")
          template(slot-scope="scope")
            el-button(type="primary" icon="el-icon-setting"
              @click="orderManagement(scope.row.storeId, scope.row.createdByName,scope.row.name)") 訂單管理
</template>
<script>
import ScrollBar from '@c/ScrollBar/ScrollBar'
import { mapActions } from 'vuex'

export default {
  name: 'OrdersHistoryFrame',
  created() {},
  mounted() {},
  computed: {},
  methods: {
    ...mapActions(['showDialog']),
    orderManagement(storeId, owner, storeName) {
      const load = {
        name: 'OrderManagement',
        title: `${owner} - ${storeName} - 訂單管理`
      }
      this.showDialog(load)
    }
  },
  watch: {},
  data() {
    return {
      orderHistoryList: {
        'totalSize': 30,
        'list': [
          {
            'id': 1,
            'storeId': 3,
            'status': 1,
            'name': '條條有理',
            'createdBy': 16,
            'ownerId': 16,
            'createdByName': '松庭',
            'createdOn': '2018-08-07 15:00'
          },
          {
            'id': 2,
            'storeId': 4,
            'status': 0,
            'name': '麵麵俱到',
            'createdBy': 16,
            'ownerId': 16,
            'createdByName': '松庭',
            'createdOn': '2018-08-07 15:00'
          },
          {
            'id': 3,
            'storeId': 6,
            'status': 2,
            'name': '力大麵食',
            'createdBy': 16,
            'ownerId': 16,
            'createdByName': '松庭',
            'createdOn': '2018-08-07 15:00'
          }
        ]
      }
    }
  },
  components: {
    ScrollBar
  }
}
</script>
<style lang="sass" scoped>
  .listContainer
    .contentViewFix
      /deep/th,/deep/td
        text-align: center
</style>
