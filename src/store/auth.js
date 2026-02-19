import api from "@/api/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  let user = ref(null);
  let token = ref(localStorage.getItem("token"));
  let isLoggedIn = computed(() => !!token.value);










   return { user, token, isLoggedIn, login, register, logout, };
});
