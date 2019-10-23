import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import Admin from './views/Admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'OrderMain',
          component: () => import('./views/OrderMain')
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin
        }
      ]
    },
    {
      path: '/401',
      name: 'Page401',
      component: () => import('./views/errorPage/Page401')
    }
  ]
})
