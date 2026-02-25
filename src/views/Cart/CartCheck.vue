<template>
    <NavBar />

    <!-- Loader -->
    <div v-if="isLoading">
        <Loading></Loading>
    </div>

    <div v-else class="container py-14">
        <h3 class="mb-4 fw-bold">Shopping Cart</h3>

        <div class="row">
            <!-- CART ITEMS -->
            <div class="col-lg-8">
                <div class="card mb-4 shadow-sm border-0 cart-item" v-for="cart in cartStore.stallCarts?.items || []"
                    :key="cart.id">
                    <div class="row g-0 align-items-center">
                        <!-- Product Image -->
                        <div class="col-md-4 text-center p-3">
                            <img :src="cart.product.image" style="height: 200px"
                                class="img-fluid rounded object-fit-contain" alt="product" />
                        </div>

                        <!-- Product Details -->
                        <div class="col-md-8 p-4">
                            <div class="d-flex justify-content-between">
                                <h5 class="fw-bold">{{ cart.product.title }}</h5>
                                <h5 class="text-main fw-bold">${{ (cart.price * cart.qty).toFixed(2) }}</h5>
                            </div>

                            <p class="text-muted mb-3">{{ cart.product.description }}</p>

                            <!-- Quantity Control -->
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="quantity-control d-flex align-items-center">
                                    <button class="btn btn-outline-secondary btn-sm"
                                        @click="decrement(cart.id)">-</button>
                                    <input type="number" v-model.number="cart.qty" class="form-control text-center mx-2"
                                        style="width: 60px" />
                                    <button class="btn btn-outline-secondary btn-sm"
                                        @click="increment(cart.id)">+</button>
                                </div>

                                <button class="btn border-0" @click="openDeleteModal(cart.id)">
                                    <i class="bi bi-trash fs-3 text-danger"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ORDER SUMMARY -->
            <div class="col-lg-4">
                <div class="card shadow-sm border-0 p-4">
                    <h5 class="fw-bold mb-4">Order Summary</h5>

                    <div class="d-flex justify-content-between mb-2">
                        <span>Subtotal</span>
                        <span>${{ subtotal.toFixed(2) }}</span>
                    </div>

                    <div class="d-flex justify-content-between mb-2">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <hr />

                    <div class="d-flex justify-content-between fw-bold mb-4">
                        <span>Total</span>
                        <span>${{ subtotal.toFixed(2) }}</span>
                    </div>

                    <div>
                        <button @click="btnCheckOut" class="btn btn-main w-100">
                            Proceed to Checkout
                        </button>
                        <router-link to="/shop" class="btn btn-outline-main w-100 mt-2">
                            Continue Shopping
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Modal -->
    <BaseModal v-if="isDelete" title="Delete Item" @close="isDelete = false">
        <template #content>
            <p>Do you want to delete <strong>{{ itemToDeleteTitle }}</strong>?</p>
        </template>
        <template #footer>
            <button class="btn btn-outline-secondary me-2" @click="isDelete = false">Cancel</button>
            <button class="btn btn-danger" @click="handleDelete(deleteId)">Delete</button>
        </template>
    </BaseModal>
</template>

<script setup>
import api from "@/api/http";
import NavBar from "@/components/layout/NavBar.vue";
import Loading from "@/components/Skeleton/Loading.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import { useCartStore } from "@/stores/fetchCart";
import { notify } from "@/utils/toast";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();
const notifier = notify();

const isLoading = ref(false);
const isDelete = ref(false);
const deleteId = ref(null);

// Get product title for delete modal
const itemToDeleteTitle = computed(() => {
    return cartStore.stallCarts?.items?.find(i => i.id === deleteId.value)?.product.title || '';
});

// Open delete modal
const openDeleteModal = (id) => {
    deleteId.value = id;
    isDelete.value = true;
};

// Increment quantity
const increment = async (id) => {
    const cart = cartStore.stallCarts?.items?.find(c => c.id === id);
    if (!cart) return;
    cart.qty++;
    const formData = new FormData();
    formData.append("product_id", cart.product.id);
    formData.append("qty", cart.qty);
    await api.post("/api/carts", formData);
    await cartStore.fetchCart();
};

// Decrement quantity
const decrement = async (id) => {
    const cart = cartStore.stallCarts?.items?.find(c => c.id === id);
    if (!cart || cart.qty <= 1) return;
    cart.qty--;
    const formData = new FormData();
    formData.append("product_id", cart.product.id);
    formData.append("qty", cart.qty);
    await api.post("/api/carts", formData);
    await cartStore.fetchCart();
};

// Delete cart item
const handleDelete = async (id) => {
    try {
        await api.delete(`/api/carts/${id}`);
        notifier.success("Item deleted");
    } catch (error) {
        notifier.error("Delete failed");
    } finally {
        isDelete.value = false;
        await cartStore.fetchCart();
    }
};

// Subtotal
const subtotal = computed(() => {
    return cartStore.stallCarts?.items?.reduce((total, cart) => {
        return total + (cart.price || 0) * (cart.qty || 0);
    }, 0) || 0;
});

// Disable checkout if empty
const disable = computed(() => {
    return !cartStore.stallCarts?.items?.length;
});

// Checkout
const btnCheckOut = () => {
    if (!disable.value) {
        router.push('/checkout');
    } else {
        notifier.info('Your cart is empty');
    }
};

// Fetch cart on mount
onMounted(async () => {
    isLoading.value = true;
    try {
        await cartStore.fetchCart();
    } catch (error) {
        notifier.error('Failed to load cart');
    } finally {
        isLoading.value = false;
    }
});
</script>

<style scoped>
.cart-item:hover {
    transform: translateY(-3px);
    transition: 0.3s;
}

.quantity-control button {
    width: 35px;
}
</style>