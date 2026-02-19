<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="d-flex">
          <!-- Mobile menu button -->
          <button
            class="btn border-0 d-lg-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
          >
            <i class="bi bi-list fs-3 text-sub-main"></i>
          </button>

          <!-- Brand -->
          <router-link
            to="/"
            class="text-main fs-4 text-decoration-none fw-medium"
            >SabayJay</router-link
          >
          <!-- Desktop menu -->
          <ul class="navbar-nav d-none d-lg-flex flex-row ms-5">
            <li class="nav-item">
              <router-link class="nav-link text-sub-main"
                ><i class="bi bi-house"></i>Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-sub-main"
                ><i class="bi bi-shop"></i>Shop</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-sub-main"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-x-diamond"></i> Categories
              </a>

              <ul class="dropdown-menu border-0 shadow">
                <li>
                  <router-link
                    class="dropdown-item text-sub-main"
                    to="/category/men"
                  >
                    Men
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-sub-main"
                    to="/category/women"
                  >
                    Women
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-sub-main"
                    to="/category/shoes"
                  >
                    Shoes
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-sub-main"
                    to="/category/accessories"
                  >
                    Accessories
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <router-link class="nav-link text-sub-main"
                ><i class="bi bi-cart3"></i>Cart</router-link
              >
            </li>
          </ul>
        </div>

        <div class="d-flex">
          <input type="text" class="form-control" placeholder="Search..." />
          <div class="ms-3">
            <img
              id="logoImage"
              class="rounded-circle"
              src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <hr class="bg-white w-100" />
    </nav>
  </header>

  <!-- ================= OFFCANVAS (LEFT) ================= -->

  <div
    class="offcanvas offcanvas-start bg-card text-sub-main"
    tabindex="-1"
    id="offcanvasMenu"
  >
    <div class="offcanvas-header">
      <h5>Satsya</h5>
      <button
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>

    <div class="offcanvas-body">
      <ul class="navbar-nav gap-3">
        <li class="nav-item">
          <router-link class="nav-link text-sub-main"
            ><i class="bi bi-house"></i>Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-sub-main"
            ><i class="bi bi-shop"></i>Shop</router-link
          >
        </li>
        <li>
          <span class="nav-link text-sub-main fw-bold">Categories</span>
        </li>
        <li>
          <router-link class="nav-link text-sub-main ps-4" to="/category/men"
            >Men</router-link
          >
        </li>
        <li>
          <router-link class="nav-link text-sub-main ps-4" to="/category/women"
            >Women</router-link
          >
        </li>
        <li>
          <router-link class="nav-link text-sub-main ps-4" to="/category/shoes"
            >Shoes</router-link
          >
        </li>

        <li class="nav-item">
          <arouter-link class="nav-link text-sub-main"
            ><i class="bi bi-cart3"></i>Cart</arouter-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import "@/assets/style.css";
</script>

<style scoped></style>
