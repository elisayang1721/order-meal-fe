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
