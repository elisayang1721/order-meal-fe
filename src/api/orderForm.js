import Axios from './service'
// import store from '../vuex/store'

export default {
  getOrderForm() {
    // 取得進行中訂單列表
    return Axios({
      url: '/orders',
      method: 'get'
    })
  },
  getStoreInfos() {
    // 取得店家簡介列表
    return Axios({
      url: '/storeInfos?page=5&pageSize=10',
      method: 'get'
    })
  },
  getStoreInfoId(id) {
    // 取得單筆店家簡介
    return Axios({
      url: `/storeInfos/${id}`,
      method: 'get'
    })
  },
  updateOrderForm(id, data) {
    // 訂單更新
    return Axios({
      url: `/orders/${id}`,
      method: 'patch',
      data
    })
  },
  addOrderForm(data) {
    // 新增訂單
    return Axios({
      url: '/orders',
      method: 'get',
      data
    })
  }
}
