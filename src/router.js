import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/layout.vue'
import Main from './layout/main/main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Main',
          component: Main,
        },
      ],
    },
  ],
})
