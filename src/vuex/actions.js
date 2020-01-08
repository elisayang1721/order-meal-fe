import * as types from './types'

const actions = {
  showDialog: ({ commit }, payload) => {
    commit(types.SHOW_DIALOG, payload)
  },
  closeDialog: ({ commit }, close) => {
    commit(types.CLOSE_DIALOG, close || '')
  },
}

export default actions
