<template>
    <div class="app">
        <!-- Main Content -->
        <div class="main-content" :class="{ 'overlay-active': isCartOpen }">
            <div class="product-showcase">
                <div class="product-card">
                    <h2>Uomo Born In Roma Intense</h2>
                    <p class="price">$6,95</p>
                    <button @click="addToCartAndOpen" class="add-to-cart-btn" :disabled="cartStore.isLoading">
                        {{ cartStore.isLoading ? 'Adding...' : 'Add to Cart' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Overlay -->
        <transition name="fade">
            <div v-if="isCartOpen" class="overlay" @click="closeCart"></div>
        </transition>

        <!-- Cart Sidebar -->
        <transition name="slide">
            <aside v-if="isCartOpen" class="cart-sidebar">
                <!-- Header -->
                <div class="cart-header">
                    <h2>Cart</h2>
                    <button @click="closeCart" class="close-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <!-- Continue Shopping -->
                <button @click="closeCart" class="continue-shopping">
                    ← Continue shopping
                </button>

                <!-- Loading State -->
                <div v-if="cartStore.isLoading" class="loading-state">
                    <div class="spinner"></div>
                    <p>Loading cart...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="cartStore.error" class="error-state">
                    <p>{{ cartStore.error }}</p>
                    <button @click="fetchCart" class="retry-btn">Retry</button>
                </div>

                <!-- Empty Cart -->
                <div v-else-if="cartStore.normalizedItems.length === 0" class="empty-cart">
                    <p>Your cart is empty</p>
                    <button @click="closeCart" class="continue-shopping">Start Shopping</button>
                </div>

                <template v-else>
                    <!-- Free Shipping Progress -->
                    <div class="shipping-progress">
                        <p class="shipping-text" :class="{ 'free-shipping': hasFreeShipping }">
                            {{ shippingMessage }}
                        </p>
                        <div class="progress-bar">
                            <div class="progress-fill" :class="{ 'complete': hasFreeShipping }" :style="{ width: progressPercent + '%' }"></div>
                        </div>
                    </div>

                    <!-- Cart Items -->
                    <div class="cart-items">
                        <div v-for="item in cartStore.normalizedItems" :key="item.id" class="cart-item">
                            <div class="item-image">
                                <div class="placeholder-img">
                                    <img :src="item.image" :alt="item.name">
                                </div>
                            </div>
                            <div class="item-details">
                                <h3>{{ item.name }}</h3>
                                <p class="item-condition">{{ item.condition }}</p>
                                <p class="item-seller">Seller: {{ item.creator?.name }}</p>
                                <div class="qty-controls">
                                    <div class="qty-input-wrapper">
                                        <button class="qty-btn qty-minus" @click="updateQuantity(item, -1)" :disabled="cartStore.isUpdating">−</button>
                                        <input 
                                            type="number" 
                                            :value="item.quantity" 
                                            min="1"
                                            class="qty-input"
                                            readonly
                                        >
                                        <button class="qty-btn qty-plus" @click="updateQuantity(item, 1)" :disabled="cartStore.isUpdating">+</button>
                                    </div>
                                    <button class="btn-remove" @click="removeItem(item)" :disabled="cartStore.isUpdating">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="item-price">${{ formatPrice(item.price * item.quantity) }}</div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="cart-footer">
                        <div class="total-row">
                            <span>Total products ({{ cartStore.totalItems }})</span>
                            <span>${{ formatPrice(cartStore.totalPrice) }}</span>
                        </div>
                        <div class="total-row bold">
                            <span>Total including VAT</span>
                            <span>${{ formatPrice(cartStore.totalPrice) }}</span>
                        </div>
                        <button @click="goToCheckout" class="checkout-btn" :disabled="cartStore.isUpdating">
                            Checkout
                        </button>
                    </div>
                </template>
            </aside>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const isCartOpen = ref(false)

// Free shipping threshold
const freeShippingThreshold = 60

const fetchCart = async () => {
    await cartStore.fetchCart()
}

const updateQuantity = async (item, change) => {
    const newQuantity = item.quantity + change
    if (newQuantity < 1) return
    await cartStore.updateItemQuantity(item.id, newQuantity)
}

const removeItem = async (item) => {
    await cartStore.removeItem(item.id)
}

const addToCartAndOpen = async () => {
    const product = {
        id: 25, // Using the ID from your API example
        title: 'Computer',
        price: 20.5
    }
    
    try {
        await cartStore.addItem(product)
        openCart()
    } catch (err) {
        // Error handled in store
    }
}

const openCart = () => {
    isCartOpen.value = true
    document.body.style.overflow = 'hidden'
    fetchCart()
}

const closeCart = () => {
    isCartOpen.value = false
    document.body.style.overflow = ''
}

const goToCheckout = () => {
    router.push({ name: 'checkout' })
}

const hasFreeShipping = computed(() => {
    return cartStore.totalPrice >= freeShippingThreshold
})

const shippingMessage = computed(() => {
    if (hasFreeShipping.value) {
        return 'You got Free Shipping 🚚'
    }
    const remaining = freeShippingThreshold - cartStore.totalPrice
    return `$${formatPrice(remaining)} more for Free Shipping 🚚`
})

const progressPercent = computed(() => {
    return Math.min((cartStore.totalPrice / freeShippingThreshold) * 100, 100)
})

const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',')
}

onMounted(() => {
    fetchCart()
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-height: 100vh;
    background: #f5f5f5;
}

.main-content {
    transition: filter 0.3s ease;
}

.main-content.overlay-active {
    filter: brightness(0.7);
}

.product-showcase {
    padding: 60px 40px;
    display: flex;
    justify-content: center;
}

.product-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    text-align: center;
    max-width: 400px;
}

.product-card h2 {
    font-size: 24px;
    margin-bottom: 8px;
    color: #1a1a1a;
}

.price {
    font-size: 28px;
    font-weight: 700;
    color: #00897b;
    margin: 16px 0;
}

.add-to-cart-btn {
    background: #00897b;
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
}

.add-to-cart-btn:hover:not(:disabled) {
    background: #00695c;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 137, 123, 0.3);
}

.add-to-cart-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    backdrop-filter: blur(2px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 480px;
    height: 100vh;
    background: white;
    z-index: 101;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #f0f0f0;
}

.cart-header h2 {
    font-size: 28px;
    font-weight: 700;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #666;
    transition: color 0.2s;
}

.close-btn:hover {
    color: #1a1a1a;
}

.continue-shopping {
    background: none;
    border: none;
    padding: 16px 24px;
    text-align: left;
    color: #1a1a1a;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
}

.continue-shopping:hover {
    color: #00897b;
}

.loading-state, .error-state, .empty-cart {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #00897b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error-state p {
    color: #dc3545;
    margin-bottom: 16px;
}

.retry-btn {
    background: #00897b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
}

.empty-cart p {
    color: #666;
    margin-bottom: 16px;
    font-size: 16px;
}

.shipping-progress {
    padding: 0 24px 24px;
}

.shipping-text {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
    transition: color 0.3s ease;
}

.shipping-text.free-shipping {
    color: #198754;
    font-weight: 600;
}

.progress-bar {
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: #00897b;
    border-radius: 4px;
    transition: width 0.5s ease, background 0.3s ease;
}

.progress-fill.complete {
    background: #198754;
}

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 0 24px;
}

.cart-item {
    display: flex;
    gap: 16px;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
}

.item-image {
    flex-shrink: 0;
}

.placeholder-img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.placeholder-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.item-details {
    flex: 1;
}

.item-details h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #1a1a1a;
}

.item-condition {
    font-size: 13px;
    color: #888;
    margin-bottom: 4px;
}

.item-seller {
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
}

.item-price {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    white-space: nowrap;
}

.qty-controls {
    display: flex;
    align-items: center;
    gap: 12px;
}

.qty-input-wrapper {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    height: 36px;
    overflow: hidden;
}

.qty-btn {
    width: 32px;
    height: 100%;
    border: none;
    background: white;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    user-select: none;
}

.qty-btn:hover:not(:disabled) {
    background: #f5f5f5;
    color: #000;
}

.qty-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.qty-minus {
    border-right: 1px solid #eee;
}

.qty-plus {
    border-left: 1px solid #eee;
}

.qty-input {
    width: 40px;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 14px;
    color: #333;
    background: transparent;
    outline: none;
    appearance: textfield;
}

.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.btn-remove {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: all 0.15s ease;
}

.btn-remove:hover:not(:disabled) {
    color: #dc3545;
    background: rgba(220, 53, 69, 0.1);
}

.btn-remove:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.btn-remove svg {
    stroke: currentColor;
}

.cart-footer {
    padding: 24px;
    border-top: 1px solid #e0e0e0;
    background: white;
}

.total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 16px;
    color: #666;
}

.total-row.bold {
    font-weight: 700;
    color: #1a1a1a;
    font-size: 18px;
    margin-bottom: 20px;
}

.checkout-btn {
    width: 100%;
    padding: 18px;
    background: #00897b;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.checkout-btn:hover:not(:disabled) {
    background: #00695c;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 137, 123, 0.25);
}

.checkout-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>