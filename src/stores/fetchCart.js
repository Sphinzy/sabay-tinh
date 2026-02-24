import api from "@/api/http";
import { defineStore } from "pinia";


export const useCartStore = defineStore('cart',() => {
    async function fetchCart() {
        try {
            await api.get('/api/profile/carts')
        } catch (error) {
            console.error(error);
        }
    }


    return {fetchCart}
})