import { createRouter, createWebHistory } from "vue-router"
import CoachDeatail from "./pages/coaches/CoachDetail.vue"
import CoachesList from "./pages/coaches/CoachesList.vue"
import CoachRegistration from "./pages/coaches/CoachRegistration.vue"
import ContactCoach from "./pages/requests/ContactCoach.vue"
import RequestsReceived from "./pages/requests/RequestReceived.vue"
import NotFound from "./pages/NotFound.vue"
import UserAuth from "./pages/auth/UserAuth.vue"

const router = createRouter({
     history: createWebHistory(),
     routes: [
          {
               path: '/', redirect: '/coaches'
          },
          {
               path: '/coaches',
               component: CoachesList
          },
          {
               path: '/coaches/:id',
               component: CoachDeatail,
               props: true,
               children: [
                    {
                         path: 'contact',
                         component: ContactCoach
                    }
               ]
          },
          {
               path: "/register",
               component: CoachRegistration

          },
          {
               path: "/requests",
               component: RequestsReceived
          },
          {
               path: "/auth",
               component: UserAuth
          },
          {
               path: "/:catchAll(.*)",
               component: NotFound
          }
     ],
     scrollBehavior(to, from, savedPosition) {
          if (savedPosition) {
               return savedPosition
          } 
          
     }
})




export default router