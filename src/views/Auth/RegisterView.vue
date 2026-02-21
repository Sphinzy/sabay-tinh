<template >
  <div>
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
                  <input v-model="form.email" type="text" placeholder="Enter your Email" class="form-control mt-1">
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
import "@/assets/style.css";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStores } from "@/stores/auth";
import { isEmail, isPassword } from "@/utils/validate";
import { notify } from '@/utils/toast';

const router = useRouter();
const auth = useAuthStores();
const notifier = notify(router)

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

  // Email
  if (!form.value.email) {
    errors.value.email = "Email is required";
  } else {
    const emailError = isEmail(form.value.email);
    if (emailError) errors.value.email = emailError;
  }

  // Name
  if (!form.value.name) {
    errors.value.name = "Name is required";
  }

  // Password
  if (!form.value.password) {
    errors.value.password = "Password is required";
  } else {
    const passError = isPassword(form.value.password);
    if (passError) errors.value.password = passError;
  }

  // Confirm Password
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = "Confirm Password is required";
  } else if (form.value.confirmPassword !== form.value.password) {
    errors.value.confirmPassword = "Passwords do not match";
  }

  return Object.keys(errors.value).length === 0;
}

async function handleRegister() {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await auth.Register(form.value);

    notifier.success("Register successfully", "/login");

    form.value = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    };

  } catch (err) {
    const message =
      err.response?.data?.message || "Registration failed";

    notifier.error(message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>

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
</style>