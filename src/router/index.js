import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName: "recommend" */ '@/views/recommend')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import(/* webpackChunkName: "recommend" */ '@/views/singer')
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: () => import(/* webpackChunkName: "recommend" */ '@/views/top-list')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "recommend" */ '@/views/search')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
