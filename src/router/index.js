import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStores } from '@/stores/auth'

<<<<<<< HEAD
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/AddToCart",
    name: "AddToCart",
    component: () => import("@/views/AddToCart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
=======
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { require: true } },
    ],
})
>>>>>>> bade6d21ce19a6452c6277b27fd86832891d6248

// router.beforeEach((to, from) => {
//   const auth =useAuthStores();

//   if (!auth.isLoggedIn && to.meta.require) {
//     return {name: 'login'}
//   }

//   return true;

// })

export default router;
