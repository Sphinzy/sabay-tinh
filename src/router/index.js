import CartView from "@/views/CartView.vue";
import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStores } from '@/stores/auth'
import HomeView from "@/views/HomeView.vue";
import Add2Cart from "@/views/Add2Cart.vue";
import PurchasedProduct from "@/views/purchasedProduct.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView
    },
    {
        path: '/add2cart',
        name: 'add2cart',
        component: Add2Cart
    },
    {
        path: '/purchasedProduct',
        name: 'purchasedProduct',
        component: PurchasedProduct
    },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// router.beforeEach((to, from) => {
//   const auth =useAuthStores();

//   if (!auth.isLoggedIn && to.meta.require) {
//     return {name: 'login'}
//   }

//   return true;

// })

export default router
