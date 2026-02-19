import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStores } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { require: true } },
    ],
})

// router.beforeEach((to, from) => {
//   const auth =useAuthStores();

//   if (!auth.isLoggedIn && to.meta.require) {
//     return {name: 'login'}
//   }

//   return true;

// })

export default router
