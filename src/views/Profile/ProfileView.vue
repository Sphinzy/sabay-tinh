<template>
  <NavBar></NavBar>
  <div class="container px-0 py-10">
    <div class="row g-0">
      <div class="col-12">

        <!-- HEADER -->
        <div class="card shadow-sm border-0 rounded-2 overflow-hidden rounded-0 mb-4">
          <!-- COVER -->
          <div class="position-relative">
            <img class="w-100 cover-img" :src="coverUrl" alt="cover" />

            <!-- STATS (demo) -->
            <div class="position-absolute top-100 m-3" style="right: 150px;">
              <div class="d-flex gap-3 bg-white border bg-opacity-75 rounded-4 px-3 py-2 shadow-sm">
                <div class="text-center px-2">
                  <div class="fw-bold fs-5">{{ stats.followers }}</div>
                  <div class="text-muted small">followers</div>
                </div>
                <div class="text-center px-2">
                  <div class="fw-bold fs-5">{{ myProducts.length }}</div>
                  <div class="text-muted small">posts</div>
                </div>
                <div class="text-center px-2">
                  <div class="fw-bold fs-5">{{ stats.rating }}</div>
                  <div class="text-muted small">rating</div>
                </div>
              </div>
            </div>
          </div>

          <!-- AVATAR + ACTIONS -->
          <div class="px-4 pb-4">
            <div class="position-relative px-4">

              <!-- Avatar centered -->
              <div class="position-absolute top-0 translate-middle-x avatar-wrap" style="left: 150px;">
                <img class="avatar-img" :src="profile.profile.avatar" alt="avatar" />
                <button class="border-0 text-white rounded-circle position-absolute" data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style="top: 70px; left: 85px; background-color: var(--bs-main); height: 30px; width: 30px;">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </div>

              <!-- Modal -->
              <div class="modal fade" id="exampleModal" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">

                      <h4 class="mb-4">Edit Profile</h4>

                      <div class="text-center mb-4">

                        <div class="position-relative d-inline-block">

                          <!-- Profile Image -->
                          <img :src="imagePreview || defaultImage" class="rounded-circle border shadow"
                            style="width:130px;height:130px;object-fit:cover;cursor:pointer;"
                            @click="triggerFileInput" />

                          <!-- Camera Icon Overlay -->
                          <div
                            class="position-absolute bottom-0 end-0 bg-main text-white rounded-circle d-flex align-items-center justify-content-center"
                            style="width:35px;height:35px;cursor:pointer;" @click="triggerFileInput">
                            <i class="bi bi-camera-fill"></i>
                          </div>

                          <!-- Remove Button -->
                          <div v-if="imagePreview"
                            class="position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                            style="width:28px;height:28px;cursor:pointer;" @click="removeImage">
                            ✕
                          </div>

                          <!-- Hidden File Input -->
                          <input type="file" ref="fileInput" class="d-none" accept="image/*" @change="handleImage" />

                        </div>

                      </div>

                      <!-- Name -->
                      <div class="mb-3">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="name">
                      </div>

                      <!-- Email -->
                      <div class="mb-3">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="email">
                      </div>

                      <!-- Phone -->
                      <div class="mb-3">
                        <label>Phone</label>
                        <input type="text" class="form-control" v-model="phone">
                      </div>

                      <!-- Location -->
                      <div class="mb-3">
                        <label>Location</label>
                        <input type="text" class="form-control" v-model="location">
                      </div>

                      <!-- Footer -->
                      <div class="text-end">
                        <button type="button" class="btn btn-outline-main me-2" data-bs-dismiss="modal" ref="closeBtn">
                          Close
                        </button>
                        <button type="button" class="btn btn-main" :data-bs-dismiss="dismiss" @click="saveProfile">
                          Save Changes
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>


              <!-- Buttons on right -->
              <div class="d-flex justify-content-end pt-5">
              </div>
            </div>

            <!-- Name -->
            <div class="text-start mt-6 ms-12">
              <h4 class="fw-medium mb-1">{{ profile.profile.name }}</h4>
              <div class="text-muted">{{ profile.profile.email }} / {{ profile.profile?.phone || 'N/A' }}</div>
            </div>

            <hr class="my-5" style="height: 2px; background-color: var(--bs-main);">
            <!-- NAV PILLS -->
            <ul class="nav nav-pills mb-4 mt-7" id="profile-tab" role="tablist">

              <!-- Own products -->
              <li class="nav-item" role="presentation">
                <button class="nav-link active px-3" id="posts-tab" data-bs-toggle="pill" data-bs-target="#posts"
                  type="button" role="tab" aria-controls="posts" aria-selected="true">
                  Own Products
                </button>
              </li>

              <!-- Payment -->
              <li class="nav-item" role="presentation">
                <button class="nav-link px-3" id="payment-tab" data-bs-toggle="pill" data-bs-target="#payment"
                  type="button" role="tab" aria-controls="payment" aria-selected="false">
                  Payment Check
                </button>
              </li>

              <!-- History -->
              <li class="nav-item" role="presentation">
                <button class="nav-link px-3" id="history-tab" data-bs-toggle="pill" data-bs-target="#history"
                  type="button" role="tab" aria-controls="history" aria-selected="false">
                  History Order
                </button>
              </li>

            </ul>

            <!-- TAB CONTENT -->
            <div class="tab-content" id="profile-tabContent">

              <!-- OWN PRODUCTS TAB -->
              <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                <div class="px-2 pb-4">

                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="fw-bold m-0">Own Created Products</h5>

                    <button class="btn btn-outline-primary btn-sm" @click="fetchMyProducts(1, 20)"
                      :disabled="loadingProducts">
                      {{ loadingProducts ? "Loading..." : "Refresh" }}
                    </button>
                  </div>

                  <!-- Debug: show total -->
                  <div class="text-muted small mb-2">
                    Loaded: {{ myProducts.length }} products
                  </div>

                  <div v-if="loadingProducts" class="text-center py-4">
                    Loading products...
                  </div>

                  <div v-else-if="errorProducts" class="alert alert-danger">
                  </div>

                  <div v-else class="row g-4">

                    <div v-if="maybeArray.length === 0" class="text-center w-100">
                      <NoDataFound />
                    </div>

                    <div v-else class="col-sm-6 col-md-4 col-xl-3" v-for="own in maybeArray" :key="own.id">
                      <router-link class="text-decoration-none" :to="'/product-detail/' + own.id">
                        <BaseCard :item="own" />
                      </router-link>
                    </div>

                  </div>

                </div>
              </div>

              <!-- PAYMENT TAB -->
              <div class="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">
                <div v-if="profile?.myPayment?.length">
                  <NoDataFound />
                </div>
                <div v-else>
                  <SellProduct />
                </div>
              </div>

              <!-- HISTORY ORDER TAB -->
              <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                <div class="card border-0 shadow-sm rounded-4 p-4">

                  <div class="d-flex align-items-center gap-2">
                    <h4 class="m-0 fw-bold">Order History</h4>

                    <button class="btn btn-outline-primary btn-sm ms-auto" @click="fetchMyPurchased()"
                      :disabled="loadingPurchased">
                      {{ loadingPurchased ? "Loading..." : "Refresh" }}
                    </button>
                  </div>

                  <div class="text-muted small mb-2">
                    Loaded: {{ myPurchased.length }} orders
                  </div>

                  <div v-if="loadingPurchased" class="text-center py-4">
                    Loading history...
                  </div>

                  <div v-else-if="errorPurchased" class="alert alert-danger">
                    {{ errorPurchased }}
                  </div>

                  <div v-else class="d-flex flex-column gap-3">
                    <div class="row">

                      <div v-if="maybeArray.length === 0" class="text-center w-100">
                        <NoDataFound />
                      </div>

                      <div v-else class="col-lg-12">

                        <table class="table table-striped text-center">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Seller Name</th>
                              <th>Price</th>
                              <th>Email</th>
                              <th>QTY</th>
                              <th>Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr v-for="order in myPurchased" :key="order.id">
                              <td>{{ textCut(order.product.title) }}</td>
                              <td>{{ textCut(order.seller.name) }}</td>
                              <td>${{ order.price }}</td>
                              <td>{{ order.buyer?.email || 'N/A' }}</td>
                              <td>{{ order.qty }}</td>
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
                            </tr>
                            <!-- <tr v-if="orders.length === 0">
                                        <td colspan="7" class="text-center">No orders found.</td>
                                    </tr> -->
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div><!-- tab-content -->

          </div><!-- px-4 pb-4 -->
        </div><!-- card -->

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import api from "@/api/http"
import NavBar from "@/components/layout/NavBar.vue"
import SellProduct from "../Product/SellProduct.vue"
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseTable from "@/components/ui/BaseTable.vue"
import { useProfileStore } from "@/stores/profile"
import { Modal } from "bootstrap";
// import { useOwnProducts } from "@/stores/ownProduct"
// const ownProduct = useOwnProducts();
/* UI demo */
const coverUrl =
  "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?q=80&w=1600&auto=format&fit=crop"

const avatarUrl =
  "https://i.pinimg.com/1200x/7d/da/70/7dda70bbe2bcda82010badfdb24f6eb3.jpg"

// const profile = ref({
//   name: "Sang",
//   subtitle: "Seller Profile",
// })

const stats = ref({
  followers: 888,
  posts: 12,
  rating: "9.47",
})

/* API state */
const myProducts = ref([])
const myPurchased = ref([])
const maybeArray = ref([]);

const loadingProducts = ref(false)
const loadingPurchased = ref(false)

const errorProducts = ref("")
const errorPurchased = ref("")
const notifier = notify();
const profile = useProfileStore();

/* API calls */
const fetchMyProducts = async (page = 1, perPage = 20) => {
  loadingProducts.value = true
  errorProducts.value = ""
  try {
    const res = await api.get(`/api/profile/products?page=${page}&per_page=${perPage}`)
    // console.log("PRODUCTS RAW:", res.data)

    // supports: {data:{data:[]}} OR {data:[]} OR []
    maybeArray.value =
      res.data?.data?.data ??
      res.data?.data ??
      res.data ??
      []

    myProducts.value = Array.isArray(maybeArray) ? maybeArray : []
  } catch (err) {
    console.log("PRODUCT ERROR:", err?.response?.data || err)
    errorProducts.value =
      err?.response?.data?.message || err?.message || "Failed to load products"
  } finally {
    loadingProducts.value = false
  }
}

const fetchMyPurchased = async () => {
  loadingPurchased.value = true
  errorPurchased.value = ""
  try {
    const res = await api.get("/api/profile/purchased")
    // console.log("PURCHASED RAW:", res.data)

    const maybeArray =
      res.data?.data?.data ??
      res.data?.data ??
      res.data ??
      []
    console.log(res);
    myPurchased.value = Array.isArray(maybeArray) ? maybeArray : []
  } catch (err) {
    console.log("PURCHASED ERROR:", err?.response?.data || err)
    errorPurchased.value =
      err?.response?.data?.message || err?.message || "Failed to load purchased history"
  } finally {
    loadingPurchased.value = false
  }
}

/* Helpers for flexible field names */
const getProductImage = (item) => {
  return (
    item.thumbnail_url ||
    item.image_url ||
    item.thumbnail ||
    item.image ||
    item.photo ||
    item.cover ||
    "https://via.placeholder.com/600x400"
  )
}

const getProductTitle = (item) => {
  return (
    item.name ||
    item.title ||
    item.product_name ||
    item.name_en ||
    item.name_kh ||
    "No Name"
  )
}

const getProductPrice = (item) => {
  const price = item.price ?? item.unit_price ?? item.amount ?? item.total ?? ""
  return price === "" ? "" : price
}

/* badge color */
const badgeClass = (status) => {
  const s = (status || "").toLowerCase()
  if (s.includes("deliver") || s.includes("complete"))
    return "bg-success-subtle text-success border border-success-subtle"
  if (s.includes("cancel"))
    return "bg-danger-subtle text-danger border border-danger-subtle"
  return "bg-primary-subtle text-primary border border-primary-subtle"
}
function textCut(text, limit = 20) {
  if (!text) return '';
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

const closeBtn = ref(null);
let name = ref("");
let email = ref("");
let phone = ref("");
let location = ref("");

import { watch } from "vue";
import { notify } from "@/utils/toast"
import NoDataFound from "@/components/Skeleton/NoDataFound.vue"




const imagePreview = ref(null);
const selectedFile = ref(null);
const fileInput = ref(null);
const dismiss = ref(false)

const defaultImage = ref('');
watch(
  () => profile.profile,
  (newProfile) => {
    if (newProfile) {
      name.value = newProfile.name;
      email.value = newProfile.email;
      phone.value = newProfile.phone;
      location.value = newProfile.location;
      imagePreview.value = newProfile.avatar;
    }
  },
  { immediate: true }
);
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  imagePreview.value = null;
  selectedFile.value = null;
};

const saveProfile = async () => {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("phone", phone.value);
  formData.append("location", location.value);

  if (selectedFile.value) {
    formData.append("image", selectedFile.value);
  }

  try {
    await api.put('/api/profile/info', formData)
    dismiss.value = true;
    notifier.success('Updated')
    closeBtn.value.click();

  } catch (error) {
    dismiss.value = false;
    notifier.error('Update Failed')
  } finally {
    profile.getProfile();
  }
};

console.log(profile.myPayment.length);
/* load */
onMounted(() => {
  // load products first
  fetchMyProducts(1, 20)
  profile.getProfile()

  // load history when tab opened
  const historyBtn = document.getElementById("history-tab")
  historyBtn?.addEventListener("shown.bs.tab", () => {
    if (myPurchased.value.length === 0) fetchMyPurchased()
  })
})
</script>

<style scoped>
.cover-img {
  height: 260px;
  object-fit: cover;
}

.avatar-wrap {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #fff;
  padding: 6px;
  margin-top: -55px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.btn-icon {
  width: 42px;
  height: 42px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-img {
  height: 220px;
  object-fit: cover;
}

.nav-pills .nav-link {
  color: #6c757d;
  font-weight: 600;
  border-radius: 999px;
}

.nav-pills .nav-link.active {
  background-color: #111827;
  color: white;
}
</style>