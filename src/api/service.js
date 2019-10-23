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
    // token 過期
    if (response.status === 401) {
      localStorage.removeItem('apiToken')
    }
    Message({
      message: response.data,
      type: 'error'
    })
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('（○′∀‵）ノ♡error', response)
  }

)
export default service
