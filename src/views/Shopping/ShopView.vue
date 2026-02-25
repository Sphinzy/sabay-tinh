<template>
  <Navbar :cartCount="cartCount"></Navbar>
  <div class="container py-5">
    <h2 class="text-center mb-5 fw-bold" style="color: #093c87">ALL Product</h2>

    <div class="row g-4">
      <div
        class="col-sm-6 col-md-4 col-xl-3"
        v-for="product in productStore.products"
        :key="product.id"
      >
        <RouterLink
          :to="'/product-detail/' + product.id"
          class="text-decoration-none text-dark"
        >
          <BaseCard :item="product">
            <template #action>
              <button
                class="btn-add-plus"
                @click.stop.prevent="handleAddToCart(product.id)"
              >
                <i class="bi bi-cart-plus-fill"></i>
              </button>
            </template>
          </BaseCard>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed } from "vue";
import Navbar from "@/components/layout/NavBar.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/fetchCart";
import api from "@/api/http";

// Stores
const productStore = useProductStore();
const cartStore = useCartStore();

// Reactive computed cart count
const cartCount = computed(() => cartStore.carts?.items?.length || 0);

// Add product to cart
const handleAddToCart = async (productId) => {
  try {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("qty", 1); // always 1 for initial add

    await api.post("/api/carts", formData);

    // Refresh cart
    await cartStore.fetchCart();
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
};

// Fetch products and cart on mount
onMounted(async () => {
  await productStore.fetchProducts();
  await cartStore.fetchCart();
});
</script>

<style scoped>
.btn-add-plus {
  margin-top: 10px;
  background: #093c87;
  color: white;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(9, 60, 135, 0.2);
}
</style>
