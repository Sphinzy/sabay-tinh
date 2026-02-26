<template>
<header class="fixed-top">
  <nav class="navbar navbar-expand-lg">
      <div class="container custom-navbar rounded-pill py-1">
        <div class="d-flex">
          <!-- Mobile menu button -->
          <button
            class="btn border-0 d-lg-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
          >
            <i class="bi bi-list fs-3 text-main"></i>
          </button>

          <!-- Brand -->
          <router-link to="/" class="text-main fs-4 text-decoration-none fw-medium">
            <img src="../../assets/image/logo.png" width="150" alt="">
          </router-link>
          <!-- Desktop menu -->
                  <ul class="navbar-nav d-none d-lg-flex flex-row ms-5">
          <li class="nav-item">
            <router-link class="nav-link text-main" to="/" active-class="active"><i
                class="bi bi-house"></i>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-main" active-class="active" to="/shop"><i
                class="bi bi-shop"></i>Shop</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-main" active-class="active" to="/addproduct"><i
                class="bi bi-box-seam"></i>Sell</router-link>
          </li>
        </ul>
        </div>


        <!-- after login  -->
        <div v-if="isLoggedIn" class="d-flex align-items-center">
          <router-link to="/search"><i class="bi bi-search fs-5 text-main me-3"></i></router-link>
          <router-link to="/cartcheck" class="cart-link position-relative d-inline-block">
            <i class="bi bi-cart3 fs-4 text-main"></i>

            <!-- Badge -->
            <span v-if="cartCount > 0" class="cart-badge">
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </router-link>

          <div class="ms-3">
            <router-link to="/profile">
            <img id="logoImage" class="rounded-circle" :src="prof.profile.avatar" alt="">
            </router-link>
          </div>
        </div>
        <!-- before login  -->
        <div v-else class="d-flex align-items-center">
          <router-link to="/search"><i class="bi bi-search fs-5 text-main me-4"></i></router-link>

          <div class="d-flex align-items-center gap-1">
            <router-link to="/login" class="d-flex align-items-center gap-1 text-main text-decoration-none auth-link">
              <i class="bi bi-person fs-5"></i>
              <span>Login</span>
            </router-link>

            <span class="text-main">/</span>

            <router-link to="/register" class="text-main text-decoration-none auth-link">
              Register
            </router-link>
          </div>

        </div>
      </div>
    </nav>
  </header>

  <!-- ================= OFFCANVAS (LEFT) ================= -->
  <div class="offcanvas offcanvas-start bg-card text-sub-main" tabindex="-1" id="offcanvasMenu">
    <div class="offcanvas-header">
      <!-- <h5>Satsya</h5> -->
      <button class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
    </div>

    <div class="offcanvas-body">
      <ul class="navbar-nav gap-3">
        <li class="nav-item">
          <router-link class="nav-link text-main" to="/" active-class="active"><i
              class="bi bi-house"></i>Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-main" active-class="active" to="/shop"><i
              class="bi bi-shop"></i>Shop</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-main" active-class="active" to="/sell"><i
              class="bi bi-box-seam"></i>Sell</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import "@/assets/style.css";
import { useAuthStores } from "@/stores/auth";
import { useCartStore } from "@/stores/fetchCart";
import { useProfileStore } from "@/stores/profile";
import { computed, onMounted, ref } from "vue"
const prof = useProfileStore();
const cartStore = useCartStore();
const cartCount = computed(() => cartStore.carts?.items?.length || 0);
const auth = useAuthStores();
// const { cartCount } = defineProps({
//   cartCount: {
//     type: Number,
//     default: 0
//   }
// })
onMounted(() => {
  prof.getProfile();
  cartStore.fetchCart()
})

const isLoggedIn = ref(auth.isLoggedIn)
</script>

<style scoped>
/* ================= NAVBAR GLASS EFFECT ================= */

.custom-navbar {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  transition: all 0.3s ease;
}

/* When scrolling */
.custom-navbar.scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(18px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Prevent content hiding under navbar */
body {
  padding-top: 90px;
}

/* ================= CART BADGE ================= */

.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: 1px;
  right: -10px;

  min-width: 18px;
  height: 18px;
  padding: 0 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 11px;

  background-color: #dc3545;
  color: white;

  border-radius: 50px;
  border: 2px solid white;

  transition: transform 0.2s ease;
}

.cart-link:hover .cart-badge {
  transform: scale(1.1);
}
.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: 1px;
  right: -10px;

  min-width: 18px;
  height: 18px;
  padding: 0 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 11px;

  background-color: #dc3545;
  color: white;

  border-radius: 50px;
  border: 2px solid white;

  transition: transform 0.2s ease;
}

.cart-link:hover .cart-badge {
  transform: scale(1.1);
}
</style>
