<template>
    <div>
        <NavBar></NavBar>
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
                                        <th>Phone</th>
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
                                        <td>{{ order.buyer?.phone || 'N/A' }}</td>
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
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5"
                                                                :id="`exampleModalLabel${order.id}`">
                                                                Transaction
                                                            </h1>
                                                            <button type="button" class="btn-close"
                                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <h4>Recive</h4>
                                                                    <div class="card border-0 ">
                                                                        <img src="https://i.pinimg.com/736x/5f/ba/bd/5fbabd59b375343b60c11bf4277e2061.jpg"
                                                                            class="object-fit-contain" height="400"
                                                                            alt="">
                                                                    </div>
                                                                </div>
                                                                <div class="col-12">
                                                                    <hr>
                                                                    <!-- Buyer Info -->
                                                                    <div class="mb-3 p-3 border rounded shadow-sm">
                                                                        <h6 class="text-primary mb-2">Buyer Information
                                                                        </h6>
                                                                        <p class="mb-1"><strong>Name:</strong> {{
                                                                            order.buyer.name }}</p>
                                                                        <p class="mb-1"><strong>Delivery
                                                                                Method:</strong> {{ order.is_delivery
                                                                                    === 1 ? 'Pick Up' : 'Delivery' }}</p>
                                                                    </div>

                                                                    <!-- Map Info -->
                                                                    <div class="mb-3 p-3 border rounded shadow-sm">
                                                                        <h6 class="text-primary mb-2">Map / Location
                                                                        </h6>
                                                                        <p class="mb-1">
                                                                            <strong>Google Map:</strong>
                                                                            <a :href="order.google_map_url"
                                                                                target="_blank"
                                                                                class="text-decoration-none text-info">
                                                                                View Location
                                                                            </a>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

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
  0% { background-position: -400% 0; }
  100% { background-position: 400% 0; }
}

.skeleton {
  background-image: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f8f8f8 37%,
    #e0e0e0 63%
  );
  background-size: 400% 100%;
  animation: shimmer 7s linear infinite;
  border-radius: 6px;
  height: 50px;
}
</style>