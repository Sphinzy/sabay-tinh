import api from "@/api/http";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";


export const useCartStore = defineStore('cart', () => {

    const carts = ref(null)
    const stallCarts = ref([])
    
    async function fetchCart() {
        try {
            const res = await api.get('/api/profile/carts')
            carts.value = res.data.data
            stallCarts.value = res.data.data;
            console.log(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function increment(product_id) {

        const formData = new FormData();
        formData.append("product_id", product_id);
        formData.append("qty", newQty);

        await api.post("/api/carts", formData);

        item.qty = newQty; // update local state
    }

    async function decrement(product_id) {
        const item = stallCarts.value.find(c => c.id === product_id);
        if (!item || item.qty <= 1) return;

        const newQty = item.qty - 1;

        const formData = new FormData();
        formData.append("product_id", product_id);
        formData.append("qty", newQty);

        await api.post("/api/carts", formData);

        item.qty = newQty;
    }

    async function removeItem(product_id) {

        await api.delete(`/api/carts/${product_id}`);
    }


    return {fetchCart, carts, stallCarts, increment, decrement, removeItem}
})