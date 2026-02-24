<template>
  <Navbar />
  <!-- hero banner -->
  <div class="px-3 pt-3">
    <div class="hero-banner shadow-lg rounded-5 overflow-hidden">
      <div class="overlay d-flex align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-md-6 offset-md-6 px-md-5">
              <div class="hero-content">
                <h1 class="display-5 mb-3 text-white">
                  Shop with
                  <span class="hero-text display-1 fw-bold">SabayJay</span>
                </h1>
                <p class="lead mb-4 text-white-50 lh-base">
                  Explore great deals or start selling your products with ease —
                  and connect with thousands of active buyers today.
                </p>
                <div class="d-flex gap-3">
                  <RouterLink
                    to="/shop"
                    class="btn btn-main-hero btn-lg px-4 rounded-pill fw-bold shadow-sm text-white"
                  >
                    Start Shopping
                  </RouterLink>
                  <RouterLink
                    to="/addproduct"
                    class="btn btn-outline-light btn-lg px-4 rounded-pill fw-bold"
                  >
                    Start Selling
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-main">Categories</h2>
        <RouterLink
          class="btn btn-outline-main rounded-pill px-4"
          to="/categories"
        >
          View All Categories
        </RouterLink>
      </div>

      <RouterLink class="text-decoration-none text-black" to="/categories"
        ><div class="d-flex gap-3 overflow-auto pb-3">
          <div class="cat-card blur-bg text-center p-4">
            <img src="/src/assets/img/image copy 2.png" class="mb-3" />
            <p class="fw-bold mb-0">Watch</p>
          </div>

          <div class="cat-card blur-bg bg-opacity-25 text-center p-4 bg-veget">
            <img src="/src/assets/img/image copy 10.png" class="mb-3" />
            <p class="fw-bold mb-0">bags</p>
          </div>
          <div class="cat-card blur-bg bg-opacity-25 text-center p-4">
            <img src="/src/assets/img/image copy 9.png" class="mb-3" />
            <p class="fw-bold mb-0">Mini Fan</p>
          </div>
          <div class="cat-card blur-bg bg-opacity-25 text-center p-4">
            <img src="/src/assets/img/image copy 7.png" class="mb-3" />
            <p class="fw-bold mb-0">Tabplate</p>
          </div>
          <div class="cat-card blur-bg bg-opacity-25 text-center p-4">
            <img src="/src/assets/img/image copy 8.png" class="mb-3" />
            <p class="fw-bold mb-0">Airphone</p>
          </div>
          <div class="cat-card blur-bg bg-opacity-25 text-center p-4">
            <img src="/src/assets/img/image copy 5.png" class="mb-3" />
            <p class="fw-bold mb-0">Camera</p>
          </div>
          <div class="cat-card blur-bg bg-opacity-25 text-center p-4 bg-com">
            <img src="/src/assets/img/image copy 3.png" class="mb-3" />
            <p class="fw-bold mb-0">Computer</p>
          </div>

          <div class="cat-card blur-bg bg-opacity-25 text-center p-4">
            <img src="/src/assets/img/image copy 4.png" class="mb-3" />
            <p class="fw-bold mb-0">Noodle</p>
          </div>

          <div class="cat-card blur-bg bg-opacity-25 text-center p-4">
            <img src="/src/assets/img/image copy 13.png" class="mb-3" />
            <p class="fw-bold mb-0">Shoes</p>
          </div>
          <div class="cat-card blur-bg bg-opacity-25 text-center p-4">
            <img src="/src/assets/img/image copy 6.png" class="mb-3" />
            <p class="fw-bold mb-0">Fruit</p>
          </div>
          <div class="cat-card blur-bg bg-opacity-25 text-center p-4">
            <img src="/src/assets/img/image copy.png" class="mb-3" />
            <p class="fw-bold mb-0">Drink</p>
          </div>
        </div></RouterLink
      >
    </div>
  </div>

  <!-- Featured Products -->
  <div class="container py-5 text-main">
    <h2 class="text-center mb-5 fw-bold">Featured Products</h2>
    <div class="row g-4">
      <div
        class="col-sm-6 col-md-4 col-xl-3"
        v-for="product in productStore.products.slice(36, 44)"
        :key="product.id"
      >
        <RouterLink
          :to="'/product-detail/' + product.id"
          class="text-decoration-none"
        >
          <BaseCard :item="product">
            <template #action="{ product }">
              <button class="btn-add-plus">
                <i class="bi bi-cart-plus-fill"></i>
              </button>
            </template>
          </BaseCard>
        </RouterLink>
      </div>
    </div>

    <div class="text-center mt-5">
      <router-link
        to="/shop"
        class="btn btn-outline-primary px-4 py-2 rounded-pill"
      >
        View All Products
      </router-link>
    </div>
  </div>

  
</template>
<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import Navbar from "@/components/layout/NavBar.vue";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<style scoped>
.hero-banner {
  background-image: url("https://t3.ftcdn.net/jpg/03/20/68/66/360_F_320686681_Ur6vdYQgDC9WiijiVfxlRyQffxOgfeFz.jpg");
  background-size: cover;
  background-position: center left;
  height: 500px;
  position: relative;
}

.overlay {
  background: linear-gradient(
    to right,
    rgba(49, 49, 49, 0.035) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  height: 500px;
  width: 100%;
}

.hero-text {
  color: var(--bs-main);
}

.btn-main-hero {
  background-color: var(--bs-main);
  border: none;

  transition: 0.3s;
}

.btn-main-hero:hover {
  transform: translateY(-3px);
  background-color: #000000;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.blur-bg {

  background-color: rgba(173, 216, 230, 0.25);

  border: 1px solid rgba(var(--bs-main-rgb), 0.25);
}

.cat-card {
  width: 140px;
  border-radius: 20px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.cat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(var(--bs-main-rgb), 0.15);
  border-color: rgba(var(--bs-main-rgb), 0.3);
}

.cat-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.btn-add-plus {
  margin-top: 10px;
  background: var(--bs-main);
  color: var(--bs-color-light);
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(var(--bs-main-rgb), 0.25);
  transition: var(--transition-fast);
}

.btn-add-plus:hover {
  background: var(--bs-main-hover);
}

.btn-add-plus:active {
  background: var(--bs-main-active);
}
</style>