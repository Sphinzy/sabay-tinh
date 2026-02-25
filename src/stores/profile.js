import { defineStore } from "pinia"
import { ref } from "vue"
import api from "@/api/http"

export const useProfileStore = defineStore("profile", () => {
  const myProducts = ref([])
  const myCart = ref([])
  const myPayment = ref([])
  const myPurchased = ref([])
  const profile = ref({})

  const loadingProducts = ref(false)
  const loadingCart = ref(false)
  const loadingPayment = ref(false)
  const loadingPurchased = ref(false)

  const errorProducts = ref("")
  const errorCart = ref("")
  const errorPayment = ref("")
  const errorPurchased = ref("")

  // ✅ GET Own created product
  const fetchMyProducts = async () => {
    loadingProducts.value = true
    errorProducts.value = ""
    try {
      const res = await api.get("/profile/own-product")
      myProducts.value = res.data?.data ?? res.data ?? []
    } catch (err) {
      console.log(err)
      errorProducts.value =
        err?.response?.data?.message || err?.message || "Failed to load products"
    } finally {
      loadingProducts.value = false
    }
  }

  // ✅ GET Get my cart
  const fetchMyCart = async () => {
    loadingCart.value = true
    errorCart.value = ""
    try {
      const res = await api.get("/profile/cart")
      myCart.value = res.data?.data ?? res.data ?? []
    } catch (err) {
      console.log(err)
      errorCart.value =
        err?.response?.data?.message || err?.message || "Failed to load cart"
    } finally {
      loadingCart.value = false
    }
  }

  // ✅ GET Get my payment check
  const fetchMyPaymentCheck = async () => {
    loadingPayment.value = true
    errorPayment.value = ""
    try {
      const res = await api.get("/profile/payment-check")
      myPayment.value = res.data?.data ?? res.data ?? []
    } catch (err) {
      console.log(err)
      errorPayment.value =
        err?.response?.data?.message || err?.message || "Failed to load payment check"
    } finally {
      loadingPayment.value = false
    }
  }

  // ✅ GET Get my purchased product
  const fetchMyPurchased = async () => {
    loadingPurchased.value = true
    errorPurchased.value = ""
    try {
      const res = await api.get("/profile/purchased-product")
      myPurchased.value = res.data?.data ?? res.data ?? []
    } catch (err) {
      console.log(err)
      errorPurchased.value =
        err?.response?.data?.message || err?.message || "Failed to load purchased products"
    } finally {
      loadingPurchased.value = false
    }
  }

  const getProfile = async () => {
    const res = await api.get('/api/me')
    profile.value = res.data.data
    // console.log(profile.value);
  }

  return {
    myProducts,
    myCart,
    myPayment,
    myPurchased,
    loadingProducts,
    loadingCart,
    loadingPayment,
    loadingPurchased,
    errorProducts,
    errorCart,
    errorPayment,
    errorPurchased,
    fetchMyProducts,
    fetchMyCart,
    fetchMyPaymentCheck,
    fetchMyPurchased,
    getProfile,
    profile,
  }
})