import Axios from './service'
// import store from '../vuex/store'

export default {
  getOrderRecordsList(id) {
    // 取得點餐記錄列表
    return Axios({
      url: `/orders/${id}/orderRecords?page=5`,
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
  updateOrderStatus(id, data) {
    // 更新點餐狀態
    return Axios({
      url: `/orderRecords/${id}`,
      method: 'get',
      data
    })
  }
}
