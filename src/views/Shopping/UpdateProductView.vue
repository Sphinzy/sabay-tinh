<template>
  <div class="container py-5">
    <div class="card shadow-sm border-0 p-4 rounded-4">
      <h3 class="fw-bold text-main mb-4">Edit Your Product</h3>
      <form @submit.prevent="handleUpdate">
        <div class="row">
          <div class="col-md-4 mb-3 text-center">
            <img
              :src="imagePreview || form.oldImage"
              class="img-fluid rounded-4 mb-2 shadow-sm"
              style="max-height: 250px"
            />
            <input
              type="file"
              @change="onFileChange"
              class="form-control mt-2"
              accept="image/*"
            />
          </div>
          <div class="col-md-8">
            <div class="mb-3">
              <label class="form-label fw-bold">Title</label>
              <input
                v-model="form.title"
                type="text"
                class="form-control rounded-3"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Price ($)</label>
              <input
                v-model="form.price"
                type="number"
                class="form-control rounded-3"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Select Category</label>
              <select v-model="form.category_ids" class="form-select rounded-3">
                <option value="[]" disabled>Choose category</option>
                <option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="JSON.stringify([cat.id])"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Description</label>
              <textarea
                v-model="form.description"
                class="form-control rounded-3"
                rows="4"
              ></textarea>
            </div>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-light w-100 py-2 rounded-3">
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-main w-100 py-2 rounded-3 text-white"
                :disabled="loading"
              >
                {{ loading ? "Updating..." : "Save Changes" }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/http";
import { notify } from "@/utils/toast";
import { useAuthStores } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStores();
const toast = notify();

const loading = ref(false);
const imagePreview = ref(null);
const categories = ref([]);
const form = reactive({
  title: "",
  price: "",
  description: "",
  detail: "",
  condition: "",
  story: "",
  category_ids: "[]",
  image: null,
  oldImage: "",
});

const fetchProduct = async () => {
  try {
    const res = await api.get(`api/products/${route.params.id}`);
    const data = res.data.data;
    form.title = data.title;
    form.price = data.price;
    form.description = data.description;
    form.oldImage = data.image;
    form.detail = data.detail || form.detail;
    form.condition = data.condition || form.condition;
    form.story = data.story || form.story;
  } catch (e) {
    toast.error("Error loading product data");
  }
};
const fetchCategories = async () => {
  try {
    const res = await api.get("api/categories");
    categories.value = res.data.data;
  } catch (e) {
    console.error("មិនអាចទាញ Category បានទេ");
  }
};
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const handleUpdate = async () => {
  loading.value = true;

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("detail", form.detail);
  formData.append("condition", form.condition);
  formData.append("story", form.story);
  formData.append("price", form.price);
  formData.append("category_ids", form.category_ids);

  if (form.image) {
    formData.append("image", form.image);
  }

  try {
    await api.post(`api/products/${route.params.id}`, formData);

    toast.success("Product updated successfully!");
    router.push("/shop");
  } catch (e) {
    toast.error("Update failed. Please check your inputs.");
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchCategories();
  await fetchProduct();
});
</script>
