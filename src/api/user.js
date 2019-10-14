import Axios from './service'

export default {
  login() {
    const emsToken = localStorage.getItem('emsToken')
    // Token 驗證
    return Axios({
      url: '/authToken',
      method: 'post',
      data: {
        emsToken
      }
    })
  },
  deptRefs() {
    // 取得部門對照
    return Axios({
      url: '/deptRefs',
      method: 'get'
    })
  },
  loginOut(data) {
    // 登出
    return Axios({
      url: '/logout',
      method: 'post',
      data: {
        data
      }
    })
  }
}
