import api from "@/api/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  let user = ref(null);
  let token = ref(localStorage.getItem("token"));
  let isLoggedIn = computed(() => !!token.value);
  
    async function login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    user.value = res.data.data.user;
    token.value = res.data.data.token;
    localStorage.setItem("token", token.value);
  }

   
  
  async function register(payload) {
   
    const res = await api.post("/auth/register", payload);
    return res.data;
  }





   return { user, token, isLoggedIn, login, register,  };
});
