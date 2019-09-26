import Vue from 'vue'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// style

import App from './App'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render(h) { return h(App) },
}).$mount('#app')
