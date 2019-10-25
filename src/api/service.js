import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_APIPATH,
  timeout: 10000
})
/** 攔截器(request): 送出請求前，於header中帶入使用者的 token */
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('apiToken')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('（○′∀‵）ノ♡error', error)
  }

)

/** 攔截器(response): 依據回傳的狀態碼，預先做對應處理 */
service.interceptors.response.use(
  response => {
    const hasDisposition = response.request.getResponseHeader('Content-Disposition')
    if (hasDisposition) {
      const fileName = decodeURIComponent(hasDisposition.split("utf-8''")[1].split('.')[0])
      return {
        data: response.data,
        fileName
      }
    }
    return response.data
  },
  error => {
    const { response } = error
    let errorMessage = ''
    // token 過期
    if (response.status === 401) {
      localStorage.removeItem('apiToken')
      errorMessage = '驗證錯誤/驗證已逾期，請重新登入驗證。'
      window.location.href = '/401'
    }
    // 無權限
    if (response.status === 403) {
      errorMessage = '您無此操作的權限，請聯絡系統管理員。'
    }
    // 500
    if (response.status === 500) {
      errorMessage = '系統發生內部錯誤，請聯絡系統管理員。'
    }
    Message({
      message: response.data || errorMessage,
      type: 'error'
    })
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('（○′∀‵）ノ♡error', response)
  }

)
export default service
