import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName: "recommend" */ '@/views/recommend'),
    children: [
      { path: ':id', component: () => import(/* webpackChunkName: "recommend" */ '@/views/album') }
    ]
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import(/* webpackChunkName: "singer" */ '@/views/singer'),
    children: [
      { path: ':mid', component: () => import(/* webpackChunkName: "singer" */ '@/views/singer-detail') }
    ]
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: () => import(/* webpackChunkName: "top-list" */ '@/views/top-list'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "top-list" */ '@/views/top-detail')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search'),
    children: [
      { path: ':mid', component: () => import(/* webpackChunkName: "search" */ '@/views/singer-detail') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
