import * as types from './types'

const actions = {
  showDailog: ({ commit }, payload, payload2) => {
    commit(types.SHOW_Dailog, payload, payload2)
  },
  closeDailog: ({ commit }, close) => {
    commit(types.CLOSE_Dailog, close || '')
  }
}

export default actions
