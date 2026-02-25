<template>
    <div class="app">
        <!-- Loading State with Skeleton -->
        <div v-if="loading" class="loading-overlay">
            <!-- SKELETON: Remove this entire div when API is working -->
            <div class="skeleton-container">
                <!-- Header Skeleton -->
                <div class="skeleton-header">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-subtitle"></div>
                </div>
                
                <!-- Stats Skeleton -->
                <div class="skeleton-stats">
                    <div class="skeleton-stat-card" v-for="n in 3" :key="n">
                        <div class="skeleton-stat-label"></div>
                        <div class="skeleton-stat-value"></div>
                        <div class="skeleton-stat-change"></div>
                    </div>
                </div>
                
                <!-- Search Skeleton -->
                <div class="skeleton-search"></div>
                
                <!-- Grid Skeleton -->
                <div class="skeleton-grid">
                    <div class="skeleton-card" v-for="n in 6" :key="n">
                        <div class="skeleton-image"></div>
                        <div class="skeleton-content">
                            <div class="skeleton-line short"></div>
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line medium"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END SKELETON -->
            
            <div class="spinner" style="display: none;"></div>
            <p style="display: none;">Loading your purchases...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{{ error }}</span>
            <button @click="fetchOrders" class="retry-btn">Retry</button>
        </div>

        <!-- Main Content -->
        <main class="main-content" v-if="!loading">
            <!-- Page Header -->
            <div class="page-header">
                <div>
                    <h1>My Purchases</h1>
                    <p class="subtitle">Manage your order history and track deliveries</p>
                </div>
                <div class="view-toggle">
                    <button @click="currentView = 'grid'" :class="{ active: currentView === 'grid' }">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </button>
                    <button @click="currentView = 'list'" :class="{ active: currentView === 'list' }">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <p class="stat-label">Total Spent</p>
                    <h3 class="stat-value">${{ formatPrice(totalSpent) }}</h3>
                    <span class="stat-change positive">+12% this month</span>
                </div>
                <div class="stat-card">
                    <p class="stat-label">Active Orders</p>
                    <h3 class="stat-value">{{ activeOrders }}</h3>
                    <span class="stat-change">In transit</span>
                </div>
                <div class="stat-card">
                    <p class="stat-label">Rewards Points</p>
                    <h3 class="stat-value">{{ userStats.rewardsPoints || '2,450' }}</h3>
                    <span class="stat-change gold">{{ userStats.membershipTier || 'Gold Member' }}</span>
                </div>
            </div>

            <!-- Search -->
            <div class="search-bar">
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" v-model="searchQuery" placeholder="Search by product name, order ID, or category..."
                    class="search-input">
            </div>

            <!-- Orders Grid/List -->
            <div :class="['orders-container', currentView]" v-if="filteredOrders.length > 0">
                <div v-for="order in filteredOrders" :key="order.id" class="order-card"
                    @click="openOrderDetails(order)">
                    <div class="order-image">
                        <img :src="order.image" :alt="order.name" @error="handleImageError">
                        <span class="status-badge" :class="order.status.toLowerCase()">
                            {{ order.status }}
                        </span>
                    </div>
                    <div class="order-info">
                        <div class="order-header">
                            <div>
                                <p class="order-category">{{ order.category }}</p>
                                <h3 class="order-name">{{ order.name }}</h3>
                            </div>
                            <span class="order-price">${{ formatPrice(order.price) }}</span>
                        </div>
                        <p class="order-description">{{ order.description }}</p>
                        <div class="order-footer">
                            <span class="order-id">Order: {{ order.orderId }}</span>
                            <button class="view-details-btn">
                                View Details
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredOrders.length === 0 && !loading" class="empty-state">
                <div class="empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.5">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                </div>
                <h3>No orders found</h3>
                <p>{{ searchQuery ? 'Try adjusting your search to find what you\'re looking for.' : 'You haven\'t made any purchases yet.' }}</p>
                <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search-btn">Clear Search</button>
                <button v-else @click="fetchOrders" class="clear-search-btn">Refresh</button>
            </div>
        </main>

        <!-- Overlay -->
        <transition name="fade">
            <div v-if="selectedOrder" class="overlay" @click="closeOrderDetails"></div>
        </transition>

        <!-- Order Details Sidebar -->
        <transition name="slide">
            <aside v-if="selectedOrder" class="order-sidebar">
                <!-- Header -->
                <div class="sidebar-header">
                    <h2>Order Details</h2>
                    <button @click="closeOrderDetails" class="close-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <!-- Order ID -->
                <p class="sidebar-order-id">{{ selectedOrder.orderId }}</p>

                <!-- Progress Tracker -->
                <div class="progress-section">
                    <div class="progress-header">
                        <span>Order Status</span>
                        <span :class="['status-text', selectedOrder.status.toLowerCase()]">{{ selectedOrder.status
                        }}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" :class="{ complete: selectedOrder.status === 'Delivered' }"
                            :style="{ width: getProgressWidth(selectedOrder.status) + '%' }"></div>
                    </div>
                    <div class="progress-steps">
                        <span>Ordered</span>
                        <span>Shipped</span>
                        <span>Delivered</span>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="sidebar-product">
                    <img :src="selectedOrder.image" :alt="selectedOrder.name" @error="handleImageError">
                    <div class="product-details">
                        <h3>{{ selectedOrder.name }}</h3>
                        <p class="product-meta">{{ selectedOrder.category }} • Qty: {{ selectedOrder.quantity || 1 }}</p>
                        <p class="product-price">${{ formatPrice(selectedOrder.price) }}</p>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="order-summary">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${{ formatPrice(selectedOrder.price * (selectedOrder.quantity || 1)) }}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span :class="{ free: selectedOrder.shipping === 0 || selectedOrder.shipping === undefined }">
                            {{ selectedOrder.shipping ? formatPrice(selectedOrder.shipping) : 'Free' }}
                        </span>
                    </div>
                    <div class="summary-row">
                        <span>Tax ({{ (selectedOrder.taxRate || 0.08) * 100 }}%)</span>
                        <span>${{ formatPrice((selectedOrder.price * (selectedOrder.quantity || 1)) * (selectedOrder.taxRate || 0.08)) }}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span>${{ formatPrice(calculateTotal(selectedOrder)) }}</span>
                    </div>
                </div>

                <!-- Actions -->
                <div class="sidebar-actions">
                    <button class="track-btn" @click="trackPackage(selectedOrder)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        Track Package
                    </button>
                    <button class="invoice-btn" @click="downloadInvoice(selectedOrder)">Download Invoice</button>
                </div>
            </aside>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// API Configuration - Using your specific base URL
const baseURL = 'https://ecommerce201.csm.linkpc.net'
// const API_ENDPOINT = '/api/profile/purchased'

// State
const currentView = ref('grid')
const searchQuery = ref('')
const selectedOrder = ref(null)
const orders = ref([])
const loading = ref(false)
const error = ref(null)
const userStats = ref({})

// ============================================
// TEST DATA - REMOVE WHEN API IS WORKING
// ============================================
// This is mock data to test the UI before connecting to real API
// Delete this entire TEST_DATA constant when your API is ready
const TEST_DATA = [
    {
        id: 'ord_001',
        productName: 'Wireless Noise-Canceling Headphones',
        category: 'Electronics',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        status: 'delivered',
        orderDate: '2024-01-15',
        orderId: 'ORD-2024-001',
        description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
        quantity: 1,
        shippingCost: 0,
        taxRate: 0.08,
        trackingNumber: 'TRK123456789'
    },
    {
        id: 'ord_002',
        productName: 'Mechanical Gaming Keyboard',
        category: 'Gaming',
        price: 149.50,
        imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop',
        status: 'shipped',
        orderDate: '2024-02-20',
        orderId: 'ORD-2024-002',
        description: 'RGB backlit mechanical keyboard with Cherry MX switches and customizable macros.',
        quantity: 1,
        shippingCost: 12.99,
        taxRate: 0.08,
        trackingNumber: 'TRK987654321'
    },
    {
        id: 'ord_003',
        productName: 'Organic Cotton T-Shirt Pack',
        category: 'Fashion',
        price: 45.00,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
        status: 'processing',
        orderDate: '2024-02-22',
        orderId: 'ORD-2024-003',
        description: 'Pack of 3 premium organic cotton t-shirts in various colors. Sustainable and comfortable.',
        quantity: 2,
        shippingCost: 5.99,
        taxRate: 0.08,
        trackingNumber: null
    },
    {
        id: 'ord_004',
        productName: 'Smart Fitness Watch',
        category: 'Electronics',
        price: 199.00,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        status: 'delivered',
        orderDate: '2024-01-28',
        orderId: 'ORD-2024-004',
        description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.',
        quantity: 1,
        shippingCost: 0,
        taxRate: 0.08,
        trackingNumber: 'TRK456789123'
    },
    {
        id: 'ord_005',
        productName: 'Leather Weekend Bag',
        category: 'Accessories',
        price: 185.00,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
        status: 'cancelled',
        orderDate: '2024-02-10',
        orderId: 'ORD-2024-005',
        description: 'Handcrafted genuine leather duffle bag perfect for weekend getaways.',
        quantity: 1,
        shippingCost: 15.00,
        taxRate: 0.08,
        trackingNumber: null
    },
    {
        id: 'ord_006',
        productName: 'Ceramic Coffee Mug Set',
        category: 'Home',
        price: 34.99,
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop',
        status: 'shipped',
        orderDate: '2024-02-21',
        orderId: 'ORD-2024-006',
        description: 'Set of 4 handcrafted ceramic mugs with modern minimalist design.',
        quantity: 1,
        shippingCost: 8.99,
        taxRate: 0.08,
        trackingNumber: 'TRK789123456'
    }
]
// ============================================
// END TEST DATA
// ============================================

// Fetch orders from API
const fetchOrders = async () => {
    loading.value = true
    error.value = null
    
    // ============================================
    // TEST MODE: Uncomment below to use test data instead of API
    // Remove this block when API is working
    // ============================================
    setTimeout(() => {
        orders.value = TEST_DATA.map(mapApiOrderToComponent)
        userStats.value = {
            rewardsPoints: '2,450',
            membershipTier: 'Gold Member'
        }
        loading.value = false
    }, 1500) // Simulate 1.5s loading delay
    return // Remove this return statement to enable API call
    // ============================================
    // END TEST MODE
    // ============================================
    
    /* 
    // REAL API CALL - Uncomment this block when API is ready
    // Remove the test mode block above and uncomment below:
    
    try {
        const response = await fetch(`${baseURL}/api/profile/purchased`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                'Accept': 'application/json'
            },
            credentials: 'include'
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Please log in to view your purchases')
            }
            if (response.status === 404) {
                throw new Error('No purchase history found')
            }
            throw new Error(`Failed to load purchases: ${response.statusText}`)
        }

        const data = await response.json()
        
        // Handle different API response structures
        if (Array.isArray(data)) {
            orders.value = data.map(mapApiOrderToComponent)
        } else if (data.orders) {
            orders.value = data.orders.map(mapApiOrderToComponent)
            userStats.value = data.stats || {}
        } else if (data.data) {
            orders.value = data.data.map(mapApiOrderToComponent)
            userStats.value = data.meta || {}
        } else {
            orders.value = []
        }
        
    } catch (err) {
        console.error('Error fetching orders:', err)
        error.value = err.message || 'Failed to load your purchases. Please try again.'
    } finally {
        loading.value = false
    }
    */
}

// Map API response to component format
const mapApiOrderToComponent = (apiOrder) => {
    return {
        id: apiOrder.id || apiOrder._id || apiOrder.orderId,
        name: apiOrder.productName || apiOrder.name || apiOrder.title,
        category: apiOrder.category || apiOrder.productCategory || 'General',
        price: parseFloat(apiOrder.price || apiOrder.amount || apiOrder.total || 0),
        image: apiOrder.imageUrl || apiOrder.image || apiOrder.productImage || 'https://via.placeholder.com/400x300?text=No+Image',
        status: capitalizeFirst(apiOrder.status || apiOrder.orderStatus || 'Processing'),
        date: apiOrder.orderDate || apiOrder.createdAt || apiOrder.date,
        orderId: apiOrder.orderId || apiOrder.id || apiOrder._id,
        description: apiOrder.description || apiOrder.productDescription || '',
        quantity: apiOrder.quantity || 1,
        shipping: parseFloat(apiOrder.shippingCost || apiOrder.shipping || 0),
        taxRate: parseFloat(apiOrder.taxRate || 0.08),
        trackingNumber: apiOrder.trackingNumber || null,
    }
}

// Helper functions
const capitalizeFirst = (str) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const calculateTotal = (order) => {
    const qty = order.quantity || 1
    const subtotal = order.price * qty
    const shipping = order.shipping || 0
    const taxRate = order.taxRate || 0.08
    const tax = subtotal * taxRate
    return subtotal + shipping + tax
}

const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image'
}

const trackPackage = (order) => {
    if (order.trackingNumber) {
        window.open(`https://track.example.com/${order.trackingNumber}`, '_blank')
    } else {
        alert('Tracking information not available yet')
    }
}

const downloadInvoice = async (order) => {
    try {
        const response = await fetch(`${baseURL}/api/orders/${order.id}/invoice`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            }
        })
        
        if (response.ok) {
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `invoice-${order.orderId}.pdf`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } else {
            alert('Invoice download failed')
        }
    } catch (err) {
        console.error('Download error:', err)
        alert('Failed to download invoice')
    }
}

// Computed properties
const filteredOrders = computed(() => {
    if (!searchQuery.value) return orders.value
    const query = searchQuery.value.toLowerCase()
    return orders.value.filter(order =>
        order.name?.toLowerCase().includes(query) ||
        order.category?.toLowerCase().includes(query) ||
        order.orderId?.toLowerCase().includes(query)
    )
})

const totalSpent = computed(() => {
    return orders.value.reduce((sum, order) => sum + (order.price * (order.quantity || 1)), 0)
})

const activeOrders = computed(() => {
    return orders.value.filter(order => order.status !== 'Delivered' && order.status !== 'Cancelled').length
})

// Methods
const openOrderDetails = (order) => {
    selectedOrder.value = order
    document.body.style.overflow = 'hidden'
}

const closeOrderDetails = () => {
    selectedOrder.value = null
    document.body.style.overflow = ''
}

const getProgressWidth = (status) => {
    const statusMap = {
        'processing': 15,
        'shipped': 60,
        'delivered': 100,
        'cancelled': 0
    }
    return statusMap[status.toLowerCase()] || 0
}

const formatPrice = (price) => {
    if (!price) return '0.00'
    return price.toFixed(2)
}

// Initialize
onMounted(() => {
    fetchOrders()
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
    background: #f8fafc;
    background-image:
        radial-gradient(at 0% 0%, rgba(20, 184, 166, 0.1) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.1) 0px, transparent 50%);
    background-attachment: fixed;
}

/* ============================================
   SKELETON LOADING STYLES
   Remove these when API is working (optional)
   ============================================ */
.skeleton-container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 96px 40px 40px;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.skeleton {
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.skeleton-header {
    margin-bottom: 32px;
}

.skeleton-title {
    width: 280px;
    height: 40px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
    margin-bottom: 12px;
}

.skeleton-subtitle {
    width: 320px;
    height: 20px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
}

.skeleton-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 32px;
}

.skeleton-stat-card {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    padding: 24px;
    height: 140px;
}

.skeleton-stat-label {
    width: 80px;
    height: 14px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 16px;
}

.skeleton-stat-value {
    width: 120px;
    height: 36px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
    margin-bottom: 12px;
}

.skeleton-stat-change {
    width: 100px;
    height: 16px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.skeleton-search {
    max-width: 600px;
    height: 50px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 12px;
    margin-bottom: 32px;
}

.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 24px;
}

.skeleton-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.skeleton-image {
    height: 240px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-content {
    padding: 24px;
}

.skeleton-line {
    height: 16px;
    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 12px;
}

.skeleton-line.short {
    width: 60px;
    margin-bottom: 8px;
}

.skeleton-line.medium {
    width: 80%;
}

/* Responsive Skeleton */
@media (max-width: 768px) {
    .skeleton-container {
        padding: 80px 20px 20px;
    }
    
    .skeleton-stats {
        grid-template-columns: 1fr;
    }
    
    .skeleton-grid {
        grid-template-columns: 1fr;
    }
    
    .skeleton-image {
        height: 200px;
    }
}
/* ============================================
   END SKELETON STYLES
   ============================================ */

/* Loading State */
.loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(248, 250, 252, 0.95);
    backdrop-filter: blur(4px);
    z-index: 200;
    overflow-y: auto;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e2e8f0;
    border-top-color: #0d9488;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-overlay p {
    color: #64748b;
    font-size: 16px;
}

/* Error Banner */
.error-banner {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #fee2e2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 16px 24px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 150;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.retry-btn {
    background: #dc2626;
    color: white;
    border: none;
    padding: 6px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-left: 8px;
}

.retry-btn:hover {
    background: #b91c1c;
}

/* Main Content */
.main-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 96px 40px 40px;
}

/* Page Header */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
}

.page-header h1 {
    font-size: 36px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
}

.subtitle {
    color: #64748b;
    font-size: 16px;
}

.view-toggle {
    display: flex;
    gap: 8px;
    background: white;
    padding: 4px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
}

.view-toggle button {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    transition: all 0.2s;
}

.view-toggle button.active {
    background: #f1f5f9;
    color: #0d9488;
}

/* Stats */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 32px;
}

.stat-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
}

.stat-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    opacity: 1;
    transition: transform 0.7s ease-in-out,
        opacity 0.8s ease-in-out;
}

.stat-card:hover::before {
    transform: scale(1.3);
    opacity: 0.7;
}

.stat-card:nth-child(1)::before {
    background: #14b8a6;
}

.stat-card:nth-child(2)::before {
    background: #6366f1;
}

.stat-card:nth-child(3)::before {
    background: #f59e0b;
}

.stat-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
}

.stat-value {
    font-size: 32px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
}

.stat-change {
    font-size: 13px;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 4px;
}

.stat-change.positive {
    color: #10b981;
}

.stat-change.gold {
    color: #f59e0b;
}

/* Search */
.search-bar {
    position: relative;
    max-width: 600px;
    margin-bottom: 32px;
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
}

.search-input {
    width: 100%;
    padding: 14px 16px 14px 48px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 15px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.2s;
}

.search-input:focus {
    outline: none;
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
}

/* Orders Container */
.orders-container {
    display: grid;
    gap: 24px;
}

.orders-container.grid {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
}

.orders-container.list {
    grid-template-columns: 1fr;
}

/* Order Card */
.order-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
}

.orders-container.list .order-card {
    flex-direction: row;
    align-items: center;
}

.order-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
}

.order-image {
    position: relative;
    height: 240px;
    overflow: hidden;
}

.orders-container.list .order-image {
    width: 200px;
    height: 160px;
    flex-shrink: 0;
}

.order-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
}

.order-card:hover .order-image img {
    transform: scale(1.05);
}

.status-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(8px);
}

.status-badge.delivered {
    background: rgba(16, 185, 129, 0.15);
    color: #059669;
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-badge.shipped {
    background: rgba(99, 102, 241, 0.15);
    color: #4f46e5;
    border: 1px solid rgba(99, 102, 241, 0.3);
}

.status-badge.processing {
    background: rgba(245, 158, 11, 0.15);
    color: #d97706;
    border: 1px solid rgba(245, 158, 11, 0.3);
}

.status-badge.cancelled {
    background: rgba(239, 68, 68, 0.15);
    color: #dc2626;
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.order-info {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
}

.order-category {
    font-size: 12px;
    font-weight: 600;
    color: #0d9488;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
}

.order-name {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.3;
}

.order-price {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
}

.order-description {
    font-size: 14px;
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.orders-container.list .order-description {
    display: none;
}

.order-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #f1f5f9;
}

.order-id {
    font-size: 13px;
    color: #94a3b8;
    font-family: monospace;
}

.view-details-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #0d9488;
    background: none;
    border: none;
    cursor: pointer;
    transition: gap 0.2s;
}

.view-details-btn:hover {
    gap: 10px;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 80px 20px;
}

.empty-icon {
    width: 80px;
    height: 80px;
    background: #f1f5f9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: #94a3b8;
}

.empty-state h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 8px;
}

.empty-state p {
    color: #64748b;
    margin-bottom: 24px;
}

.clear-search-btn {
    padding: 12px 24px;
    background: #0d9488;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.clear-search-btn:hover {
    background: #0f766e;
}

/* Overlay */
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(4px);
    z-index: 100;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Order Sidebar */
.order-sidebar {
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
    overflow-y: auto;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #f1f5f9;
}

.sidebar-header h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
}

.close-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #f1f5f9;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    transition: all 0.2s;
}

.close-btn:hover {
    background: #e2e8f0;
    color: #0f172a;
}

.sidebar-order-id {
    padding: 16px 24px;
    font-size: 14px;
    color: #64748b;
    font-family: monospace;
    border-bottom: 1px solid #f1f5f9;
}

/* Progress Section */
.progress-section {
    padding: 24px;
    border-bottom: 1px solid #f1f5f9;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.progress-header span:first-child {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
}

.status-text {
    font-size: 14px;
    font-weight: 700;
}

.status-text.delivered {
    color: #059669;
}

.status-text.shipped {
    color: #4f46e5;
}

.status-text.processing {
    color: #d97706;
}

.status-text.cancelled {
    color: #dc2626;
}

.progress-bar {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 12px;
}

.progress-fill {
    height: 100%;
    background: #0d9488;
    border-radius: 4px;
    transition: width 0.6s ease;
}

.progress-fill.complete {
    background: #10b981;
}

.progress-steps {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #94a3b8;
}

/* Sidebar Product */
.sidebar-product {
    display: flex;
    gap: 16px;
    padding: 24px;
    border-bottom: 1px solid #f1f5f9;
}

.sidebar-product img {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    object-fit: cover;
}

.product-details h3 {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
}

.product-meta {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 8px;
}

.product-price {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
}

/* Order Summary */
.order-summary {
    padding: 24px;
    border-bottom: 1px solid #f1f5f9;
    background: #f8fafc;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;
    color: #64748b;
}

.summary-row span:last-child {
    color: #0f172a;
    font-weight: 500;
}

.summary-row .free {
    color: #10b981;
    font-weight: 600;
}

.summary-row.total {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
}

/* Sidebar Actions */
.sidebar-actions {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: auto;
}

.track-btn,
.invoice-btn {
    width: 100%;
    padding: 16px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
}

.track-btn {
    background: #0d9488;
    color: white;
    border: none;
}

.track-btn:hover {
    background: #0f766e;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
}

.invoice-btn {
    background: white;
    color: #0f172a;
    border: 1px solid #e2e8f0;
}

.invoice-btn:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
}

/* Responsive */
@media (max-width: 768px) {
    .main-content {
        padding: 80px 20px 20px;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .orders-container.grid {
        grid-template-columns: 1fr;
    }

    .orders-container.list .order-card {
        flex-direction: column;
    }

    .orders-container.list .order-image {
        width: 100%;
        height: 200px;
    }

    .orders-container.list .order-description {
        display: -webkit-box;
    }

    .order-sidebar {
        max-width: 100%;
    }
}
</style>