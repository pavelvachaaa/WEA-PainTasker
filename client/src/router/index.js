import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import PageNotFoundView from "../views/PageNotFoundView.vue"
import { getToken, isTokenValid } from '@/utils/auth.util'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/:pathMatch(.*)*', component: PageNotFoundView },


  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = getToken()

    if (isTokenValid(token)) {
      // User is authenticated, proceed to the route
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});


export default router
