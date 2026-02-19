import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStores } from '@/stores/auth'

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

// router.beforeEach((to, from) => {
//   const auth =useAuthStores();

//   if (!auth.isLoggedIn && to.meta.require) {
//     return {name: 'login'}
//   }

//   return true;

// })

export default router;
