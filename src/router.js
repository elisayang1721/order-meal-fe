import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import OrderMain from './views/OrderMain'
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
          name: 'OrderMain',
          component: OrderMain
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
