<template>
    <div>
        <NavBar :cartCount="carts?.items?.length || 0"></NavBar>
        <main>
            <section>
                <div class="container">
                    <h3>All product</h3>

                    <div class="row g-3">
                        <div class="col-4" v-for="prodcut in products" :key="prodcut.id">
                            <div class="card">
                                <div class="card-body">
                                    <img :src="prodcut.image" height="300px" class="card-img object-fit-cover" alt="">
                                    <h4>{{ prodcut.title }}</h4>
                                    <p>{{ prodcut.description }}</p>
                                    <div class="d-flex justify-content-between">
                                        <span>{{ prodcut.price }}</span>
                                        <button class="btn btn-main" @click="btnAddToCart(prodcut.id)"><i
                                                class="bi bi-cart3"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import api from '@/api/http'
import NavBar from '@/components/layout/NavBar.vue'
import { onMounted, ref } from 'vue'

const products = ref([])
const carts = ref(null)
const qty = ref(1)

const fetchProducts = async () => {
    const res = await api.get(`/api/products?page=1&per_page=20&search=`)
    products.value = res.data.data
}

const fetchCart = async () => {
    const res = await api.get('/api/profile/carts')
    carts.value = res.data.data
}

const btnAddToCart = async (id) => {
    const formData = new FormData()
    formData.append('product_id', id)
    formData.append('qty', qty.value)

    await api.post(`/api/carts`, formData)

    fetchCart()
}

onMounted(() => {
    fetchProducts()
    fetchCart()
})
</script>

<style scoped></style>