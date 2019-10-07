import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_APIPATH,
  timeout: 10000

})
/** 攔截器(request): 送出請求前，於header中帶入使用者的 token */
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('apiToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject('（○′∀‵）ノ♡error', error)
  }

)

/** 攔截器(response): 依據回傳的狀態碼，預先做對應處理 */
service.interceptors.response.use(
  config => {

  }
)
export default service
