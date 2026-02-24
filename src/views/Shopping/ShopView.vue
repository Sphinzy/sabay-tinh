<template>
  <Navbar />
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
                @click.stop.prevent="handleAddToCart(product)"
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
import BaseCard from "@/components/ui/BaseCard.vue";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import Navbar from "@/components/layout/NavBar.vue";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});

const handleAddToCart = (p) => {
  console.log("Adding to cart:", p.title);
};
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
