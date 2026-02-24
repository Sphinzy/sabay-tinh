import api from "@/api/http";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useOwnProducts = defineStore('own', () => {
    const ownProducts = ref({})
    
    const fetchOwnProduct = async () => {
        const res = await api.get(`/api/profile/products`)
        ownProducts.value = res.data.data;
        console.log(ownProducts);
    }

    return {fetchOwnProduct, ownProducts}
})