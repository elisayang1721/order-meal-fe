import { assemblyParams } from '@js/model'
import Axios from './service'
// import store from '../vuex/store'

export default {
  delStore(id) {
    // 刪除店家
    return Axios({
      url: `/stores/${id}`,
      method: 'delete'
    })
  },
  updateStore(id, data) {
    // 更新店家
    return Axios({
      url: `/stores/${id}`,
      method: 'patch',
      data
    })
  },
  addStore(data) {
    // 新增店家
    return Axios({
      url: '/stores',
      method: 'post',
      data
    })
  },
  getStoreId(id) {
    // 取得單筆店家(完整)
    return Axios({
      url: `/storeDetails/${id}`,
      method: 'get'
    })
  },
  getStoreList(data) {  
    const apiUrl = assemblyParams(data)
    // 取得店家列表
    return Axios({
      url: `/stores?${apiUrl}`,
      method: 'get'
    })
  },
  getStoreType() {
    // 取得店家服務類型
    return Axios({
      url: '/storeTypes',
      method: 'get'
    })
  },
  getStoreMenu(id) {
    // 取得店家菜單
    return Axios({
      url: `/stores/${id}/menus`,
      method: 'get'
    })
  },
  getAllStoreMenu() {
    // 取得所有店家菜單
    return Axios({
      url: '/transform',
      method: 'get'
    })
  }
}
