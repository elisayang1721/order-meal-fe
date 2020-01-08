import { assemblyParams } from '@js/model'
import Axios from './service'

export default {
  getMergeTotal(data) {
    const apiUrl = assemblyParams(data)
    // [C-22] 取得合併訂單總計
    return Axios({
      url: `/mergeOrderOptions/sum?${apiUrl}`,
      method: 'get',
    })
  },
  exportExcel(data) {
    // [C-22] 匯出合併訂單 Excel
    return Axios({
      url: '/mergeOrderOptions/export',
      method: 'post',
      data,
      responseType: 'blob',
    })
  },
  updateMergeOptions() {
    // [c-22] 取得合併訂單選項
    return Axios({
      url: '/mergeOrderOptions',
      method: 'get',
    })
  },
}
