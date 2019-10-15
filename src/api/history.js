import { assemblyParams } from '@js/model'
import Axios from './service'

export default {
  exportRecords(id) {
    // [未完成] 匯出訂單紀錄
    return Axios({
      url: `/orders/${id}/export`,
      method: 'post'
    })
  },
  getRecordsInfo(id) {
    // [M] 取得單筆訂單明細
    return Axios({
      url: `/orderRecords/${id}/details`,
      method: 'get'
    })
  },
  getRecordsId(id) {
    // 取得單筆訂單資訊
    return Axios({
      url: `/orders/${id}`,
      method: 'get'
    })
  },
  getRecordsList(data) {
    const apiUrl = assemblyParams(data)
    // 取得訂單記錄列表
    return Axios({
      url: `/orders?${apiUrl}`,
      method: 'get',
      data
    })
  }
}
