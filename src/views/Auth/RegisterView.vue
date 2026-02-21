<template>
  <main class="bg-main">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <form @submit.prevent="handleRegister">
            <h2 class="text-white mb-3">Create Account</h2>

            <!-- Email -->
            <div class="mb-3">
              <label class="text-white">Email</label>
              <input v-model="form.email" type="text" class="form-control" />
              <small class="text-danger">{{ errors.email }}</small>
            </div>

            <!-- Name -->
            <div class="mb-3">
              <label class="text-white">Name</label>
              <input v-model="form.name" type="text" class="form-control" />
              <small class="text-danger">{{ errors.name }}</small>
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label class="text-white">Password</label>
              <input
                v-model="form.password"
                type="password"
                class="form-control"
              />
              <small class="text-danger">{{ errors.password }}</small>
            </div>

            <!-- Confirm -->
            <div class="mb-3">
              <label class="text-white">Confirm Password</label>
              <input
                v-model="form.confirmPassword"
                type="password"
                class="form-control"
              />
              <small class="text-danger">{{ errors.confirmPassword }}</small>
            </div>

            <button :disabled="isLoading" class="btn btn-primary w-100">
              <span
                v-if="isLoading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span v-else>Register</span>
            </button>

            <p class="text-center mt-3">
              Already have account?
              <RouterLink to="/login">Login</RouterLink>
            </p>
          </form>
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