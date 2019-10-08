import Axios from './service'

export default {
  login() {
    // Token 驗證
    return Axios({
      url: '/authToken',
      method: 'post',
      data: {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbGFybGEuaW5mby9hcGkvbG9naW5BcGkiLCJpYXQiOjE1Njk5MTUwOTgsImV4cCI6MTU2OTk0Mzg5OCwibmJmIjoxNTY5OTE1MDk4LCJqdGkiOiJBVDVtRm01U0tLUGFqR0JpIiwic3ViIjoxMDksInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJpZCI6MTA5LCJlbXBsb3llZSI6IjIwMTgxMjAxIiwiY29tcGFueUNvZGUiOiJiY2siLCJpZENvbXBhbnkiOjEsImlkRGVwYXJ0bWVudCI6OCwibGV2ZWwiOjEwLCJuaWNrTmFtZSI6Ilx1Njc3ZVx1NWVhZCJ9.FnwraePuqVp7OlgEE6ODekQIjabkxyZMwcn94n3dEmY'
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
