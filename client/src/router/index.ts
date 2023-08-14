import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import LogoutView from '../views/LogoutView.vue';
import StorageService from '@/services/StorageService';
import AuthenticationService from '@/services/AuthenticationService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: () => {
        if (StorageService.getUserLoggedIn()) {
          return '/';
        }
      },
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: () => {
        if (StorageService.getUserLoggedIn()) {
          return '/';
        }
      },
      component: LoginView
    }, 
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: () => {
        if (!StorageService.getUserLoggedIn()) {
          return '/login';
        }
      },
      component: ProfileView
    }, 
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    }
  ]
});

router.beforeEach((to, from, next: () => void) => {
  if (StorageService.getUserLoggedIn()) {
    AuthenticationService.auth(StorageService.getToken()).then(() => {
      next();
    }).catch((error) => {
      if (error.response.status === 401 && 'message' in error.response.data) {
        StorageService.removeUserData();
      }

      next();
    });
  } else {
    next();
  }
});

export default router;
