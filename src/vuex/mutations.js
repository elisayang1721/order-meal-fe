import * as types from './types'


const mutations = {
  [types.SHOW_DIALOG](state, payload) {
    state.dialog.push({
      name: 'Dialog' + payload.name,
      title: payload.title
    })
  },
  [types.CLOSE_DIALOG](state) {
    const closeId = state.dialog.length - 1
    state.dialog.splice(closeId, 1)
  }
}

export default mutations
