import * as types from './types'


const mutations = {
  [types.SHOW_DIALOG](state, payload) {
    state.dialog.name = 'Dialog' + payload.name
    state.dialog.title = payload.title
  },
  [types.CLOSE_DIALOG](state) {
    state.dialog.name = ''
    state.dialog.title = ''
  }
}

export default mutations
