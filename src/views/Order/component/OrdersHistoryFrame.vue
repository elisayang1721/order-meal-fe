<template lang="pug">
  ScrollBar.listContainer(id="OrdersHistoryFrame")
    .contentViewFix
      el-table(:data='orderHistoryList' border style='width: 100%' align="center")
        el-table-column(prop='date' label='發起時間' width='180')
        el-table-column(prop='restaurant' label='店家名稱' width='180')
        el-table-column(prop='owner' label='負責人')
        el-table-column(prop='status' label='狀態')
        el-table-column(label="功能")
          el-button(type="primary" icon="el-icon-setting"
            @click="showDialog({name:'OrderManagement',title:'Owner - 店名(電話) - 訂單管理'})") 訂單管理
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
    ...mapActions(['showDialog'])
  },
  watch: {},
  data() {
    return {
      orderHistoryList: [
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        },
        {
          date: '2019/09/30 15:00',
          restaurant: '八方雲集',
          owner: '裕介',
          status: '已結束'
        }
      ]
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
      min-width: 800px
      /deep/th,/deep/td
        text-align: center
</style>
