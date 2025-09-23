import { createRouter, createWebHistory } from 'vue-router'
import FrontLayout from '@/views/layouts/FrontLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [
        { path: '', name: 'home', component: () => import('@/views/pages/HomePage.vue') },
        {
          path: 'category',
          name: 'category',
          component: () => import('@/views/pages/CategoryPage.vue'),
        },
        {
          path: 'category/:categorySlug',
          name: 'category-detail',
          component: () => import('@/views/pages/CategoryPage.vue'),
        },
        {
          path: 'category/:categorySlug/:subCategorySlug',
          name: 'subcategory-detail',
          component: () => import('@/views/pages/CategoryPage.vue'),
        },
        {
          path: 'category/:categorySlug/:subCategorySlug/:id',
          name: 'detail',
          component: () => import('@/views/pages/DetailPage.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/pages/AdminPage.vue'),
    },
  ],
})

export default router
