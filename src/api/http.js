<<<<<<< HEAD
import { useAuthStores } from "@/stores/auth";
import axios from "axios"

const api = axios.create({
    baseURL: 'https://ecommerce201.csm.linkpc.net',
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(config => {
    const auth = useAuthStores();
    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config;
})

export default api;
=======
h
>>>>>>> c35b084f6137604efc52c3ab9307636bfee8c9b3
