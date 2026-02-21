import api from "@/api/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";



export const useAuthStores = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('token'));
    const isLoggedIn = computed(() => !!token.value)
    // console.log(isLoggedIn);

    async function Login(email, password) {
        try {
            const res = await api.post('/api/login', { email, password });
            // if (!res.data.result) {
            //     throw new Error(res.data.message || 'Login failed')
            // }

            user.value = res.data.data.user;
            token.value = res.data.data.token;
            localStorage.setItem('token', token.value);

        } catch (error) {
            throw error.response
        }



    }
    async function Logout() {
        await api.delete('/api/logout');
        token.value = null;
        user.value = null;
        localStorage.removeItem('token')

    }

    async function Register(firstName, lastName, email, password, confirmPassword) {
        const res = await api.post('/api/register', { firstName, lastName, email, password, confirmPassword });
        // user.value = res.data.data;
        console.log(res);
    }

    // profile
    async function Profile() {
        // const getProfile = ref()
        const res = await api.get('/api/profile');
        console.log(res);
    }

    return { user, token, isLoggedIn, Login, Logout, Register, Profile }

})