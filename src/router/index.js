import { useAuthStores } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Home page - accessible without login
        { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
        { path: '/shop', name: 'shop', component: () => import('@/views/Shopping/ShopView.vue') },
        { path: '/product-detail/:id', name: 'productDetail', component: () => import('@/views/Shopping/ProductDetailView.vue') },

        // Auth routes
        { path: '/login', name: 'login', component: () => import('@/views/Auth/LoginView.vue') },
        { path: '/register', name: 'register', component: () => import('@/views/Auth/RegisterView.vue') },

        // Protected routes (require login)
        { path: '/profile', name: 'profile', component: () => import('@/views/Profile/ProfileView.vue'), meta: { require: true } },
        { path: '/seller', name: 'seller', component: () => import('@/views/Product/SellProduct.vue'), meta: { require: true } },
        { path: '/product', name: 'product', component: () => import('@/views/Profile/GetProduct.vue'), meta: { require: true } },
        { path: '/categories', name: 'categories', component: () => import('@/views/Categories/CategoryView.vue'), meta: { require: true } },
        { path: '/cart', name: 'cart', component: () => import('@/views/Cart/CartView.vue'), meta: { require: true } },
        { path: '/addtocart', name: 'addtocart', component: () => import('@/views/Cart/Add2Cart.vue'), meta: { require: true } },
        { path: '/purchase', name: 'purchase', component: () => import('@/views/Cart/purchasedProduct.vue'), meta: { require: true } },
        { path: '/cartcheck', name: 'cartcheck', component: () => import('@/views/Cart/CartCheck.vue'), meta: { require: true } },
        { path: '/checkout', name: 'checkout', component: () => import('@/views/Cart/Checkout.vue'), meta: { require: true } },
        { path: '/location', name: 'location', component: () => import('@/views/Location/GetMap.vue'), meta: { require: true } },
        { path: '/table', name: 'table', component: () => import('@/components/ui/BaseTable.vue'), meta: { require: true } },
        { path: '/sell', name: 'sell', component: () => import('@/views/Product/SellProduct.vue'), meta: { require: true } },
        { path: '/search', name: 'search', component: () => import('@/views/Search/SearchView.vue'), meta: { require: true } },
        { path: '/addproduct', name: 'addproduct', component: () => import('@/views/Shopping/Addproduct.vue'), meta: { require: true } },
        { path: '/updateproduct/:id', name: 'updateproduct', component: () => import('@/views/Shopping/UpdateProductView.vue'), meta: { require: true } },
        { path: '/catrgory', name: 'catrgory', component: () => import('@/views/Categories/CategoryView.vue'), meta: { require: true } },
        { path: '/skeletoncard', name: 'skeletoncard', component: () => import('@/components/Skeleton/BaseCardSkeleton.vue'), meta: { require: true } },
        { path: '/loading', name: 'loading', component: () => import('@/components/Skeleton/Loading.vue'), meta: { require: true } },
        { path: '/nodata', name: 'nodata', component: () => import('@/components/Skeleton/NoDataFound.vue'), meta: { require: true } },
        { path: '/:pathMatch(.*)*',name: 'NotFound',component: () => import('@/components/Skeleton/404.vue')}
    ],
});

// Navigation guard
router.beforeEach((to, from) => {
    const auth = useAuthStores();

    if (!auth.isLoggedIn && to.meta.require) {
        return { name: 'login' };
    }

    return true;
});

export default router;