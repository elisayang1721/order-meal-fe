import Axios from './service'

export default {
  updateEvaluation(orderRecordId, data) {
    // 修改&建立餐點評分&評論
    return Axios({
      url: `/orderRecords/${orderRecordId}/evaluations`,
      method: 'put',
      data
    })
  },
  getMyEvaluations(orderRecordId) {
    // 取得單筆餐點評價
    return Axios({
      url: `/orderRecords/${orderRecordId}/evaluations`,
      method: 'get'
    })
  },
  getAllEvaluations(orderId) {
    // 取得店家訂單評價
    return Axios({
      url: `/stores/${orderId}/evaluations`,
      method: 'get'
    })
  }
}
