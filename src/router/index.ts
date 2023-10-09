import { createRouter, createWebHistory } from 'vue-router'

import LayoutView from '@/views/LayoutView.vue'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

import CategoryIndex from '@/views/Category/CategoryIndex.vue'
import CategoryCreate from '@/views/Category/CategoryCreate.vue'
import CategoryHome from '@/views/Category/CategoryHome.vue'
import CategoryEdit from '@/views/Category/CategoryEdit.vue'

import PostIndex from '@/views/Post/PostIndex.vue'
import PostHome from '@/views/Post/PostHome.vue'
import PostCreate from '@/views/Post/PostCreate.vue'
import PostEdit from '@/views/Post/PostEdit.vue'

import GalleryIndex from '@/views/Gallery/GalleryIndex.vue'
import GalleryHome from '@/views/Gallery/GalleryHome.vue'
import GalleryForm from '@/views/Gallery/GalleryForm.vue'

import ErrorView from '@/views/ErrorView.vue'

import { currentUser } from '@/firebase/fireauth'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'is-active',
  // linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
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
            },
            {
              path: 'edit/:id',
              name: 'category.edit',
              component: CategoryEdit
            }
          ]
        },
        {
          path: '/posts',
          name: 'posts',
          component: PostIndex,
          children: [
            {
              path: '',
              name: 'posts.home',
              component: PostHome
            },
            {
              path: 'create',
              name: 'posts.create',
              component: PostCreate
            },
            {
              path: 'edit/:id',
              name: 'posts.edit',
              component: PostEdit
            }
          ]
        },
        {
          path: '/gallery',
          name: 'gallery',
          component: GalleryIndex,
          children: [
            {
              path: '',
              name: 'gallery.home',
              component: GalleryHome
            },
            {
              path: 'create',
              name: 'gallery.create',
              component: GalleryForm
            }
            // {
            //   path: 'edit/:id',
            //   name: 'gallery.edit',
            //   component: PostEdit
            // }
          ]
        }
      ]
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
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: ErrorView
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
