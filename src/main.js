import Vue from 'vue'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 使用繁體中文語言包
import locale from 'element-ui/lib/locale/lang/zh-TW'

Vue.use(ElementUI, {
  locale
})

// prototype
import '@js/proto'

// style
import '@css/reset.sass'
import '@css/main.sass'
import '@css/admin.sass'
import '@css/orderModal.sass'

// socket.io client side setting
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.use(new VueSocketio({
  connection: socketio('http://api.socket.bckplat.info')
}))

/** event bus */
const eventBus = {
  install() {
    Vue.prototype.$bus = new Vue()
  }
}
Vue.use(eventBus)

import App from './App'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render(h) { return h(App) }
}).$mount('#app')
