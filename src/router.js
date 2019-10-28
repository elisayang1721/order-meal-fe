import Vue from 'vue'
import Router from 'vue-router'
import { deepClone } from '@js/model'
import { Message } from 'element-ui'
import Main from './views/Main'
import OrderMain from './views/OrderMain'
import AdminWrapper from './views/AdminWrapper'
import Page401 from './views/errorPage/Page401'

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
          component: OrderMain
        },
        {
          path: '/admin',
          name: 'AdminWrapper',
          component: AdminWrapper,
          beforeEnter: (to, from, next) => {
            const isAdmin = JSON.parse(localStorage.userData).isAdmin
            if (isAdmin) {
              next()
            } else {
              Message({
                message: '您無權限訪問此頁面',
                type: 'error'
              })
              const route = deepClone(from)
              route.name = 'OrderMain'
              next(route)
            }
          }
        }
      ]
    },
    {
      path: '/401',
      name: 'Page401',
      component: Page401,
      beforeEnter: (to, from, next) => {
        if (localStorage.apiToken) {
          const route = deepClone(from)
          route.name = 'OrderMain'
          next(route)
        } else {
          next()
        }
      }
    }
  ]
})
