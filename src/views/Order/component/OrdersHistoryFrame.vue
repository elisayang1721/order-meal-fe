<template lang="pug">
  ScrollBar.listContainer(id="OrdersHistoryFrame"
    v-loading="loading")
    .contentViewFix
      el-table(:data='orderHistoryList' border style='width: 100%' align="center")
        el-table-column(prop='createdOn' label='發起時間')
        el-table-column(prop='storeName' label='店家名稱')
        el-table-column(prop='createdByName' label='發起人')
        el-table-column(prop='status' label='狀態')
          template(slot-scope="scope")
            span(:class="orderStatus(scope.row.status)") {{scope.row.status}}
        el-table-column(label="功能")
          template(slot-scope="scope")
            el-button.orderManagementBtn(icon="el-icon-setting"
              v-if="checkPermission(scope.row.createdByName)"
              @click="orderManagement(scope.row)") 訂單管理
</template>
<script>
import history from '@api/history'
import { injectState } from '@js/model'
import ScrollBar from '@c/ScrollBar/ScrollBar'
import { mapActions } from 'vuex'

export default {
  name: 'OrdersHistoryFrame',
  mounted() {
    this.getRecordsList()
    this.$bus.$on('refreshRecordsList', () => {
      this.getRecordsList()
    })
  },
  methods: {
    ...mapActions(['showDialog']),
    getRecordsList() {
      this.loading = true
      history.getRecordsList().then(res => {
        this.orderHistoryList = res.list
        this.loading = false
      })
    },
    orderManagement(row) {
      const load = {
        name: 'OrderManagement',
        title: `${row.createdByName} - ${row.storeName} - 訂單管理`
      }
      const prop = {
        id: row.id,
        storeId: row.storeId,
        owner: row.createByName
      }
      injectState(prop)
      this.showDialog(load)
    },
    checkPermission(name) {
      const userData = JSON.parse(localStorage.userData)
      return name === userData.memberName || userData.isAdmin
    },
    orderStatus(status) {
      let className = []
      if (status === '進行中') {
        className = 'fontGreen'
      } else if (status === '重啟') {
        className = 'fontYel'
      } else {
        className = 'fontGray'
      }
      return className
    }
  },
  data() {
    return {
      orderHistoryList: [],
      loading: false
    }
  },
  components: {
    ScrollBar
  },
  beforeDestroy() {
    this.$bus.$off('refreshRecordsList')
  }
}
</script>
<style lang="sass" scoped>
  .listContainer
    .contentViewFix
      /deep/th,/deep/td
        text-align: center
</style>
