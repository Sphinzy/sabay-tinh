// import ProfileView from "@/views/ProfileView.vue";
import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStores } from '@/stores/auth'

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
         { path: '/categories', name: 'categories', component: () => import('@/views/Categories/CategoryView.vue') },
        { path: '/cart', name: 'cart', component: () => import('@/views/Cart/CartView.vue') },
        { path: '/addtocart', name: 'addtocart', component: () => import('@/views/Cart/Add2Cart.vue') },
      { path: '/purchase', name: 'purchase', component: () => import('@/views/Cart/purchasedProduct.vue') },
      { path: '/cartcheck', name: 'cartcheck', component: () => import('@/views/Cart/CartCheck.vue') },
      { path: '/checkout', name: 'checkout', component: () => import('@/views/Cart/Checkout.vue') },
      { path: '/location', name: 'location', component: () => import('@/views/Location/GetMap.vue') },
      { path: '/table', name: 'table', component: () => import('@/components/ui/BaseTable.vue') },
        { path: '/sell', name: 'sell', component: () => import('@/views/Product/SellProduct.vue') },
        { path: '/search', name: 'search', component: () => import('@/views/Search/SearchView.vue') },
        { path: '/addproduct', name: 'addproduct', component: () => import('@/views/Shopping/Addproduct.vue') },
        { path: "/product-detail/:id",name: "productDetail", component: () => import("@/views/Shopping/ProductDetailView.vue"),},
    ],
})

// router.beforeEach((to, from) => {
//   const auth =useAuthStores();

//   if (!auth.isLoggedIn && to.meta.require) {
//     return {name: 'login'}
//   }

//   return true;

// })

export default router;
