<template>
  <main class="login-page">
    <div class="container">
      <div class="row align-items-center min-vh-100">

        <!-- Login Card -->
        <div class="col-12 col-lg-5 mx-auto">
          <div class="card login-card shadow-lg border-0">
            <div class="card-body p-5">

              <h2 class="text-center text-white fw-bold mb-4">
                Login
              </h2>

              <form @submit.prevent="handleLogin">

                <!-- Email -->
                <div class="mb-3">
                  <label class="custom-label">
                    <i class="bi bi-envelope"></i> Email
                  </label>
                  <input v-model="email" type="text" class="form-control"
                    placeholder="name@example.com">
                  <p v-if="err.email" class="text-danger pt-2">
                    {{ err.email }}
                  </p>
                </div>

                <!-- Password -->
                <div class="mb-3">
                  <label class="custom-label">
                    <i class="bi bi-lock"></i> Password
                  </label>

                  <div class="input-group position-relative">
                    <input v-model="password" :type="passwordType"
                      class="form-control pe-5"
                      placeholder="Enter your password" />

                    <span class="password-eye" @click="togglePassword">
                      <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
                    </span>
                  </div>

                  <p v-if="err.password" class="text-danger pt-2">
                    {{ err.password }}
                  </p>
                </div>

                <!-- Remember + Forgot -->
                <div class="d-flex justify-content-between mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox">
                    <label class="form-check-label text-white ms-2">
                      Remember me
                    </label>
                  </div>
                  <a href="#" class="forgot-link">
                    Forgot password?
                  </a>
                </div>

                <!-- Button -->
                <div class="d-grid">
                  <button :disabled="isLoading"
                    type="submit"
                    class="btn btn-primary btn-lg login-btn">

                    <span v-if="isLoading"
                      class="spinner-border spinner-border-sm">
                    </span>

                    <span v-else>
                      Sign In
                    </span>
                  </button>
                </div>

                <p class="text-center text-white mt-4">
                  Don't have an account?
                  <router-link to="/register" class="register-link">
                    Register
                  </router-link>
                </p>

              </form>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="col-lg-6 d-none d-lg-block">
          <img src="../../assets/image/3.png"
            class="login-image"
            alt="Login Image">
        </div>

      </div>
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
.login-page {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
}

/* Card */
.login-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 20px;
}

/* Labels */
.custom-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: white;
}

/* Inputs */
.form-control {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  transition: 0.3s;
}

.form-control:focus {
  border-color: #4facfe;
  box-shadow: 0 0 10px rgba(79, 172, 254, 0.4);
}

/* Eye icon */
.password-eye {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
}

/* Button */
.login-btn {
  border-radius: 12px;
  font-weight: 600;
  transition: 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
}

/* Links */
.forgot-link {
  color: #fff;
  font-size: 14px;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.register-link {
  color: #4facfe;
  font-weight: 600;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

/* Image */
.login-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
}
</style>