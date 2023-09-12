import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CategoryIndex from '@/views/Category/CategoryIndex.vue'
import CategoryCreate from '@/views/Category/CategoryCreate.vue'
import CategoryHome from '@/views/Category/CategoryHome.vue'
import { currentUser } from '@/firebase/fireauth'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoryIndex,
      children: [
        {
          path: '',
          name: 'categories.home',
          component: CategoryHome
        },
        {
          path: 'create',
          name: 'categories.create',
          component: CategoryCreate
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  console.log(' ===! Routher loaded !===')

  const authStore = useAuthStore()

  const user = authStore.user ? authStore.user : await currentUser()

  if (to.path === '/login') {
    if (user) {
      return { name: 'home' }
    }
  } else {
    if (!user) {
      return { name: 'login' }
    }
  }
})

export default router
