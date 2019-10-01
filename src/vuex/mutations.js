import * as types from './types'


const mutations = {
  [types.SHOW_Dailog](state, payload) {
    state.dailog.name = 'Dailog' + payload.name
    state.dailog.title = payload.title
  },
  [types.CLOSE_Dailog](state) {
    state.dailog.name = ''
    state.dailog.title = ''
  }
}

export default mutations
