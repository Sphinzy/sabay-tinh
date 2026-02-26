<template>
  <NavBar></NavBar>

  <div v-if="isLoading">
    <Loading></Loading>
  </div>

  <div v-else class="checkout container py-15">
    <div class="row">

      <!-- LEFT SIDE -->
      <div class="col-lg-7 col-12 p-5 bg-white">
        <h3 class="mb-4 fw-bold">Delivery</h3>

        <!-- Delivery Method -->
        <div class="mb-4 d-flex gap-4">
          <div class="form-check">
            <input class="form-check-input" type="radio" id="pickup" :value="1" v-model="form.is_delivery" />
            <label class="form-check-label" for="pickup">
              <i class="bi bi-box-seam me-2"></i> Pick Up
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" id="delivery" :value="2" v-model="form.is_delivery" />
            <label class="form-check-label" for="delivery">
              <i class="bi bi-truck me-2"></i>Delivery
            </label>
          </div>
        </div>

        <!-- Address -->
        <div class="mb-3">
          <input
            v-model="form.address"
            type="text"
            class="form-control"
            placeholder="Address"
          />
        </div>

        <!-- Google Maps -->
        <div class="d-flex gap-3 mb-4 align-items-start">
          <input
            v-model="form.google_map_url"
            type="text"
            class="form-control"
            placeholder="Google Maps URL"
          />

          <button type="button" class="btn btn-outline-dark" @click="detectLocation" :disabled="locationLoading">
            {{ locationLoading ? "Locating..." : "Detect" }}
          </button>
        </div>

        <!-- Upload Payment Proof -->
        <div class="mb-4">
          <label class="form-label fw-bold">Payment Proof *</label>

          <div class="upload-box" @click="fileInput.click()">
            <input type="file" ref="fileInput" hidden accept="image/*" @change="handleImage" />

            <div v-if="!imagePreview" class="text-center text-muted">
              Click to upload
            </div>

            <div v-else class="position-relative">
              <img :src="imagePreview" class="img-fluid rounded" />
              <button type="button" class="btn-close position-absolute top-0 end-0 m-2" @click.stop="removeImage"></button>
            </div>
          </div>

          <small v-if="transactionFile" class="text-success">
            {{ transactionFile.name }}
          </small>
        </div>

        <!-- Save Info -->
        <div class="form-check mb-4">
          <input class="form-check-input" type="checkbox" v-model="form.save" />
          <label class="form-check-label">Save this information</label>
        </div>

        <!-- Submit -->
        <div class="text-end">
          <router-link to="/cartcheck" class="btn btn-outline-main me-2">Back to cart</router-link>

          <button type="button" class="btn btn-main" @click="handleOrder" :disabled="isSubmitting">
            {{ isSubmitting ? "Processing..." : "Place Order" }}
          </button>
        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="col-lg-5 col-12 bg-light p-5">
        <h4 class="mb-4 fw-bold">Order Summary</h4>

        <div class="bg-white p-4 rounded mb-4 text-center">
          <h6 class="text-muted mb-3 text-start">Scan to Pay</h6>
          <p class="text-start">{{ name }}</p>
          <hr class="pb-4" />
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com"
            class="img-fluid"
          />
        </div>

        <hr />

        <div class="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <span>${{ totalAmount }}</span>
        </div>

        <div class="d-flex justify-content-between fw-bold fs-5">
          <span>Total</span>
          <span>${{ totalAmount }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import api from "@/api/http"
import NavBar from "@/components/layout/NavBar.vue"
import Loading from "@/components/Skeleton/Loading.vue"
import router from "@/router"
import { notify } from "@/utils/toast"
import { reactive, ref, computed, onMounted, watch } from "vue"

const form = reactive({
  is_delivery: null,
  address: "",
  google_map_url: "",
  save: false
})

const notifier = notify()
const transactionFile = ref(null)
const imagePreview = ref(null)
const fileInput = ref(null)
const locationLoading = ref(false)
const isSubmitting = ref(false)

/* Example cart (replace with Pinia later) */
const cart = reactive([
  { price: 12.95, qty: 2 },
  { price: 6.95, qty: 1 }
])

const subtotal = computed(() =>
  cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)
)

/* Detect Location */
const detectLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported")
    return
  }

  locationLoading.value = true

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      form.google_map_url = `https://www.google.com/maps?q=${lat},${lng}`

      // Optional: parse to readable address using coordinates
      form.address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      locationLoading.value = false
    },
    () => {
      alert("Location failed")
      locationLoading.value = false
    }
  )
}

/* Parse Google Maps URL to address */
const parseGoogleMapsUrl = (url) => {
  try {
    const u = new URL(url)
    const q = u.searchParams.get("q")
    return q || url
  } catch (e) {
    return url
  }
}

/* Watch Google Maps URL and auto-fill address */
watch(
  () => form.google_map_url,
  (newUrl) => {
    if (!newUrl) return
    form.address = parseGoogleMapsUrl(newUrl)
  }
)

/* Image Upload */
const handleImage = (e) => {
  const file = e.target.files[0]
  if (!file) return

  transactionFile.value = file

  const reader = new FileReader()
  reader.onload = (ev) => {
    imagePreview.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  transactionFile.value = null
  imagePreview.value = null
}

/* Submit Order */
const handleOrder = async () => {
  if (!form.is_delivery) {
    notifier.error("Please select delivery method")
    return
  }

  if (Number(form.is_delivery) === 2 && !form.address) {
    notifier.error("Delivery address required")
    return
  }

  if (!transactionFile.value) {
    notifier.error("Upload payment proof")
    return
  }

  try {
    isSubmitting.value = true

    const formData = new FormData()
    formData.append("is_delivery", Number(form.is_delivery))
    formData.append("address", form.address || "")
    formData.append("google_map_url", form.google_map_url || "")
    formData.append("save", form.save ? 1 : 0)
    formData.append("cart", JSON.stringify(cart))
    formData.append("total", subtotal.value)
    formData.append("transaction_file", transactionFile.value)

    await api.post("/api/carts/checkout", formData)

    notifier.success("Order placed successfully!")

    // Reset form
    form.is_delivery = null
    form.address = ""
    form.google_map_url = ""
    form.save = false
    transactionFile.value = null
    imagePreview.value = null

    router.push("/shop")
  } catch (error) {
    console.error(error.response?.data || error)
    notifier.error("Checkout failed")
  } finally {
    isSubmitting.value = false
  }
}

/* Cart & Profile */
let totalAmount = ref(0)
const fetchCart = async () => {
  try {
    const res = await api.get("/api/profile/carts")
    totalAmount.value = res.data?.data?.total || 0
  } catch (error) {
    console.log(error)
    totalAmount.value = 0
  }
}

let name = ref("")
const getProfile = async () => {
  try {
    const res = await api.get("/api/me")
    name.value = res.data.data.name
  } catch (error) {
    notifier.error(error)
  }
}

/* Loading State */
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
  try {
    await fetchCart()
    await getProfile()
  } catch (error) {
    notifier.error("Failed to load cart")
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.upload-box {
  border: 2px dashed #dcdcdc;
  border-radius: 12px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.upload-box:hover {
  border-color: #000;
}
</style>