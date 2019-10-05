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
  addStore(id, data) {
    // 新增店家
    return Axios({
      url: `/stores/${id}`,
      method: 'post',
      data
    })
  },
  getStoreId(id) {
    // 取得單筆店家(完整)
    return Axios({
      url: `/stores/${id}`,
      method: 'get'
    })
  },
  getStoreList() {
    // 取得店家列表
    return Axios({
      url: '/stores?name=炒麵&page=5&pageSize=10&sort=DESC&sortName=id&types=1,2,9',
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
  }
}
