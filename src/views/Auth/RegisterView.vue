<template>
  <div style="height: 100vh;">
    <main class="bg-main">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <form @submit.prevent="handleRegister" class="bg-main">
              <h1 style="padding-top: 40px; padding-left: 10px;">Create an account</h1>

              <div class="row">

                <div class="col-12">
                  <label class="custom-label" style="color: white;">
                    <i class="bi bi-envelope"></i> Email
                  </label>
                  <input  v-model="form.email" type="text" placeholder="Enter your Email" class="form-control mt-1">
                  <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>
                </div>

                <div class="col-12">
                  <label class="custom-label" style="color: white;">
                    <i class="bi bi-person"></i> Name
                  </label>
                  <input v-model="form.name" type="text" placeholder="Enter your Name" class="form-control mt-1">
                  <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>
                </div>


                <div class="col-12">
                  <label class="custom-label" style="color: white;">
                    <i class="bi bi-lock"></i> Password
                  </label>
                  <input v-model="form.password" type="password" placeholder="Enter your Password"
                    class="form-control mt-1">
                  <p v-if="errors.password" class="text-danger">{{ errors.password }}</p>
                </div>

                <div class="col-12">
                  <label class="custom-label" style="color: white;">
                    <i class="bi bi-lock-fill"></i> Confirm Password
                  </label>
                  <input v-model="form.confirmPassword" type="password" placeholder="Enter your Confirm Password"
                    class="form-control mt-1">
                    <span class="password-eye" @click="togglePassword" >
                                                <i :class="showPassword ? 'bi bi-eye text-main' : 'bi bi-eye-slash text-main'"></i>
                                            </span>
                  <p v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</p>
                </div>

                <!-- Submit Button -->
                <div class="col-12 mt-3">
                  <button  :disabled="isLoading"  type="submit" class="btn btn-primary">  
                    <div v-if="isLoading" class="spinner-border spinner-border-sm fw-medium"
                                                role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                            <div v-else>
                                                Sign up
                                            </div></button>
                </div>

                <!-- Login Link -->
                <p class="text-center mt-4 mb-0">
                  Already have an account?
                  <RouterLink to="/login" class="text-decoration-none">Login</RouterLink>
                </p>

              </div>
            </form>
          </div>

          <div class="col-6">
            <div class="img">
              <img src="../../assets/image/2.png" alt="">
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
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

img{
    margin-top: 20px;
    width: 100%;
    height: 660px;
    object-fit: cover;
    margin-right: -80px;
}
.text-danger {
  color: #ff6b6b;
  font-size: 13px;
  margin-top: 4px;
}

h1 {
  font-weight: 600;
  color: white;
}

button {
  width: 100%;
  margin-top: 10px;
}

input {
  width: 100%;
  border-radius: 5px;

}

.col-12 {
  padding-left: 20px;
}

form {
  margin-top: 20px;
  border: 2px solid rgb(0, 64, 255);
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
input:hover {
  border-color: #100351d9;
  box-shadow: 0 4px 12px rgba(42, 116, 245, 0.3);
}
input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: all 0.3s ease;   /* important for smooth effect */
}

</style>