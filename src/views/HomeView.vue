<template>
  <div class="container">
    <h1 class="page-title">All Products</h1>

    <div class="product-grid">
      <div v-for="product in productStore.products" :key="product.id" class="product-card">
        
        <div class="image-wrapper">
          <img :src="product.image" :alt="product.title" class="product-img">
          <span v-if="product.condition" class="badge">{{ product.condition }}</span>
        </div>

        <div class="product-info">
          <h5 class="product-name">{{ product.title }}</h5>
          <p class="product-desc">{{ product.description }}</p>
          
          <div class="product-footer">
            <span class="price">${{ product.price }}</span>
            <button class="add-to-cart">add to card </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
<script setup>
import { useProductStore } from "@/store/productStore";
import { onMounted } from "vue";

const productStore = useProductStore();

onMounted(async () => {
    await productStore.fetchProducts();
});

</script>