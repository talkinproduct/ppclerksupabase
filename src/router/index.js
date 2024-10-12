import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/clerk-vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/voting-sessions',
    name: 'VotingSessions',
    component: () => import('@/views/VotingSessions.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/backlog',
    name: 'Backlog',
    component: () => import('@/views/Backlog.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: () => import('@/views/UserManagement.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/integrations',
    name: 'Integrations',
    component: () => import('@/views/Integrations.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isSignedIn, isLoaded } = useAuth()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoaded.value) {
      // Wait for Clerk to load
      const unsubscribe = isLoaded.subscribe((loaded) => {
        if (loaded) {
          unsubscribe()
          if (!isSignedIn.value) {
            next({ name: 'Login' })
          } else {
            next()
          }
        }
      })
    } else if (!isSignedIn.value) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router