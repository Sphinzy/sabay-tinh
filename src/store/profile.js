import { defineStore } from "pinia"
import { ref } from "vue"
import api from "@/api/http"

export const useProfileStore = defineStore("profile", () => {
  const profile = ref(null)
  const loading = ref(false)
})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api