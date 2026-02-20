// import { useAuthStores } from "@/store/auth";
import axios from "axios";

let token = "106|vAWty45xz89K1eBofivbxrCEDNxbOanRFpWD66qX3a0ca70c";
const api = axios.create({
  baseURL: "https://ecommerce201.csm.linkpc.net",
});

// api.interceptors.request.use((config) => {
//   const auth = useAuthStores();
//   if (auth.token) {
//     config.headers.Authorization = `Bearer ${auth.token}`;
//   }

//   return config;
// });

export default api;
