import Axios from './service'

export default {
  getMergeTotal() {
    // [未完成] 取得合併訂單總計
    return Axios({
      url: '/mergeOrderOptions/sum',
      method: 'post'
    })
  },
  exportExcel(id, data) {
    // [未完成] 匯出合併訂單 Excel
    return Axios({
      url: `/orders/${id}/orderRecords`,
      method: 'post',
      data
    })
  },
  updateMergeOptions(id, data) {
    // [請確認] 取得合併訂單選項
    return Axios({
      url: `/orderRecords/${id}`,
      method: 'get',
      data
    })
  }
}
