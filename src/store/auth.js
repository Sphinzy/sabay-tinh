export const useAuthStores = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null
  }),

  actions: {
    login(data) {
      this.token = data.token
      localStorage.setItem("token", data.token)
    },

    logout() {
      this.token = null
      localStorage.removeItem("token")
    }
  }
})
