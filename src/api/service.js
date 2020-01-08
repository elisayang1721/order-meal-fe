import axios from 'axios'
import { Message } from 'element-ui'

const localHerf = () => {
  return process.env.VUE_APP_APIPATH
}

const officialHerf = () => {
  const href = window.location.origin.replace('www', 'pub') + '/' + process.env.VUE_APP_BOTTOM
  return href
}

const mainHref = (window.location.href.indexOf('localhost:') > -1) ? localHerf() : officialHerf()

const service = axios.create({
  baseURL: mainHref,
  timeout: 10000,
})
/** 攔截器(request): 送出請求前，於header中帶入使用者的 token */
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('apiToken')
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
        fileName,
      }
    }
    return response.data
  },
  error => {
    const { response } = error
    const errorMsg = {
      message: '',
      type: 'error',
      duration: 3000,
      showClose: false,
    }
    switch (response.status) {
      // token 過期
      case 401:
        sessionStorage.removeItem('apiToken')
        errorMsg.message = '驗證錯誤/驗證已逾期，請重新登入驗證。'
        window.location.href = '/401'
        break
      // 無權限
      case 403:
        errorMsg.message = '您無此操作的權限，請聯絡系統管理員。'
        break
      // 429 too many request dont trigger error message
      case 429:
        errorMsg.message = '請求太頻繁。'
        errorMsg.duration = 0
        errorMsg.showClose = true
        break
      // 500
      case 500:
        errorMsg.message = '系統發生內部錯誤，請聯絡系統管理員。'
        break
      default:
        errorMsg.message = response.data
        break
    }
    Message(errorMsg)
    return Promise.reject(new Error(errorMsg.message), response)
  }
)
export default service
