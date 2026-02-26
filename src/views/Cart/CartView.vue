<template>
  <div class="checkout container py-5">
    <div class="row min-vh-100">

      <!-- LEFT SIDE -->
      <div class="col-lg-7 col-12 p-5 bg-white">

        <h3 class="mb-4 fw-bold">Delivery</h3>

        <!-- Delivery Method -->
        <div class="mb-4 d-flex gap-4">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="pickup"
              :value="1"
              v-model="form.is_delivery"
            />
            <label class="form-check-label" for="pickup">
              Pick Up
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="delivery"
              :value="2"
              v-model="form.is_delivery"
            />
            <label class="form-check-label" for="delivery">
              Delivery
            </label>
          </div>
        </div>

        <!-- Address -->
        <div class="mb-3">
          <input
            v-model="form.address"
            type="text"
            class="form-control"
            :placeholder="form.is_delivery === 2 ? 'Delivery Address *' : 'Pickup Notes'"
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

          <button
            type="button"
            class="btn btn-outline-dark"
            @click="detectLocation"
            :disabled="locationLoading"
          >
            {{ locationLoading ? "Locating..." : "Detect" }}
          </button>
        </div>

        <!-- Upload -->
        <div class="mb-4">
          <label class="form-label fw-bold">Payment Proof *</label>

          <div class="upload-box" @click="fileInput.click()">
            <input
              type="file"
              ref="fileInput"
              hidden
              accept="image/*"
              @change="handleImage"
            />

            <div v-if="!imagePreview" class="text-center text-muted">
              Click to upload
            </div>

            <div v-else class="position-relative">
              <img :src="imagePreview" class="img-fluid rounded" />
              <button
                type="button"
                class="btn-close position-absolute top-0 end-0 m-2"
                @click.stop="removeImage"
              ></button>
            </div>
          </div>

          <small v-if="transactionFile" class="text-success">
            {{ transactionFile.name }}
          </small>
        </div>

        <!-- Save Info -->
        <div class="form-check mb-4">
          <input class="form-check-input" type="checkbox" v-model="form.save" />
          <label class="form-check-label">
            Save this information
          </label>
        </div>

        <!-- Submit -->
        <button
          type="button"
          class="btn btn-dark w-100 py-3"
          @click="handleOrder"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Processing..." : "Place Order" }}
        </button>
      </div>

      <!-- RIGHT SIDE -->
      <div class="col-lg-5 col-12 bg-light p-5">
        <h4 class="mb-4 fw-bold">Order Summary</h4>

        <div class="bg-white p-4 rounded mb-4 text-center">
          <h6 class="text-muted mb-3">Scan to Pay</h6>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com"
            class="img-fluid"
          />
        </div>

        <hr />

        <div class="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <span>${{ subtotal }}</span>
        </div>

        <div class="d-flex justify-content-between fw-bold fs-5">
          <span>Total</span>
          <span>${{ subtotal }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/http"
import { reactive, ref, computed } from "vue"

const form = reactive({
  is_delivery: null,
  address: "",
  google_map_url: "",
  save: false
})

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
    (pos) => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      form.google_map_url = `https://www.google.com/maps?q=${lat},${lng}`
      locationLoading.value = false
    },
    () => {
      alert("Location failed")
      locationLoading.value = false
    }
  )
}

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
    alert("Please select delivery method")
    return
  }

  if (Number(form.is_delivery) === 2 && !form.address) {
    alert("Delivery address required")
    return
  }

  if (!transactionFile.value) {
    alert("Upload payment proof")
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

    const response = await api.post("/api/carts/checkout", formData)

    alert("Order placed successfully!")

    // Reset form after success
    form.is_delivery = null
    form.address = ""
    form.google_map_url = ""
    form.save = false
    transactionFile.value = null
    imagePreview.value = null

  } catch (error) {
    console.error(error.response?.data || error)
    alert("Checkout failed")
  } finally {
    isSubmitting.value = false
  }
}
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