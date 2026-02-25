<template>
  <NavBar></NavBar>
  <div v-if="loading">
    <Loading></Loading>
  </div>
  <div v-else class="container py-15">
    <button @click="router.back()" class="btn text-muted text-decoration-none mb-4 btn-outline-main">
      <i class="bi bi-arrow-left me-2"></i>Back to Shop
    </button>


    <!-- Product -->
    <div class="row g-5 align-items-start">
      <div class="col-lg-6">
        <div class="product-card shadow-sm rounded-4 p-4 bg-white">
          <div class="image-box rounded-4 overflow-hidden mb-4">
            <img :src="product.image" class="img-fluid w-100" alt="product" />
          </div>

          <div v-if="product.creator"
            class="seller-box d-flex align-items-center justify-content-between p-3 rounded-4">
            <div class="d-flex align-items-center gap-3">
              <img :src="product.creator.avatar" class="rounded-circle shadow-sm" width="55" height="55" />
              <div>
                <p class="fw-semibold mb-0">
                  {{ product.creator.name }}
                </p>
                <small class="text-muted"> Seller</small>
              </div>
            </div>
            <!-- 
            <button class="btn btn-outline-main rounded-pill px-3 btn-sm">
              Contact
            </button> -->
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="info-card shadow-sm rounded-4 p-5 bg-white">
          <div class="mb-3">
            <span class="badge-category" v-if="product.categories?.length">
              {{ product.categories[0].name }}
            </span>
            <span class="text-muted small ms-2">
              • {{ new Date(product.created_at).toLocaleDateString() }}
            </span>
          </div>

          <h1 class="fw-bold mb-3 product-title">
            {{ product.title }}
          </h1>

          <div class="mb-4">
            <!-- <h6 class="section-title mb-3 text-main">Description</h6> -->
            <div class="spec-box">
              {{ product.description }}
            </div>
          </div>
          <h2 class="price-text mb-4 text-success">$ {{ product.price }}</h2>

          <div class="row g-3">
            <div class="col-6" v-if="product.condition">
              <div class="info-mini-box">
                <small>Condition</small>
                <strong>{{ product.condition }}</strong>
              </div>
            </div>

            <div class="col-6" v-if="product.story">
              <div class="info-mini-box">
                <small>Status</small>
                <strong>{{ product.story }}</strong>
              </div>
            </div>
          </div>
          <!-- BUTTONS -->
          <div class="text-start my-5">
            <button class="btn btn-cart btn-lg rounded-pill me-2 text-center" @click="handleAddToCart(route.params.id)">
              <i class="bi bi-cart-plus "></i>
            </button>
            <button class="btn btn-buy btn-lg rounded-pill">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/http";
import { notify } from "@/utils/toast";
import NavBar from "@/components/layout/NavBar.vue";
import { useCartStore } from "@/stores/fetchCart";
import Loading from "@/components/Skeleton/Loading.vue";

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const product = ref(null);
const loading = ref(true);
const qty = ref(1)


const notifier = notify();
const fetchProductDetail = async () => {
  try {
    const res = await api.get(`api/products/${route.params.id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    product.value = res.data.data;
  } catch (error) {
    toast.error("Cannot load product details");
  } finally {
    loading.value = false;
  }
};
const isAdding = ref(false);
const handleAddToCart = async (productId) => {
  if (isAdding.value) return; // prevent double-click
  isAdding.value = true;

  try {
    // Fetch the latest cart directly from API
    const cartRes = await api.get("/api/profile/carts", {
      headers: { Accept: "application/json" },
    });

    const items = cartRes.data?.data?.items || [];
    console.log(cartRes.data.data.items);
    // Check if product is already in cart
    const existingItem = items.find(
      item => Number(item.product_id) === Number(productId) || Number(item.product?.id) === Number(productId)
    );

    if (existingItem) {
      notifier.error("Product is already in the cart"); // show info notifier
      return; // stop adding again
    }

    // Add product to cart
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("qty", 1);

    await api.post("/api/carts", formData);
    notifier.success("Product Added"); // show success notifier

    // Refresh your store after adding
    await cartStore.fetchCart();
  } catch (error) {
    console.error(error);
    notifier.error("Failed to add product"); // show error notifier
  } finally {
    isAdding.value = false;
  }
};;

onMounted(fetchProductDetail);
</script>
<style scoped>
.text-main {
  color: var(--bs-main);
}

.product-card,
.info-card {
  background: #ffffff;
  border: 1px solid #f1f1f1;
}

.image-box img {
  object-fit: contain;
  max-height: 500px;
  transition: 0.3s ease;
}

.image-box:hover img {
  transform: scale(1.05);
}

.seller-box {
  background: #fafafa;
  border: 1px solid #eee;
  transition: 0.3s;
}

.seller-box:hover {
  border-color: var(--bs-main);
}

.badge-category {
  background: rgba(var(--bs-main-rgb), 0.1);
  color: var(--bs-main);
  padding: 6px 16px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.8rem;
}

.product-title {
  font-size: 1.8rem;
  color: #111827;
}

.price-text {
  color: var(--bs-main);
  font-weight: 700;
  font-size: 2.3rem;
}

.btn-buy {
  background: var(--bs-main);
  color: white;
  border: none;
  transition: 0.3s;
}

.btn-buy:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.btn-cart {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  transition: 0.3s;
}

.btn-cart:hover {
  background: #e5e7eb;
}

.section-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #6b7280;
}

/* 
.spec-box {
  background: #f9fafb;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #0c207047;
  color: #4b5563;
} */

.info-mini-box {
  background: #f9fafb;
  padding: 14px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #eee;
}

.info-mini-box small {
  display: block;
  color: #6b7280;
  margin-bottom: 5px;
}

.info-mini-box strong {
  color: #111827;
}
</style>
