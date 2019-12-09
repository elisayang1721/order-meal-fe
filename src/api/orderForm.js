import { assemblyParams } from '@js/model'
import Axios from './service'

export default {
  getOrderForm() {
    // 取得進行中訂單列表
    return Axios({
      url: '/onGoingOrders',
      method: 'get'
    })
  },
  getStoreInfos(data) {
    // console.log(data)
    const apiUrl = assemblyParams(data)
    // 取得店家簡介列表
    return Axios({
      url: `/storeInfos?${apiUrl}`,
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
    // 更新訂單
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
      method: 'post',
      data
    })
  }
}
