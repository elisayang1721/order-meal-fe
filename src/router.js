import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import orderMain from './views/orderMain'
import Admin from './views/Admin'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'orderMain',
          component: orderMain
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin
        }

      ]
    }
  ]
})
