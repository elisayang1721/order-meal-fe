import * as types from './types'

const actions = {
  showDailog: ({ commit }, payload, payload2) => {
    commit(types.SHOW_DAILOG, payload, payload2)
  },
  closeDailog: ({ commit }, close) => {
    commit(types.CLOSE_DAILOG, close || '')
  }
}

export default actions
