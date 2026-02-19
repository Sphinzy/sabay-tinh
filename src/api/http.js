import { useAuthStores } from "@/stores/auth";
import axios from "axios"

const token = '';
const api = axios.create({
    baseURL: 'https://ecommerce201.csm.linkpc.net'
})

// api.interceptors.request.use(config => {
//     const auth = useAuthStores();
//     if (auth.token) {
//         config.headers.Authorization = `Bearer ${auth.token}`
//     }

//     return config;
// })


api.interceptors.request.use(config => {
    const auth = useAuthStores();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default api;