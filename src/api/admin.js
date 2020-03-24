import { assemblyParams } from '@js/model'
import Axios from './service'

export default {
  getAdminList(data) {
    const apiUrl = assemblyParams(data)
    // 取得管理員列表
    return Axios({
      url: `/admins?${apiUrl}`,
      method: 'get',
    })
  },
  getAdminId(id) {
    // 取得單筆管理員
    return Axios({
      url: `/admins/${id}`,
      method: 'get',
    })
  },
  addAdmin(data) {
    // 新增管理員
    return Axios({
      url: '/admins',
      method: 'post',
      data,
    })
  },
  updateAdmin(id, data) {
    // 更新管理員
    return Axios({
      url: `/admins/${id}`,
      method: 'patch',
      data,

    })
  },
}
