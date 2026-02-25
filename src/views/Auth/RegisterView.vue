<template>
  <main class="register-page">
    <div class="container">
      <div class="row align-items-center min-vh-100">
        <!-- FORM -->
        <div class="col-12 col-lg-5 mx-auto">
          <div class="card register-card shadow-lg border-0">
            <div class="card-body p-5">
              <h2 class="text-center text-white fw-bold mb-4">Create Account</h2>

              <form @submit.prevent="handleRegister">
                <!-- Email -->
                <div class="mb-3">
                  <label class="custom-label">
                    <i class="bi bi-envelope"></i> Email
                  </label>
                  <input
                    v-model="form.email"
                    type="text"
                    class="form-control"
                    placeholder="Enter your email"
                  />
                  <p v-if="errors.email" class="text-danger">
                    {{ errors.email }}
                  </p>
                </div>

                <!-- Name -->
                <div class="mb-3">
                  <label class="custom-label"> <i class="bi bi-person"></i> Name </label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    placeholder="Enter your name"
                  />
                  <p v-if="errors.name" class="text-danger">
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Password -->
                <div class="mb-3 position-relative">
                  <label class="custom-label">
                    <i class="bi bi-lock"></i> Password
                  </label>

                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Enter your password"
                  />

                  <span class="password-eye" @click="togglePassword">
                    <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
                  </span>

                  <p v-if="errors.password" class="text-danger">
                    {{ errors.password }}
                  </p>
                </div>

                <!-- Confirm Password -->
                <div class="mb-3 position-relative">
                  <label class="custom-label">
                    <i class="bi bi-lock-fill"></i> Confirm Password
                  </label>

                  <input
                    v-model="form.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Confirm your password"
                  />

                  <span class="password-eye" @click="toggleConfirmPassword">
                    <i :class="showConfirmPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
                  </span>

                  <p v-if="errors.confirmPassword" class="text-danger">
                    {{ errors.confirmPassword }}
                  </p>
                </div>

                <!-- Button -->
                <div class="d-grid mt-3">
                  <button
                    :disabled="isLoading"
                    type="submit"
                    class="btn btn-primary btn-lg register-btn"
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm">
                    </span>

                    <span v-else> Sign Up </span>
                  </button>
                </div>

                <p class="text-center text-white mt-4">
                  Already have an account?
                  <RouterLink to="/login" class="login-link"> Login </RouterLink>
                </p>
              </form>
            </div>
          </div>
        </div>

        <!-- IMAGE -->
        <div class="col-lg-6 d-none d-lg-block">
          <img src="../../assets/image/2.png" class="register-image" alt="Register" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStores } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStores();

const isLoading = ref(false);

const form = ref({
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const errors = ref({});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

function validateForm() {
  errors.value = {};

  if (!form.value.email) errors.value.email = "Email is required";
  if (!form.value.name) errors.value.name = "Name is required";
  if (!form.value.password) errors.value.password = "Password is required";
  if (form.value.password !== form.value.confirmPassword)
    errors.value.confirmPassword = "Passwords do not match";

  return Object.keys(errors.value).length === 0;
}

async function handleRegister() {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await auth.Register({
      email: form.value.email,
      name: form.value.name,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
    });

    alert("Register success");
    router.push("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Register failed");
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.register-page {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
}

.register-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 20px;
}

.custom-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: white;
}

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

.text-danger {
  color: #ff6b6b;
  font-size: 13px;
  margin-top: 4px;
}

.password-eye {
  position: absolute;
  right: 15px;
  top: 40px;
  cursor: pointer;
  color: #555;
  z-index: 10;
}

.register-btn {
  border-radius: 12px;
  font-weight: 600;
  transition: 0.3s;
}

.register-btn:hover {
  transform: translateY(-2px);
}

.login-link {
  color: #4facfe;
  font-weight: 600;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

.register-image {
  width: 100%;
  border-radius: 20px;
}
</style>
