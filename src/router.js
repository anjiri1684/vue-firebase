import { createRouter, createWebHistory } from "vue-router"
import CoachDeatail from "./pages/coaches/CoachDetail.vue"
import CoachesList from "./pages/coaches/CoachesList.vue"
import CoachRegistration from "./pages/coaches/CoachRegistration.vue"
import ContactCoach from "./pages/requests/ContactCoach.vue"
import RequestsReceived from "./pages/requests/RequestReceived.vue"
import NotFound from "./pages/NotFound.vue"
import UserAuth from "./pages/auth/UserAuth.vue"
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDeatail,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnAuth: true,
      },
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
  },
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});




export default router