import { createRouter, createWebHistory } from 'vue-router'
import TodosView from '../views/TodosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: TodosView
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/albums',
      name: 'album',
      component: () => import('../views/AlbumView.vue')
    },
    {
      path: '/albums/:id',
      name: 'albumDetail',
      component: () => import('../views/AlbumView.vue')
    }
  ]
})

export default router
