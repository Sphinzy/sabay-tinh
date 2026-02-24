import { createRouter, createWebHistory } from "vue-router";

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
      path: "/addProduct",
      name: "addProduct",
      component: () => import("@/views/Shopping/Addproduct.vue"),
    },
    {
      path: "/product-detail/:id",
      name: "productDetail",
      component: () => import("@/views/Shopping/ProductDetailView.vue"),
    },
    {
      path: "/update-product/:id",
      name: "updateProduct",
      component: () => import("@/views/Shopping/UpdateProductView.vue"),
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
      path: "/search",
      name: "search",
      component: () => import("@/views/Search/SearchView.vue"),
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

export default router;
