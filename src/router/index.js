// import ProfileView from "@/views/ProfileView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStores } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: { require: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Auth/RegisterView.vue"),
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("@/views/Shopping/ShopView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile/ProfileView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/Cart/CartView.vue"),
    },
    {
      path: "/sell",
      name: "sell",
      component: () => import("@/views/Product/SellProduct.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/Search/SearchView.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/Categories/CategoryView.vue"),
    },
  ],
});

// router.beforeEach((to, from) => {
//   const auth =useAuthStores();

//   if (!auth.isLoggedIn && to.meta.require) {
//     return {name: 'login'}
//   }

//   return true;

// })

export default router
