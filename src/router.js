import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/table',
      component: () => import('./views/table')
    },
    {
      path: '*',
      redirect: '/table'
    }
  ]
})

export default router
