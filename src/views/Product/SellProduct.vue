<template>
    <div class="">
        <!-- <NavBar></NavBar> -->
        <main>
            <section>
                <div class="container">
                    <div class="row">
                        <h3>Seller Order</h3>
                        <p>Manage and review pending seller orders</p>
                        <div class="col-lg-12">

                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Customer Name</th>
                                        <th>Price</th>
                                        <th>Email</th>
                                        <th>QTY</th>
                                        <th>Transaction</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <!-- Skeleton rows -->
                                    <tr v-if="isLoading" v-for="n in 3" :key="n">
                                        <td>
                                            <div class="skeleton shimmer w-3/4 h-4 rounded"></div>
                                        </td>
                                        <td>
                                            <div class="skeleton shimmer w-2/3 h-4 rounded"></div>
                                        </td>
                                        <td>
                                            <div class="skeleton shimmer w-1/2 h-4 rounded"></div>
                                        </td>
                                        <td>
                                            <div class="skeleton shimmer w-2/3 h-4 rounded"></div>
                                        </td>
                                        <td>
                                            <div class="skeleton shimmer w-1/4 h-4 rounded"></div>
                                        </td>
                                        <td>
                                            <div class="skeleton shimmer w-1/2 h-4 rounded"></div>
                                        </td>
                                        <td>
                                            <div class="skeleton shimmer w-1/3 h-4 rounded"></div>
                                        </td>
                                        <td>
                                            <div class="skeleton shimmer w-2/3 h-4 rounded"></div>
                                        </td>
                                    </tr>
                                    <tr v-else v-for="order in orders" :key="order.id">
                                        <td>{{ textCut(order.product.title) }}</td>
                                        <td>{{ textCut(order.buyer.name) }}</td>
                                        <td>${{ order.price }}</td>
                                        <td>{{ order.buyer?.email || 'N/A' }}</td>
                                        <td>{{ order.qty }}</td>

                                        <!-- Status Badge -->
                                        <td>
                                            <!-- Button to open modal -->
                                            <button type="button" class="btn" data-bs-toggle="modal"
                                                :data-bs-target="`#exampleModal${order.id}`">
                                                <i class="bi bi-arrow-repeat text-primary me-2 fs-4"></i>
                                            </button>

                                            <!-- Modal -->
                                            <div class="modal fade" :id="`exampleModal${order.id}`" tabindex="-1"
                                                :aria-labelledby="`exampleModalLabel${order.id}`" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered modal-lg">
                                                    <div
                                                        class="modal-content border-0 shadow rounded-4 overflow-hidden">
                                                        <!-- Header -->
                                                        <div class="modal-header bg-light border-0 px-4 py-3">
                                                            <div>
                                                                <h5 class="modal-title fw-bold mb-0"
                                                                    :id="`exampleModalLabel${order.id}`">
                                                                    Transaction
                                                                </h5>
                                                                <div class="text-muted small">
                                                                    Receive • Order #{{ order.id }}
                                                                </div>
                                                            </div>
                                                            <button type="button" class="btn-close"
                                                                data-bs-dismiss="modal"></button>
                                                        </div>

                                                        <!-- Body -->
                                                        <div class="modal-body p-4">
                                                            <!-- Receipt Image -->
                                                            <div class="mb-4">
                                                                <div
                                                                    class="d-flex align-items-center justify-content-between mb-2">
                                                                    <h6 class="fw-bold mb-0">Receipt</h6>
                                                                    <span class="badge rounded-pill text-bg-success"
                                                                        v-if="order.transaction_file">
                                                                        Uploaded
                                                                    </span>
                                                                    <span class="badge rounded-pill text-bg-secondary"
                                                                        v-else>
                                                                        No file
                                                                    </span>
                                                                </div>

                                                                <div
                                                                    class="card border-0 bg-light rounded-4 overflow-hidden">
                                                                    <img :src="order?.transaction_file ||
                                                                        'https://ualbiotech.com//wp-content/uploads/2023/03/C101307_Image_01.jpg'
                                                                        " class="w-100" style="height: 360px; object-fit: contain" alt="transaction" />
                                                                </div>

                                                                <div class="text-muted small mt-2">
                                                                    Tip: Click the image to open in new tab.
                                                                    <a v-if="order?.transaction_file"
                                                                        :href="order.transaction_file" target="_blank"
                                                                        class="ms-1 text-decoration-none">
                                                                        Open
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="row g-3">
                                                                <!-- Buyer Information -->
                                                                <div class="col-12 col-md-6">
                                                                    <div class="card border-0 bg-light rounded-4 h-100">
                                                                        <div class="card-body">
                                                                            <div
                                                                                class="d-flex align-items-center gap-2 mb-3">
                                                                                <span class="fs-5">🧍</span>
                                                                                <h6 class="fw-bold mb-0">
                                                                                    Buyer Information
                                                                                </h6>
                                                                            </div>

                                                                            <div
                                                                                class="d-flex justify-content-between mb-2">
                                                                                <span class="text-muted">Name</span>
                                                                                <span class="fw-semibold">{{
                                                                                    order.buyer?.name || "N/A"
                                                                                    }}</span>
                                                                            </div>

                                                                            <div
                                                                                class="d-flex justify-content-between mb-2">
                                                                                <span class="text-muted">Delivery</span>

                                                                                <span class="badge rounded-pill mt-2"
                                                                                    :class="order.is_delivery === 1
                                                                                            ? 'text-bg-warning'
                                                                                            : 'text-bg-info'
                                                                                        ">
                                                                                    {{
                                                                                        order.is_delivery === 1
                                                                                            ? "Pick Up"
                                                                                    : "Delivery"
                                                                                    }}
                                                                                </span>
                                                                            </div>

                                                                            <div class="d-flex justify-content-between">
                                                                                <span class="text-muted">Email</span>
                                                                                <span class="fw-semibold">{{
                                                                                    order.buyer?.email || "N/A"
                                                                                    }}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <!-- Map / Location -->
                                                                <div class="col-12 col-md-6">
                                                                    <div class="card border-0 bg-light rounded-4 h-100">
                                                                        <div class="card-body">
                                                                            <div
                                                                                class="d-flex align-items-center gap-2 mb-3">
                                                                                <span class="fs-5">📍</span>
                                                                                <h6 class="fw-bold mb-0">
                                                                                    Map / Location
                                                                                </h6>
                                                                            </div>

                                                                            <div class="text-muted small mb-2">
                                                                                Open buyer location in Google Maps
                                                                            </div>

                                                                            <a :href="order.google_map_url"
                                                                                target="_blank"
                                                                                class="btn btn-outline-main w-100 rounded-pill fw-semibold"
                                                                                :class="{
                                                                                    disabled: !order.google_map_url,
                                                                                }">
                                                                                View Location
                                                                            </a>

                                                                            <div v-if="!order.google_map_url"
                                                                                class="text-danger small mt-2">
                                                                                No location URL provided.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Footer -->
                                                        <div class="modal-footer border-0 bg-white px-4 py-3">
                                                            <button class="btn btn-outline-main rounded-pill px-4"
                                                                data-bs-dismiss="modal">
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge" :class="{
                                                'badge-warning': order.status === 1,
                                                'badge-success': order.status === 2,
                                                'badge-danger': order.status === 3
                                            }">
                                                {{
                                                    order.status === 1
                                                        ? 'Pending'
                                                        : order.status === 2
                                                            ? 'Approved'
                                                            : 'Rejected'
                                                }}
                                            </span>
                                        </td>

                                        <td class="text-center">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-light border-0 bg-transparent"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>

                                                <ul class="dropdown-menu shadow-sm border-0">
                                                    <li>
                                                        <button class="dropdown-item text-success"
                                                            @click="handleApprove(order.id)">
                                                            <i class="bi bi-check-circle me-2"></i> Approve
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button class="dropdown-item text-danger"
                                                            @click="handleReject(order.id)">
                                                            <i class="bi bi-x-circle me-2"></i> Reject
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>

                                    </tr>
                                    <!-- <tr v-if="orders.length === 0">
                                        <td colspan="7" class="text-center">No orders found.</td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import api from '@/api/http';
import NavBar from '@/components/layout/NavBar.vue';
import { onMounted, reactive, ref } from 'vue';

const orders = reactive([]);
const isLoading = ref(true)
// Fetch orders from API
const fetchOrder = async () => {
    try {
        const res = await api.get('/api/profile/payment-check');
        // Clear the array and push new data to keep reactivity
        orders.length = 0;
        res.data.data.forEach((order) => orders.push(order));
        console.log(res.data.data);
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

// Approve order
const handleApprove = async (id) => {
    try {
        await api.put(`/api/payments/approve/${id}`);
        fetchOrder();
    } catch (error) {
        console.error(error);
    }
};

// Reject order
const handleReject = async (id) => {
    try {
        await api.put(`/api/payments/reject/${id}`);
        fetchOrder();
    } catch (error) {
        console.error(error);
    }
};


// Text truncate helper
function textCut(text, limit = 20) {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
}

onMounted(fetchOrder);
</script>

<style scoped>
/* Shimmer animation */
@keyframes shimmer {
    0% {
        background-position: -400% 0;
    }

    100% {
        background-position: 400% 0;
    }
}

.skeleton {
    background-image: linear-gradient(90deg,
            #e0e0e0 25%,
            #f8f8f8 37%,
            #e0e0e0 63%);
    background-size: 400% 100%;
    animation: shimmer 7s linear infinite;
    border-radius: 6px;
    height: 50px;
}
</style>