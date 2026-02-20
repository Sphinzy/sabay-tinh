<template>
    <div class="container">
        <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-5">
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-5">
                                <h2 class="fw-bold mb-4 text-center">Login</h2>

                                <form @submit.prevent="handleLogin">
                                    <div class="mb-3">
                                        <label for="emailInput" class="form-label">Email address</label>
                                        <input v-model="email" type="text" class="form-control" id="emailInput"
                                            placeholder="name@example.com">
                                        <p v-if="err.email" class="text-danger pt-2">{{ err.email }}</p>
                                    </div>

                                    <div class="mb-3">
                                        <label for="passwordInput" class="form-label">Password</label>

                                        <div class="input-group position-relative">
                                            <input v-model="password" :type="passwordType" class="form-control pe-5 rounded"
                                                id="passwordInput" placeholder="Enter your password" />

                                            <span class="password-eye" @click="togglePassword">
                                                <i :class="showPassword ? 'bi bi-eye text-main' : 'bi bi-eye-slash text-main'"></i>
                                            </span>
                                        </div>


                                        <p v-if="err.password" class="text-danger pt-2">
                                            {{ err.password }}
                                        </p>
                                    </div>


                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">Remember me</label>
                                        </div>
                                        <a href="#" class="text-decoration-none small">Forgot password?</a>
                                    </div>

                                    <div class="d-grid">
                                        <button :disabled="isLoading" type="submit" class="btn btn-main btn-lg">

                                            <div v-if="isLoading" class="spinner-border spinner-border-sm fw-medium"
                                                role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                            <div v-else>
                                                Sign In
                                            </div>
                                        </button>
                                    </div>

                                    <p class="text-center mt-4 mb-0">Don't have an account? <router-link
                                            to="/register">Sign In</router-link> </p>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

import { useAuthStores } from '@/stores/auth';
import { notify } from '@/utils/toast';
import { isEmail, isPassword, required, validate } from '@/utils/validate';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

// import { Toast } from 'primevue';
// import { useToast } from 'primevue'
let toast = useToast();

const router = useRouter()
const notifier = notify(router)

let email = ref('');
let password = ref('');
let auth = useAuthStores();
console.log(auth);

let err = reactive({
    email: '',
    password: ''
})

let isLoading = ref(false)


function validator() {
    err.email = validate(email.value, [
        (v) => required(v, 'Email is require'),
        (v) => isEmail(v, 'Email is not format')
    ]);
    err.password = required(password.value, "Password is require")


    return !err.email && !err.password;
}


async function handleLogin() {
    if (!validator()) return;

    isLoading.value = true;

    try {
        await auth.Login(email.value, password.value);
        notifier.success("Login Successfully", '/')
    } catch (err) {
        // console.log(`catch`);
        notifier.error('Login Failed!!')
    } finally {
        isLoading.value = false;
    }
}

const showPassword = ref(false);

const passwordType = computed(() => {
    return showPassword.value ? 'text' : 'password';
});

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};


</script>
<style scoped>
.password-eye {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6c757d;
    z-index: 5;
}

.password-eye:hover {
    color: #000;
}
</style>