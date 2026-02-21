<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="d-flex">
          <!-- Mobile menu button -->
          <button class="btn border-0 d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
            <i class="bi bi-list fs-3 text-main"></i>
          </button>

          <!-- Brand -->
          <router-link to="/" class="text-main fs-4 text-decoration-none fw-medium">SabayTinh</router-link>
          <!-- Desktop menu -->
        </div>
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
            <router-link class="nav-link text-main" active-class="active" to="/sell"><i
                class="bi bi-box-seam"></i>Sell</router-link>
          </li>
        </ul>

        <!-- after login  -->
        <div v-if="isLoggedIn" class="d-flex align-items-center">
          <router-link to="/search"><i class="bi bi-search fs-5 text-main me-3"></i></router-link>
          <router-link class="nav-link px-2" to="/cart">
            <i class="bi bi-cart3 fs-4 text-main position-relative">
              <!-- Badge -->
              <span v-if="cartCount > 0"
                class="position-absolute start-100 translate-middle bg-danger border border-light rounded-circle"
                style="top: 15%; padding: 5px;">
              </span>
            </i>


          </router-link>

          <div class="ms-3">
            <router-link to="/profile">
              <img id="logoImage" class="rounded-circle"
                src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                alt="">
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
      <hr class="bg-white w-100" />
    </nav>
  </header>

  <!-- ================= OFFCANVAS (LEFT) ================= -->
  <div class="offcanvas offcanvas-start bg-card text-main" tabindex="-1" id="offcanvasMenu">
    <div class="offcanvas-header">
      <router-link to="/" class="text-main fs-4 text-decoration-none fw-medium">SabayTinh</router-link>
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
import { ref } from "vue";
let cartCount = ref(1);
let isLoggedIn = ref(false)


</script>

<style scoped></style>
