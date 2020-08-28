import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/single',
    name: 'singlePlayer',
    component: () => import('@/views/Game.vue'),
    meta: { mode: 'singlePlayer' }
  },
  {
    path: '/multi/:roomId?',
    name: 'multiPlayer',
    component: () => import('@/views/Game.vue'),
    meta: { mode: 'multiPlayer' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
