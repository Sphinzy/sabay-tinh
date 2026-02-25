<template>
    <NavBar></NavBar>
    <div class="container mt-4">
        <router-link to="/cartcheck" class="text-main mb-3 d-inline-block">Back to Cart</router-link>
        <div class="row">
            <div class="col-lg-7">
                <div class="card border-0">
                    <div class="card-body">
                        <!-- Inputs and location button -->
                        <div class="d-flex gap-3 mb-3">
                            <input type="text" class="form-control w-50" v-model="address" placeholder="Address">
                            <input type="text" class="form-control w-50" v-model="location" placeholder="Location URL">
                            <button class="btn btn-main" @click="detectLocation">
                                {{ locationLoading ? 'Locating...' : 'Location' }}
                            </button>
                        </div>

                        <!-- Delivery Options -->
                        <div class="row">
                            <div class="col-7">
                                <div class="mt-3 d-flex align-items-center flex-row mb-3">
                                    <div class="form-check me-3">
                                        <input class="form-check-input" type="radio" name="deliveryOption" id="delivery"
                                            value="delivery" v-model="deliveryOption">
                                        <label class="form-check-label" for="delivery">Delivery</label>
                                    </div>

                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="deliveryOption" id="pickup"
                                            value="pickup" v-model="deliveryOption">
                                        <label class="form-check-label" for="pickup">Pick Up</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5">
                                <!-- Image Upload -->
                                <div class="upload" :class="{ active: imagePreview }">
                                    <input type="file" @change="handleImage" class="file-input" accept="image/*" />

                                    <div v-if="!imagePreview" class="text-center py-5">
                                        <div class="upload-icon mb-3">
                                            <i class="bi bi-cloud-plus fs-2"></i>
                                        </div>
                                        <p class="fw-bold mb-1">Add Photo</p>
                                    </div>

                                    <div v-else class="image-wrapper position-relative">
                                        <img :src="imagePreview" class="img-fluid rounded-3" alt="Preview" />
                                        <button type="button" @click="removeImage"
                                            class="btn-delete shadow position-absolute top-0 end-0 m-2 btn btn-danger btn-sm">
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-main mt-4" @click="handleOrder">Place Order</button>
                    </div>
                </div>
            </div>

            <!-- QR Code -->
            <div class="col-lg-5">
                <div class="card">
                    <div class="card-body text-center p-6">
                        <img src="https://www.avasam.com/wp-content/uploads/2019/10/qr-sample.png" class="img-card"
                            alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import NavBar from '@/components/layout/NavBar.vue';
import api from '@/api/http';
import { useRouter } from 'vue-router';
const router = useRouter();

const address = ref('');
const location = ref(''); // will store URL
const deliveryOption = ref('delivery');

const file = ref(null);
const imagePreview = ref('');
const locationLoading = ref(false);

const handleImage = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    file.value = selectedFile;
    const reader = new FileReader();
    reader.onload = e => {
        imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
};

const removeImage = () => {
    file.value = null;
    imagePreview.value = '';
};

// --------------------
// Real-time Location
// --------------------
const detectLocation = () => {
    if ('geolocation' in navigator) {
        locationLoading.value = true;
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                // 1️⃣ Get address using OpenStreetMap reverse geocoding
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
                    address.value = res.data.display_name;
                } catch (err) {
                    console.error('Failed to get address', err);
                }

                // 2️⃣ Set location input as a URL (OpenStreetMap link)
                location.value = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`;

                locationLoading.value = false;
            },
            (err) => {
                console.error('Permission denied or unable to get location.', err);
                locationLoading.value = false;
            },
            { enableHighAccuracy: true }
        );
    } else {
        console.error('Geolocation not supported by your browser.');
    }
};

const handleOrder = async () => {
    try {
        if (!file.value) {
            console.warn("No transaction file selected");
        }

        const formData = new FormData();

        // Append file properly
        if (file.value) formData.append('transaction_file', file.value);

        // Delivery option: true/false or 'delivery'/'pickup'
        formData.append('is_delivery', deliveryOption.value === 'delivery' ? 1 : 0);

        // Address and location URL
        formData.append('address', address.value);
        formData.append('google_map_url', location.value);

        // Send to API
        await api.post('/api/carts/checkout', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        router.push('/shop')
        console.log('Order placed successfully!');
    } catch (err) {
        console.error('Failed to place order', err);
    }
}

</script>

<style scoped>
.upload {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 1rem;
    position: relative;
    cursor: pointer;
}

.upload.active {
    border-color: #0d6efd;
}

.file-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    top: 0;
    left: 0;
}

.image-wrapper img {
    max-width: 200px;
    max-height: 200px;
}

.btn-delete {
    border-radius: 50%;
    padding: 0.25rem 0.4rem;
}
</style>