import { assemblyParams } from '@js/model'
import Axios from './service'

export default {
  getOrderRecordsList(data) {
    const apiUrl = assemblyParams(data)
    // 取得點餐記錄列表
    return Axios({
      url: `/orderRecords?${apiUrl}`,
      method: 'get'
    })
  },
  delOrder(id) {
    // 刪除點餐
    return Axios({
      url: `/orderRecords/${id}`,
      method: 'delete'
    })
  },
  updateOrder(id) {
    // 更新點餐
    return Axios({
      url: `/orderRecords/${id}`,
      method: 'patch'
    })
  },
  addOrder(id, data) {
    // 新增點餐
    return Axios({
      url: `/orders/${id}/orderRecords`,
      method: 'post',
      data
    })
  },
  updateOrderStatus(id) {
    // 更新點餐狀態
    return Axios({
      url: `/orderRecords/${id}`,
      method: 'get'
    })
  }
}
