<template>
  <Navbar></Navbar>
  <div class="container py-15">
    <h2 class="text-center mb-5 fw-bold" style="color: #093c87">ALL Product</h2>

    <div class="row g-4">

      <!-- SHOW SKELETON WHILE LOADING -->
      <template v-if="isLoading">
        <div class="col-sm-6 col-md-4 col-xl-3" v-for="n in 8" :key="'skeleton-' + n">
          <BaseCardSkeleton />
        </div>
      </template>

      <!-- SHOW REAL PRODUCTS AFTER LOADING -->
      <template v-else>
        <div class="col-sm-6 col-md-4 col-xl-3" v-for="product in productStore.products" :key="product.id">
          <RouterLink :to="'/product-detail/' + product.id" class="text-decoration-none text-dark">
            <BaseCard :item="product">
              <template #action>
                <button class="btn-add-plus" @click.stop.prevent="handleAddToCart(product.id)">
                    <i class="bi bi-cart-plus-fill"></i>
                </button>
              </template>
            </BaseCard>
          </RouterLink>
        </div>
      </template>

    </div>
  </div>
</template>
<script setup>
import { onMounted, computed, ref } from "vue";
import Navbar from "@/components/layout/NavBar.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/fetchCart";
import api from "@/api/http";
import BaseCardSkeleton from "@/components/Skeleton/BaseCardSkeleton.vue";
import { notify } from "@/utils/toast";

// Stores
const productStore = useProductStore();
const cartStore = useCartStore();
const notifier = notify();
const isLoading = ref(false);
const isAddingToCart = ref(false);
// Reactive computed cart count
const cartCount = computed(() => cartStore.carts?.items?.length || 0);

// Add product to cart
const handleAddToCart = async (productId) => {
  try {
    // Check if the product is already in the cart
    const existingItem = cartStore.carts?.items?.find(
      item => item.product_id === productId || item.product?.id === productId
    );
    console.log(productId);

    if (existingItem) {
      notifier.info('Product is already in the cart'); // show notifier
      return; // do not add again
    }

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("qty", 1);

    await api.post("/api/carts", formData);
    notifier.success('Product Added');

    // Refresh cart
    await cartStore.fetchCart();
  } catch (error) {
    console.error("Failed to add to cart:", error);
    notifier.error('Failed to add product'); // optional error notifier
  } finally {
    isAddingToCart.value = false; // stop loader
  }
};

// Fetch products and cart on mount
onMounted(async () => {
  try {
    isLoading.value = true;

    await Promise.all([
      productStore.fetchProducts(),
      cartStore.fetchCart()
    ]);

  } finally {
    isLoading.value = false;
  }
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

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
