import axios from "axios"
import { useAuthStores } from "@/stores/auth";
const api = axios.create({
    baseURL: 'https://ecommerce201.csm.linkpc.net'
})

api.interceptors.request.use(config => {
    const auth = useAuthStores();
    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config;
})

export default api;