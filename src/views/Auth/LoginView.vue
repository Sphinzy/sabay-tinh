<template>
   <main class="bg-main" style="height: 100vh;">
      <div class="container">
        <section class="vh-100 d-flex align-items-center justify-content-center  ">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-5 " style="margin-top: 200px;">
                        <div class="card shadow-sm border-0 bg-main ">
                            <div class="card-body p-5" style="  border: 2px solid rgb(0, 64, 255);">
                                <h2 class="fw-bold mb-4 text-center " style="color: white;">Login</h2>

                                <form @submit.prevent="handleLogin" class="bg-main ">
                                    <div class="mb-3">
                                        <label for="emailInput"  class="custom-label" style="color: white;">  <i class="bi bi-envelope"></i> Email address</label>
                                        <input v-model="email" type="text" class="form-control" id="emailInput"
                                            placeholder="name@example.com">
                                        <p v-if="err.email" class="text-danger pt-2">{{ err.email }}</p>
                                    </div>

                                    <div class="mb-3">
                                        <label for="passwordInput" class="custom-label" style="color: white;"><i class="bi bi-lock"></i> Password</label>

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
                                            <label class="form-check-label" for="rememberMe" style="color: white; padding-left: 10px;"> Remember me</label>
                                        </div>
                                        <a href="#" class="text-decoration-none small">Forgot password?</a>
                                        
                                         
                                    </div>
                                    <div class="d-flex   " style="text-align: center; justify-content: center; ">
                                          <a href="https://www.facebook.com/"><i class="bi bi-facebook" style="font-size: 30px; font-weight: 20px; " ></i> </a>
                                           <a href="https://www.instagram.com/"><i class="bi bi-instagram"style="font-size: 30px; font-weight: 20px; padding-left: 10px;" ></i></a>
                                           <a href="https://www.google.com/"><i class="bi bi-google" style="font-size: 30px; font-weight: 20px; padding-left: 10px;"></i></a>
                                    </div>

                                    <div class="d-grid">
                                        <button :disabled="isLoading" type="submit" class="btn btn btn-primary btn-lg">

                                            <div v-if="isLoading" class="spinner-border spinner-border-sm fw-medium"
                                                role="status">
                                                <span class="visually-hidden">Loading...</span>
                                               
                                            </div>
                                            
                                            <div v-else>
                                                Sign In
                                            </div>
                                        </button>
                                    </div>

                                    <p class="text-center mt-4 mb-0" style="color: white;">Don't have an account? <router-link
                                            to="/register">Sign In</router-link> </p>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-8 col-lg-5 " style="margin-top: 200px;">
                         <div class="img">
                            <img src="../../assets/image/3.png" alt="">
                         </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
   </main>
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

form {
  margin-top: 20px;
  /* border: 2px solid rgb(0, 64, 255); */
  width: 100%;
  max-width: 500px;
  background-color: rgb(92, 92, 92);
  padding: 20px;
}
.custom-label {
  display: inline-block;
  margin-top: 14px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 4px 10px;
  border-left: 3px solid #63ff85;
  border-radius: 4px;
}


.custom-label i {
  color: #e6e6eb;
  margin-right: 5px;
}
.form-control:hover{
    box-shadow: #000;
}
.bg{
background: linear-gradient(0deg,rgba(54, 141, 143, 1) 23%, rgba(91, 89, 189, 1) 100%, rgba(247, 180, 35, 1) 54%);
height: 125vh;
}
input:hover {
  border-color: #2a74f5;
  box-shadow: 0 4px 12px rgba(42, 116, 245, 0.3);
}
input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: all 0.3s ease;   /* important for smooth effect */
}

img{
    margin-top: 20px;
    width: 100%;
    height: 660px;
    object-fit: cover;
    margin-right: -80px;
}
</style>