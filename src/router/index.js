import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import AddTodo from '@/views/AddTodo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'add',
      component: AddTodo
    }
  ]
})

export default router
