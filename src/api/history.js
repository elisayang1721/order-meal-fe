import Axios from './service'
// import store from '../vuex/store'

export default {
  exportRecords(id) {
    // [未完成] 匯出訂單紀錄
    return Axios({
      url: `/orders/${id}/export`,
      method: 'post'
    })
  },
  getRecordsInfo(id) {
    // [未完成] 取得單筆訂單明細
    return Axios({
      url: `/orderRecords/${id}/details`,
      method: 'get'
    })
  },
  getRecordsId(id) {
    // 取得單筆訂單資訊
    return Axios({
      url: `/orderRecords/${id}`,
      method: 'get'
    })
  },
  getRecordsList(data) {
    // 取得訂單記錄列表
    return Axios({
      url: '`/orderRecords?page=5',
      method: 'get',
      data
    })
  }
}
