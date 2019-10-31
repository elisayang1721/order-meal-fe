import state from '@/vuex/state'
/* eslint-disable import/prefer-default-export */
export function thousands(num) {
  // 千分位
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function assemblyParams(params) {
  // api url 組字串
  let str = ''
  const paramsKey = Object.keys(params)
  const paramsVal = Object.values(params)

  paramsVal.forEach((item, idx) => {
    if (item !== '') {
      str += `${paramsKey[idx]}=${item}&`
    }
  })

  return str.substring(0, str.length - 1) // 去結尾&
}

export function correction(fetchData) {
  // 格式轉null
  const params = {}
  const data = { ...fetchData }
  for (const prop in data) {
    if (!data[prop].length) {
      data[prop] = null
    }
    params[prop] = data[prop]
  }
  return params
}

export function shallowClone(obj) {
  // 淺拷貝
  return Object.assign(obj)
}

export function deepClone(obj) {
  // 深拷貝
  return JSON.parse(JSON.stringify(obj))
}

export function isUndefined(val) {
  return typeof val === 'undefined'
}

export function injectState(data) {
  // data進 state
  state.prop = data
}

export function fetchState() {
  // 取state 的 data
  return state.prop
}

export function countDown(timestamp) {
  if (timestamp > 86400) {
    return Math.ceil(timestamp / 86400) + ' 天後'
  }
  if (timestamp > 3600) {
    return Math.ceil(timestamp / 3600) + ' 小時後'
  }
  if (timestamp > 60) {
    return Math.ceil(timestamp / 60) + ' 分鐘後'
  }
  return timestamp + ' 秒後'
}

export function textToJson(data) {
  const json = {
    list: []
  }
  let text = data
  text = text.replace(/[\u0020\t]/g, '').split('{').filter(item => item || false)
  text.forEach(el => {
    const list = {
      menuType: el.split('}')[0],
      items: []
    }
    const items = el.split('}')[1].split('\n').filter(item => item || false)
    items.forEach(item => {
      const mealObj = {
        cate: item.split(':')[0],
        meals: []
      }
      const patten = /\D/g
      if (patten.test(item.split(':')[1])) {
        item.split(':')[1].split(',').forEach(sort => {
          const sorts = {
            name: sort.split('.')[0],
            price: sort.split('.')[1]
          }
          mealObj.meals.push(sorts)
        })
      } else {
        mealObj.meals.push({
          name: item.split(':')[0],
          price: item.split(':')[1]
        })
      }
      list.items.push(mealObj)
    })
    json.list.push(list)
  })
  return json
}

export function exportExcel(res) {
  // 使用html a tag 將文本掛上a tag 執行download動作
  // 新增一個a tag
  const link = document.createElement('a')
  // 設置display='none'
  link.style.display = 'none'
  // 創建 blob實例，並掛上content-type
  const blob = new Blob([res.data], {
    // MIME type
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  // 建立blob 連結，並掛上a tag
  link.href = URL.createObjectURL(blob)
  // 設定下載檔案的檔名
  link.download = res.fileName
  // 將a tag 掛上DOM
  document.body.appendChild(link)
  // js操作點擊a tag
  link.click()
  // 移除a tag
  document.body.removeChild(link)
  // 釋放URL
  link.href = URL.revokeObjectURL(blob)
}
