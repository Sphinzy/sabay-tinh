import Login from "@/views/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

// import { useAuthStores } from '@/stores/auth'

const routes = [
    { path: '', component: () => import('@/views/HomeView.vue')}
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes : [

     {
      path: "/login",
      name: "login",
      component: Login,
    },
    ],


});


   

router.beforeEach((to, from) => {
  const auth =useAuthStores();

  if (!auth.isLoggedIn && to.meta.require) {
    return {name: 'login'}
  }

  return true;

})

export default router
