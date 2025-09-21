import { createRouter, createWebHistory } from 'vue-router'
import FrontLayout from '@/views/layouts/FrontLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [{ path: '', name: 'home', component: () => import('@/views/pages/HomePage.vue') }],
    },
  ],
})

export default router
