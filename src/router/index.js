import CartView from "@/views/CartView.vue";
import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStores } from '@/stores/auth'
import HomeView from "@/views/HomeView.vue";
import Add2Cart from "@/views/Add2Cart.vue";
import PurchasedProduct from "@/views/purchasedProduct.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { require: true } },
        { path: '/login', name: 'login', component: () => import('@/views/Auth/LoginView.vue') },
        { path: '/register', name: 'register', component: () => import('@/views/Auth/RegisterView.vue') },
        { path: '/shop', name: 'shop', component: () => import('@/views/Shopping/ShopView.vue') },
        { path: '/profile', name: 'profile', component: () => import('@/views/Profile/ProfileView.vue') },
        { path: '/seller', name: 'seller', component: () => import('@/views/Product/SellProduct.vue') },
        { path: '/product', name: 'product', component: () => import('@/views/Profile/GetProduct.vue') },
        { path: '/cart', name: 'cart', component: () => import('@/views/CartView.vue') },
        { path: '/add2cart', name: 'add2cart', component: () => import('@/views/Add2Cart.vue') },
        { path: '/purchasedProduct', name: 'purchasedProduct', component: () => import('@/views/purchasedProduct.vue') },
        { path: '/sell', name: 'sell', component: () => import('@/views/Product/SellProduct.vue') },
        { path: '/search', name: 'search', component: () => import('@/views/Search/SearchView.vue') },
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