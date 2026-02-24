import { defineStore } from "pinia";
import api from "@/api/http";

import { ref } from "vue";
console.log(api);
export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  async function fetchProducts() {
    let res = await api.get("api/products?per_page=50");
    products.value = res.data.data;
    console.log(res);
    console.log(res.data.data);
  }

  return { fetchProducts, products };
});
