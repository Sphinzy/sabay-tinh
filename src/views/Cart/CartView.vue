<template>
    <div class="checkout container">
        <div class="row min-vh-100">

            <!-- LEFT SIDE: Checkout Form -->
            <div class="col-lg-7 col-12 p-5 bg-white">
                <router-link to="/cartcheck" class="text-main mb-3 d-inline-block back-link">
                    <i class="bi bi-arrow-left me-2"></i>Back to Cart
                </router-link>

                <h3 class="mb-4">Contact</h3>

                <!-- Email -->
                <div class="field mb-3">
                    <input v-model="form.email" type="email" class="form-control input" placeholder=" ">
                    <label>Email</label>
                </div>

                <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" v-model="form.news">
                    <label class="form-check-label">Email me with news and offers</label>
                </div>

                <h3 class="mb-3">Delivery</h3>

                <!-- Country -->
                <div class="field mb-3 select-field">
                    <select v-model="form.country" class="form-select input">
                        <option>Cambodia</option>
                        <option>Netherlands</option>
                        <option>USA</option>
                    </select>
                    <label>Country / Region</label>
                </div>

                <!-- Address & Location -->
                <div class="field mb-3">
                    <input v-model="form.address" type="text" class="form-control input" placeholder=" ">
                    <label>Address</label>
                </div>

                <div class="d-flex gap-3 mb-3 align-items-start">
                    <div class="field flex-grow-1">
                        <input v-model="form.location" type="text" class="form-control input" placeholder=" ">
                        <label>Location URL / Coordinates</label>
                    </div>
                    <button class="btn btn-outline-dark location-btn" @click="detectLocation"
                        :disabled="locationLoading">
                        <i class="bi bi-geo-alt me-1"></i>
                        {{ locationLoading ? 'Locating...' : 'Detect' }}
                    </button>
                </div>

                <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" v-model="form.save">
                    <label class="form-check-label">Save this information for next time</label>
                </div>

                <button class="btn btn-dark w-100 py-3" @click="handleOrder">
                    <i class="bi bi-lock-fill me-2"></i>Place Order
                </button>
            </div>

            <!-- RIGHT SIDE: Order Summary -->
            <div class="col-lg-5 col-12 summary p-5">
                <h4 class="mb-4">Order Summary</h4>

                <!-- Delivery Method -->
                <div class="mb-4">
                    <label class="form-label fw-bold mb-2">Delivery Method</label>
                    <div class="d-flex gap-4">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="deliveryOption" id="delivery"
                                value="delivery" v-model="deliveryOption">
                            <label class="form-check-label" for="delivery">
                                <i class="bi bi-truck me-1"></i>Delivery
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="deliveryOption" id="pickup"
                                value="pickup" v-model="deliveryOption">
                            <label class="form-check-label" for="pickup">
                                <i class="bi bi-shop me-1"></i>Pick Up
                            </label>
                        </div>
                    </div>
                </div>

                <!-- QR Code Section -->
                <div class="qr-section text-center p-4 bg-white rounded-3 mb-4">
                    <h6 class="mb-3 text-muted">Scan to View Image</h6>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6QptGd5m5pU69hip6j-Hy9kvrQ5VqUK2Fw&s "
                        class="qr-code img-fluid" alt="QR Code">
                    <p class="small text-muted mt-2 mb-0">
                        Scan this QR to open the image
                    </p>
                </div>

                <!-- Payment Proof - FULL WIDTH -->
                <div class="mb-4">
                    <label class="form-label fw-bold mb-2">Payment Proof</label>
                    <div class="upload-box" :class="{ 'has-image': imagePreview }">
                        <input type="file" @change="handleImage" class="file-input" accept="image/*" />

                        <div v-if="!imagePreview" class="upload-placeholder">
                            <i class="bi bi-cloud-arrow-up fs-4 mb-2"></i>
                            <span class="small text-muted">Click to upload</span>
                        </div>

                        <div v-else class="image-preview-wrapper">
                            <img :src="imagePreview" class="img-fluid rounded" alt="Payment Proof" />
                            <button type="button" @click="removeImage" class="btn-remove">
                                <i class="bi bi-x-circle-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <hr>

                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal · {{cart.reduce((a, b) => a + b.qty, 0)}} items</span>
                    <span>${{ subtotal }}</span>
                </div>

                <div class="d-flex justify-content-between mb-2 text-muted">
                    <span>Shipping</span>
                    <span v-if="deliveryOption === 'pickup'">Free</span>
                    <span v-else-if="deliveryOption === 'delivery'">Calculated at next step</span>
                    <span v-else>Enter shipping address</span>
                </div>

                <hr>

                <div class="d-flex justify-content-between total mb-1">
                    <span>Total</span>
                    <span class="text-muted small">USD</span>
                    <span>${{ subtotal }}</span>
                </div>
                <small class="text-muted d-block mb-4">Including tax</small>

            </div>

        </div>
    </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'

// Form State
const form = reactive({
    email: '',
    news: false,
    country: 'Cambodia',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    postal: '',
    city: '',
    location: '',
    save: false
})

// Delivery & Image State
const deliveryOption = ref('')
const locationLoading = ref(false)
const imagePreview = ref(null)

// Cart Data (kept for calculations)
const cart = reactive([
    { id: 1, name: 'PDM Althair', desc: 'Eau de Parfum', qty: 2, price: 12.95, image: 'https://via.placeholder.com/60 ' },
    { id: 2, name: 'Stronger With You Intensely', desc: 'Giorgio Armani', qty: 1, price: 6.95, image: 'https://via.placeholder.com/60 ' },
    { id: 3, name: 'Liquid Brun', desc: 'Maison Margiela', qty: 3, price: 6.95, image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.94713.jpg ' }
])

// Computed
const subtotal = computed(() =>
    cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2)
)

// Convert Decimal Degrees to DMS format (e.g., 11°33'07.3"N 104°54'58.8"E)
const convertToDMS = (dd, isLatitude) => {
    const dir = dd < 0 ? (isLatitude ? 'S' : 'W') : (isLatitude ? 'N' : 'E')
    const absDD = Math.abs(dd)
    const degrees = Math.floor(absDD)
    const minutesFloat = (absDD - degrees) * 60
    const minutes = Math.floor(minutesFloat)
    const seconds = (minutesFloat - minutes) * 60
    
    return `${degrees}°${minutes.toString().padStart(2, '0')}'${seconds.toFixed(1)}"${dir}`
}

// Methods
const detectLocation = () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser')
        return
    }

    locationLoading.value = true
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            
            const latDMS = convertToDMS(lat, true)
            const lngDMS = convertToDMS(lng, false)
            
            form.location = `${latDMS} ${lngDMS}`
            locationLoading.value = false
        },
        (error) => {
            alert('Unable to retrieve your location')
            locationLoading.value = false
        }
    )
}

const handleImage = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const removeImage = () => {
    imagePreview.value = null
}

const handleOrder = () => {
    // Validation
    if (!form.email || !form.address) {
        alert('Please fill in required fields')
        return
    }
    if (!deliveryOption.value) {
        alert('Please select a delivery method')
        return
    }
    if (!imagePreview.value) {
        alert('Please upload payment proof')
        return
    }

    console.log('Order placed:', {
        form,
        deliveryOption: deliveryOption.value,
        cart: cart,
        total: subtotal.value
    })
    alert('Order placed successfully!')
}
</script>

<style scoped>
/* ===== BASE ===== */
.checkout {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: #111;
}

.summary {
    background: #f6f6f7;
    border-left: 1px solid #e9e9e9;
}

/* ===== BACK LINK ===== */
.back-link {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
}

.back-link:hover {
    color: #111;
}

/* ===== INPUTS & FLOATING LABELS ===== */
.input {
    border-radius: 12px;
    border: 1px solid #dcdcdc;
    transition: all .18s ease;
    background: white;
    font-size: 14px;
}

.input:focus {
    border-color: #111;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, .06);
}

.field {
    position: relative;
}

.field input,
.field select {
    height: 54px;
    padding: 22px 14px 6px 14px;
    line-height: 1.2;
}

.field input::placeholder {
    color: transparent;
}

.field label {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #8a8a8a;
    font-size: 14px;
    transition: all .16s cubic-bezier(.4, 0, .2, 1);
    pointer-events: none;
    letter-spacing: .2px;
}

.field input:focus+label,
.field input:not(:placeholder-shown)+label,
.select-field select:focus+label,
.select-field select:not([value=""])+label {
    top: 7px;
    transform: none;
    font-size: 12px;
    color: #000;
}

.select-field select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg ' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
}

/* ===== LOCATION BUTTON ===== */
.location-btn {
    height: 54px;
    border-radius: 12px;
    font-size: 14px;
    white-space: nowrap;
}

/* ===== DELIVERY OPTIONS ===== */
.form-check-input:checked {
    background-color: #111;
    border-color: #111;
}

.form-check-label {
    font-size: 14px;
    cursor: pointer;
}

/* ===== IMAGE UPLOAD - FULL WIDTH ===== */
.upload-box {
    position: relative;
    border: 2px dashed #dcdcdc;
    border-radius: 12px;
    height: 120px;
    width: 100%;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
}

.upload-box:hover {
    border-color: #111;
}

.upload-box.has-image {
    border-style: solid;
    border-color: #111;
}

.file-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
}

.upload-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
}

.image-preview-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.image-preview-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.btn-remove {
    position: absolute;
    top: 8px;
    right: 8px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 3;
    color: #dc3545;
}

/* ===== CHECKBOX ===== */
.form-check {
    display: flex;
    align-items: center;
    gap: 10px;
}

.form-check-input {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    cursor: pointer;
}

.form-check-label {
    font-size: 14px;
    color: #333;
    cursor: pointer;
}

/* ===== BUTTON ===== */
.btn-dark {
    border-radius: 14px;
    font-weight: 600;
    letter-spacing: .3px;
    transition: all .18s ease;
}

.btn-dark:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, .15);
}

/* ===== TOTAL ===== */
.total {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: .2px;
    align-items: baseline;
}

.total span:nth-child(2) {
    margin-left: auto;
    margin-right: 8px;
    font-size: 12px;
}

/* ===== QR CODE ===== */
.qr-section {
    border: 1px solid #e9e9e9;
}

.qr-code {
    max-width: 200px;
    border-radius: 8px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 991px) {
    .summary {
        border-left: none;
        border-top: 1px solid #eee;
    }

    .location-btn {
        font-size: 12px;
        padding: 0 12px;
    }
}
</style>