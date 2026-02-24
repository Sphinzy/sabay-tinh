<template>
    <div class="checkout container">
        <div class="row min-vh-100">

            <!-- LEFT SIDE -->
            <div class="col-lg-7 col-12 p-5 bg-white">
                <h3 class="mb-4">Contact</h3>

                <!-- Email -->
                <div class="field mb-3">
                    <input v-model="form.email" type="email" class="form-control input" placeholder=" ">
                    <label>Email</label>
                </div>

                <div class="form-check mb-4 d-flex align-items-center">
                    <input class="form-check-input me-2" type="checkbox" v-model="form.news">
                    <label class="form-check-label">Remember me</label>
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

                <!-- Name -->
                <div class="row mb-3">
                    <div class="col">
                        <div class="field">
                            <input class="form-control input" v-model="form.firstName" placeholder=" ">
                            <label>First name (optional)</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="field">
                            <input class="form-control input" v-model="form.lastName" placeholder=" ">
                            <label>Last name</label>
                        </div>
                    </div>
                </div>

                <!-- Address -->
                <div class="field mb-3">
                    <input class="form-control input" v-model="form.address" placeholder=" ">
                    <label>Address</label>
                </div>

                <!-- Apartment -->
                <div class="field mb-3">
                    <input class="form-control input" v-model="form.apartment" placeholder=" ">
                    <label>Apartment, suite, etc. (optional)</label>
                </div>

                <!-- Postal & City -->
                <div class="row mb-3">
                    <div class="col">
                        <div class="field">
                            <input class="form-control input" v-model="form.postal" placeholder=" ">
                            <label>Postal code</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="field">
                            <input class="form-control input" v-model="form.city" placeholder=" ">
                            <label>City</label>
                        </div>
                    </div>
                </div>

                <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" v-model="form.save">
                    <label class="form-check-label">Save this information for next time</label>
                </div>

                <button class="btn btn-dark w-100 py-3">Continue to shipping</button>
            </div>


            <!-- RIGHT SIDE ORDER SUMMARY -->
            <div class="col-lg-5 col-12 summary p-5">

                <div v-for="item in cart" :key="item.id" class="cart-item d-flex align-items-center mb-4">
                    <div class="product-img-wrapper">
                        <img :src="item.image" class="product-img object-fit-contain">
                        <span class="quantity-badge">{{ item.qty || 1 }}</span>
                    </div>
                    <div class="ms-3 flex-grow-1">
                        <div class="fw-semibold">{{ item.name }}</div>
                        <small class="text-muted">{{ item.desc }}</small>
                    </div>
                    <div class="price">${{ item.price }}</div>
                </div>

                <div class="d-flex mb-4">
                    <div class="field flex-grow-1 me-2">
                        <input class="form-control input" placeholder=" ">
                        <label>Discount code</label>
                    </div>
                    <button class="btn btn-outline-secondary">Apply</button>
                </div>

                <hr>

                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal · {{ cart.length }} items</span>
                    <span>${{ subtotal }}</span>
                </div>

                <div class="d-flex justify-content-between mb-2 text-muted">
                    <span>Shipping</span>
                    <span>Enter shipping address</span>
                </div>

                <hr>

                <div class="d-flex justify-content-between total">
                    <span>Total</span>
                    <span>${{ subtotal }}</span>
                </div>

                <small class="text-muted">Including tax</small>
            </div>

        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

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
    save: false
})

const cart = reactive([
    { id: 1, name: 'PDM Althair', desc: '', qty: 2, price: 12.95, image: 'https://via.placeholder.com/60 ' },
    { id: 2, name: 'Stronger With You Intensely', desc: '', qty: 1, price: 6.95, image: 'https://via.placeholder.com/60 ' },
    { id: 3, name: 'Liquid Brun', desc: '', qty: 3, price: 6.95, image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.94713.jpg' }
])

const subtotal = computed(() =>
    cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
)
</script>

<style scoped>
/* ===== GENERAL ===== */
.checkout {
    font-family: Inter, system-ui, Arial;
    color: #111;
}

.summary {
    background: #f6f6f7;
}

hr {
    opacity: .08;
}

/* ===== INPUT BASE ===== */
.input {
    border-radius: 12px;
    border: 1px solid #dcdcdc;
    transition: all .18s ease;
    background: white;
}

/* focus look */
.input:focus {
    border-color: #111;
    box-shadow: 0 0 0 3px rgba(0,0,0,.06);
}

.form-control:focus,
.form-select:focus {
    box-shadow: none;
}

/* ===== FLOATING FIELD ===== */
.field {
    position: relative;
}

/* input spacing */
.field input,
.field select {
    height: 54px;
    padding: 22px 14px 6px 14px;
    line-height: 1.2;
}

/* hide placeholder text */
.field input::placeholder {
    color: transparent;
}

/* LABEL */
.field label {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #8a8a8a;
    font-size: 14px;
    transition: all .16s cubic-bezier(.4,0,.2,1);
    pointer-events: none;
    letter-spacing: .2px;
}

/* FLOAT EFFECT */
.field input:focus + label,
.field input:not(:placeholder-shown) + label,
.select-field select:focus + label,
.select-field select:not([value=""]) + label {
    top: 7px;
    transform: none;
    font-size: 12px;
    color: #000;
}

/* ===== SELECT FIX ===== */
.select-field select {
    appearance: none;
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
    box-shadow: 0 6px 14px rgba(0,0,0,.15);
}

/* ===== CART ===== */
.product-img-wrapper {
    position: relative;
    display: inline-block;
}

.product-img {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    object-fit: cover;
    border: 1px solid #e9e9e9;
    background: white;
}

.quantity-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #111;
    color: white;
    font-size: 11px;
    font-weight: 600;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #f6f6f7;
}

.cart-item {
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(0,0,0,.04);
}

.price {
    font-weight: 600;
}

/* ===== TOTAL ===== */
.total {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: .2px;
}

/* ===== DISCOUNT INPUT ===== */
.summary .field input {
    background: #fff;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 991px) {
    .summary {
        border-top: 1px solid #eee;
    }
}
</style>