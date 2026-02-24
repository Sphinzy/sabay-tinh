<template>
  <div class="container-fluid px-0">
    <div class="row g-0">
      <div class="col-12">

        <!-- HEADER -->
        <div class="card shadow-sm border-0 overflow-hidden rounded-0 mb-4">
          <!-- COVER -->
          <div class="position-relative">
            <img class="w-100 cover-img" :src="coverUrl" alt="cover" />

            <!-- STATS (demo) -->
            <div class="position-absolute top-0 end-0 m-3">
              <div class="d-flex gap-3 bg-white bg-opacity-75 rounded-4 px-3 py-2 shadow-sm">
                <div class="text-center px-2">
                  <div class="fw-bold fs-5">{{ stats.followers }}</div>
                  <div class="text-muted small">followers</div>
                </div>
                <div class="text-center px-2">
                  <div class="fw-bold fs-5">{{ stats.posts }}</div>
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
              <div class="position-absolute top-0 start-50 translate-middle-x avatar-wrap">
                <img class="avatar-img" :src="avatarUrl" alt="avatar" />
              </div>

              <!-- Buttons on right -->
              <div class="d-flex justify-content-end pt-5">
                <div class="d-flex align-items-center gap-2">
                  <button class="btn btn-primary rounded-pill px-4 fw-semibold">
                    ✓ Following
                  </button>
                  <button class="btn btn-outline-secondary rounded-circle btn-icon">✉️</button>
                  <button class="btn btn-outline-secondary rounded-circle btn-icon">f</button>
                  <button class="btn btn-outline-secondary rounded-circle btn-icon">X</button>
                  <button class="btn btn-outline-secondary rounded-circle btn-icon">in</button>
                </div>
              </div>
            </div>

            <!-- Name -->
            <div class="text-center mt-3">
              <h4 class="fw-bold mb-1">{{ profile.name }}</h4>
              <div class="text-muted">{{ profile.subtitle }}</div>
            </div>

            <!-- NAV PILLS -->
            <ul class="nav nav-pills mb-4 mt-4" id="profile-tab" role="tablist">

              <!-- Own products -->
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="posts-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#posts"
                  type="button"
                  role="tab"
                  aria-controls="posts"
                  aria-selected="true"
                >
                  Own Products
                </button>
              </li>

              <!-- Payment -->
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="payment-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#payment"
                  type="button"
                  role="tab"
                  aria-controls="payment"
                  aria-selected="false"
                >
                  Payment Check
                </button>
              </li>

              <!-- History -->
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="history-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#history"
                  type="button"
                  role="tab"
                  aria-controls="history"
                  aria-selected="false"
                >
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

                    <button
                      class="btn btn-outline-primary btn-sm"
                      @click="fetchMyProducts(1, 20)"
                      :disabled="loadingProducts"
                    >
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
                    {{ errorProducts }}
                  </div>

                  <div v-else class="row g-4">
                    <div
                      class="col-12 col-md-6 col-lg-4 col-xl-3"
                      v-for="(item, idx) in myProducts"
                      :key="item.id ?? idx"
                    >
                      <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100">

                        <img
                          :src="getProductImage(item)"
                          class="w-100 post-img"
                          alt="thumb"
                        />

                        <div class="card-body">
                          <h6 class="fw-bold mb-1">
                            {{ getProductTitle(item) }}
                          </h6>

                          <div class="text-muted small">
                            ${{ getProductPrice(item) }}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- PAYMENT TAB -->
              <div class="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">
                <div class="p-4">
                  <h5 class="fw-bold">Payment Check</h5>
                  <p class="text-muted m-0">(Connect payment API later)</p>
                </div>
              </div>

              <!-- HISTORY ORDER TAB -->
              <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                <div class="card border-0 shadow-sm rounded-4 p-4">

                  <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="fs-4">🧾</span>
                    <h4 class="m-0 fw-bold">Order History</h4>

                    <button
                      class="btn btn-outline-primary btn-sm ms-auto"
                      @click="fetchMyPurchased()"
                      :disabled="loadingPurchased"
                    >
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
                    <div class="border rounded-4 p-4 bg-white" v-for="(ord, idx) in myPurchased" :key="ord.id ?? idx">

                      <div class="d-flex justify-content-between align-items-start">
                        <div>
                          <div class="fw-bold fs-5">
                            {{ ord.code || ord.order_no || ord.id || ("ORD-" + (idx + 1)) }}
                          </div>
                          <div class="text-muted small">
                            {{ ord.date || ord.created_at || "" }}
                          </div>
                        </div>

                        <div class="text-end">
                          <div class="fw-bold fs-4">
                            ${{ ord.total_price ?? ord.total ?? ord.amount ?? "0.00" }}
                          </div>

                          <span class="badge px-3 py-2 rounded-pill" :class="badgeClass(ord.status)">
                            {{ ord.status || "In Transit" }}
                          </span>
                        </div>
                      </div>

                      <div class="text-muted mt-3">
                        <div v-for="(p, pidx) in (ord.items || ord.products || [])" :key="pidx">
                          {{ (p.name || p.title || "Item") }} × {{ p.qty || p.quantity || 1 }}
                        </div>
                        <div v-if="!(ord.items || ord.products)">
                          (No items list from API)
                        </div>
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

/* UI demo */
const coverUrl =
  "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?q=80&w=1600&auto=format&fit=crop"

const avatarUrl =
  "https://i.pinimg.com/1200x/7d/da/70/7dda70bbe2bcda82010badfdb24f6eb3.jpg"

const profile = ref({
  name: "Sang",
  subtitle: "Seller Profile",
})

const stats = ref({
  followers: 888,
  posts: 12,
  rating: "9.47",
})

/* API state */
const myProducts = ref([])
const myPurchased = ref([])

const loadingProducts = ref(false)
const loadingPurchased = ref(false)

const errorProducts = ref("")
const errorPurchased = ref("")

/* API calls */
const fetchMyProducts = async (page = 1, perPage = 20) => {
  loadingProducts.value = true
  errorProducts.value = ""
  try {
    const res = await api.get(`/api/profile/products?page=${page}&per_page=${perPage}`)
    console.log("PRODUCTS RAW:", res.data)

    // supports: {data:{data:[]}} OR {data:[]} OR []
    const maybeArray =
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
    console.log("PURCHASED RAW:", res.data)

    const maybeArray =
      res.data?.data?.data ??
      res.data?.data ??
      res.data ??
      []

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

/* load */
onMounted(() => {
  // load products first
  fetchMyProducts(1, 20)

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
  box-shadow: 0 10px 22px rgba(0,0,0,0.15);
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