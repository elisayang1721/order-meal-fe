import Axios from './service'

export default {
  login(data) {
    console.log(data)
    // Token 驗證
    return Axios({
      url: '/authToken',
      method: 'post',
      data
    })
  },
  deptRefs() {
    // 取得部門對照
    return Axios({
      url: '/deptRefs',
      method: 'get'
    })
  },
  logOut() {
    // 登出
    return Axios({
      url: '/logout',
      method: 'post'
    })
  }
}
