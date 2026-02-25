<template>
  <div class="seller-dashboard">
    <Navbar />

    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-lg-8">
          <h3 class="fw-bold mb-2">List an Item</h3>
          <p class="text-secondary fs-5">
          Please fill in your sales information here.
          
          </p>
        </div>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="row g-5">
          <div class="col-lg-5 col-xl-4">
            <div class="sticky-top" style="top: 100px">
              <div
                class="card border-0 shadow-sm rounded-4 overflow-hidden preview-card"
              >
                <div class="card-header bg-white py-3 px-4 border-0">
                  <h6 class="fw-bold mb-0">Product Image</h6>
                </div>

                <div class="card-body p-4">
                  <div class="upload" :class="{ active: imagePreview }">
                    <input
                      type="file"
                      @change="handleImage"
                      class="file-input"
                      accept="image/*"
                    />

                    <div v-if="!imagePreview" class="text-center py-5">
                      <div class="upload-icon mb-3">
                        <i class="bi bi-cloud-plus"></i>
                      </div>
                      <p class="fw-bold mb-1">Add Photo</p>
                    </div>

                    <div v-else class="image-wrapper">
                      <img
                        :src="imagePreview"
                        class="img-fluid rounded-3"
                        alt="Preview"
                      />
                      <button
                        type="button"
                        @click="removeImage"
                        class="btn-delete shadow"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>

                  <div class="listing-preview-mini mt-4 p-3 rounded-3 border">
                    <p class="text-uppercase x-small fw-bold text-muted mb-2">
                      Live Preview
                    </p>
                    <h5 class="fw-bold mb-1">
                      {{ form.title || "Product Title" }}
                    </h5>
                    <h4 class="text-sell fw-bold">
                      {{ form.price ? "$" + form.price : "$0.00" }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-7 col-xl-8">
            <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <section class="form-section mb-5">
                <div class="d-flex align-items-center mb-4">
                  <div class="section-num me-3">1</div>
                  <h5 class="fw-bold mb-0">Product Information</h5>
                </div>

                <div class="row g-4">
                  <div class="col-12">
                    <label class="form-label fw-semibold">Item Title</label>
                    <input
                      v-model="form.title"
                      type="text"
                      class="form-control form-control-lg custom-input"
                      placeholder=""
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Category</label>
                    <select
                      v-model="form.category_id"
                      class="form-select custom-input py-3"
                    >
                      <option value="" disabled>Select a category</option>
                      <option
                        v-for="cat in categories"
                        :key="cat.id"
                        :value="cat.id"
                      >
                        {{ cat.name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Asking Price</label>
                    <div class="input-group">
                      <span class="input-group-text bg-light border-0 px-3"
                        >$</span
                      >
                      <input
                        v-model="form.price"
                        type="number"
                        class="form-control form-control-lg custom-input"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section class="form-section mb-5">
                <div class="d-flex align-items-center mb-4">
                  <div class="section-num me-3">2</div>
                  <h5 class="fw-bold mb-0">Description </h5>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Description</label>
                  <textarea
                    v-model="form.description"
                    class="form-control custom-input"
                    rows="6"
                    placeholder="Describe your product..."
                  ></textarea>
                </div>
              </section>

              <div
                class="border-top pt-4 d-flex justify-content-between align-items-center"
              >
                <button
                  type="button"
                  @click="router.back()"
                  class="btn btn-link btn-outline-main text-muted text-decoration-none fw-semibold"
                >
                  Cancel 
                </button>
                <button
                  type="submit"
                  class="btn btn-sell px-5 py-3 rounded-pill fw-bold"
                  :disabled="loading"
                >
                  <span
                    v-if="loading"
                    class="spinner-border btn-main  spinner-border-sm me-2"
                  ></span>
                  <span v-else 
                    >Publish product <i class="bi bi-arrow-right ms-2"></i
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.text-sell {
   color: var(--bs-main)
}
.btn-sell {
  background: var(--bs-main);
  color: white;
  transition: 0.3s;
}
.btn-sell:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
}

.seller-dashboard {
  background-color: #f9fafb;
  min-height: 100vh;
}


.section-num {
  width: 32px;
  height: 32px;
  background: #e0e7ff;
  color: #4338ca;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
}


.upload {
  border: 2px dashed #d1d5db;
  border-radius: 20px;
  position: relative;
  transition: 0.3s;
  background: #fdfdfd;
}
.upload:hover {
  border-color: #4f46e5;
  background: #f5f3ff;
}
.upload.active {
  border-style: solid;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 5;
}

.upload-icon {
  font-size: 3rem;
  color: #6366f1;
  opacity: 0.6;
}

.image-wrapper {
  position: relative;
  padding: 10px;
}
.btn-delete {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  color: #ef4444;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 10px;
  z-index: 10;
}


.custom-input {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  background: #fcfcfc;
}
.custom-input:focus {
  background: white;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.x-small {
  font-size: 0.65rem;
  letter-spacing: 0.05em;
}
</style>
<script setup>
import Navbar from "@/components/layout/NavBar.vue";
import { ref, reactive, onMounted } from "vue";
import api from "@/api/http";
import { useRouter } from "vue-router";
import { notify } from "@/utils/toast";

const categories = ref([]);
const router = useRouter();
const loading = ref(false);
const imagePreview = ref(null);

const form = reactive({
  title: "",
  price: "",
  description: "",
  category_id: "",
  image: null,
});

const fetchCategories = async () => {
  try {
    const res = await api.get("api/categories");
    categories.value = res.data.data;
  } catch (error) {
    console.error("Fetch failed", error);
  }
};

onMounted(() => fetchCategories());

const handleImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  form.image = null;
  imagePreview.value = null;
};

const handleSubmit = async () => {
  if (!form.title || !form.price || !form.image || !form.category_id) {
    notify().error("Please complete all required fields!");
    return;
  }

  loading.value = true;
  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("price", String(form.price));
  formData.append("description", form.description || "No description");
  formData.append("category_ids", `[${form.category_id}]`);
  formData.append("condition", "New");
  formData.append("detail", form.description);
  formData.append("story", "No story");
  formData.append("image", form.image);

  try {
    await api.post("api/products", formData);
    notify().success("Product listed successfully!");
    router.push("/shop");
  } catch (error) {
    notify().error("Failed to post product");
  } finally {
    loading.value = false;
  }
};
</script>
