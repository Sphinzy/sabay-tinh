<template>
    <NavBar />

    <div class="container py-14">
        <h3 class="mb-4 fw-bold">Shopping Cart</h3>

        <div class="row">
            <!-- CART ITEMS -->
            <div class="col-lg-8">
                <!-- Cart Item -->
                <div class="card mb-4 shadow-sm border-0 cart-item" v-for="cart in cartStore.stallCarts.items"
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
                                <h5 class="text-main fw-bold">${{ cart.price * cart.qty }}</h5>
                            </div>

                            <p class="text-muted mb-3">
                                {{ cart.product.description }}
                            </p>

                            <!-- Quantity Control -->
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="quantity-control d-flex align-items-center">
                                    <button class="btn btn-outline-secondary btn-sm" @click="decrement(cart.id)">
                                        -
                                    </button>
                                    <input type="text" class="form-control text-center mx-2" :value="cart.qty"
                                        style="width: 60px" />
                                    <button class="btn btn-outline-secondary btn-sm" @click="increment(cart.id)">
                                        +
                                    </button>
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
                        <button @click="btnCheckOut" :disabled="disable" class="btn btn-main w-100">
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
    <BaseModal v-if="isDelete" title="Delete Item" @close="isDelete = false">
        <template #content>
            <p>Do you wanna delete <strong>{{ name }}</strong> ?</p>
        </template>
        <template #footer>
            <button class="btn btn-outline-secondary me-2" @click="isDelete = false">
                Cancel
            </button>
            <button class="btn btn-danger" @click="handleDelete(deleteId)">
                Delete
            </button>
        </template>
    </BaseModal>


</template>

<script setup>
import api from "@/api/http";
import NavBar from "@/components/layout/NavBar.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import { useCartStore } from "@/stores/fetchCart";
import { notify } from "@/utils/toast";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const isDelete = ref(false)
const router = useRouter();
console.log(cartStore.stallCarts);
const notifier = notify();
const deleteId = ref(null);

// Open modal for specific cart item
const openDeleteModal = (id) => {
    deleteId.value = id;
    isDelete.value = true;
};

// Close modal
const closeDeleteModal = () => {
    deleteId.value = null;
    isDelete.value = false;
};
const subtotal = computed(() => {
    return cartStore.stallCarts.items?.reduce((total, cart) => {
        return total + cart.price * cart.qty;
    }, 0) || 0;
});
const increment = async (id) => {
    const cart = cartStore.stallCarts.items.find(c => c.id === id);
    if (cart) {
        cart.qty++;
        const formData = new FormData();
        formData.append("product_id", cart.product.id);
        formData.append("qty", cart.qty);
        await api.post("/api/carts", formData);
    }
    cartStore.fetchCart()
};

const decrement = async (id) => {
    const cart = cartStore.stallCarts.items.find(c => c.id === id);
    if (cart && cart.qty > 1) {
        cart.qty--;
        const formData = new FormData();
        formData.append("product_id", cart.product.id);
        formData.append("qty", cart.qty);
        await api.post("/api/carts", formData);
    }
    cartStore.fetchCart()
};

const handleDelete = async (product_id) => {
    try {
        await api.delete(`/api/carts/${product_id}`);
    } catch (error) {
        notifier.error('Delete Failed')
    } finally {
        isDelete.value = false;
    }
    cartStore.fetchCart();
}

const disable = computed(() => {
    return cartStore.stallCarts.items?.length == 0;
});
const btnCheckOut = () => {
    if (disable) {
        router.push('/checkout')
    }
}



onMounted(() => {
    cartStore.fetchCart();
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
