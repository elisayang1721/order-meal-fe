import Axios from './service'
// import store from '../vuex/store'

export default {
  getAdminList() {
    // 取得管理員列表
    return Axios({
      url: '/admins?isEnabled=true&page=5&pageSize=10',
      method: 'get'
    })
  },
  getAdminId(id) {
    // 取得單筆管理員
    return Axios({
      url: `/admins/${id}`,
      method: 'get'
    })
  },
  addAdmin(data) {
    // 新增管理員
    return Axios({
      url: '/admins',
      method: 'post',
      data

    })
  },
  updateAdmin(id, data) {
    // 更新管理員
    return Axios({
      url: `/admins/${id}`,
      method: 'patch',
      data

    })
  }
}
