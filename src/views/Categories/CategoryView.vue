<template>
  <div>
    <NavBar></NavBar>
    <main class="admin-main pt-13">
      <div class="container shadow-card">
        <div class="header-flex">
          <div class="title-area">
            <div class="title-badge">Admin Panel</div>
            <h1>Product Categories</h1>
            <p>View store classifications</p>
          </div>

          <div class="action-area">
            <div class="input-wrapper">
              <span class="input-icon"><i class="bi bi-search"></i></span>
              <input
                v-model="newCategoryName"
                :disabled="isLoading"
                placeholder="Enter category name..."
                @keyup.enter="addCategory"
              />
              <button
                @click="addCategory"
                :disabled="isLoading"
                class="btn-create"
              >
                <span v-if="!isLoading">Create</span>
                <span v-else class="spinner-border width-hight-spin"></span>
              </button>
            </div>
          </div>
        </div>

        <hr class="divider" />

        <div class="table-responsive overflow-scroll"  style="height: 500px;">
          <table class="ecommerce-table ">
            <thead>
              <tr>
                <th width="80">ID</th>
                <th>Category Name</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in categories" :key="cat.id" class="table-row">
                <td class="id-cell">#{{ cat.id }}</td>
                <td class="name-cell">
                  <template v-if="editingId === cat.id">
                    <input
                      class="inline-edit-input"
                      v-model="editName"
                      @keyup.enter="updateCategory(cat)"
                      @keyup.escape="editingId = null"
                      autofocus
                    />
                  </template>
                  <template v-else>
                    <span class="cat-name ms-100">{{ cat.name }}</span>
                  </template>
                </td>
                <td class="text-right">
                  <div class="button-group">
                    <template v-if="editingId === cat.id">
                      <button class="btn btn-save" @click="updateCategory(cat)">
                        <i class="bi bi-check-lg"></i> Save
                      </button>
                      <button class="btn btn-cancel" @click="editingId = null">
                        <i class="bi bi-x-lg"></i>
                      </button>
                    </template>
                    <template v-else class="icon-delete-update">
                      <button
                        class="btn btn-outline-primary"
                        @click="startEdit(cat)"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        @click="deleteCategory(cat.id)"
                        class="btn-delete btn"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </template>
                  </div>
                </td>
              </tr>
              <tr v-if="categories.length === 0">
                <td colspan="3" class="empty-state">
                  <div class="empty-icon">🗂️</div>
                  <p>No categories yet. Create one above!</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <span class="count-badge">{{ categories.length }} categories</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import "@/assets/style.css";
import NavBar from "@/components/layout/NavBar.vue";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toast-notification";
import api from "@/api/http";
import { notify } from "@/utils/toast";

const notifier = notify();
const categories = ref([]);
const newCategoryName = ref("");
const isLoading = ref(false);
const editingId = ref(null);
const editName = ref("");

// ========== get ==================
const fetchCategories = async () => {
  try {
    const res = await api.get("/api/categories");
    categories.value = res.data.data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

// ======== add ====================
const addCategory = async () => {
  if (!newCategoryName.value.trim()) return;

  isLoading.value = true;
  try {
    const res = await api.post("/api/categories", {
      name: newCategoryName.value,
    });

    const newCat = res.data.data;
    categories.value.unshift(newCat);
    newCategoryName.value = "";
  } catch (error) {
    console.error("Create Error:", error);
    alert("Check API URL correct");
  } finally {
    isLoading.value = false;
  }
};

//  ============== Detete ==============
const deleteCategory = async (id) => {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    console.log("Deleting ID:", id);
    await api.delete(`/api/categories/${id}`);
    categories.value = categories.value.filter((cat) => cat.id !== id);
  } catch (error) {
    console.error("Delete Error Detail:", error.response?.data || error);
  }
};

// ========= Update =======================
const startEdit = (cat) => {
  editingId.value = cat.id;
  editName.value = cat.name;
};
const updateCategory = async (cat) => {
  if (!editName.value.trim()) return;
  const token = localStorage.getItem("token");
  try {
    const res = await api.put(
      `/api/categories/${cat.id}`,
      { name: editName.value },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const updatedCat = res.data.data;
    cat.name = updatedCat.name;
    editingId.value = null;
  } catch (error) {
    console.error("Update Error:", error.response?.data);
    alert("Can't update");
  }
};

onMounted(fetchCategories);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

/* ── Layout ── */
.admin-main {
  padding: 48px 40px;
  background: #f0f2f8;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

.shadow-card {
  background: #ffffff;
  padding: 36px 32px 24px;
  border-radius: 20px;
  box-shadow:
    0 0 0 1px rgba(99, 102, 241, 0.06),
    0 8px 40px rgba(99, 102, 241, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.04);
  max-width: 900px;
  margin: 0 auto;
}

/* ── Header ── */
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 20px;
}

.title-badge {
  display: inline-block;
  font-family: "Poppins", sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.title-area h1 {
  font-family: "Poppins", sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #1a1d2e;
  margin: 0 0 4px;
  letter-spacing: -0.5px;
}

.title-area p {
  color: #8b92a8;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
}

/* ── Input + Create ── */
.width-hight-spin {
  width: 15px !important;
  height: 15px !important;
}
.input-wrapper {
  display: flex;
  align-items: stretch;
  background: #f8f9ff;
  border: 1.5px solid #e0e3f5;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
  height: 46px;
}

.input-wrapper:focus-within {
  border-color: #6366f1;
}

.input-icon {
  display: flex;
  align-items: center;
  padding-left: 14px;
  color: #a0a8c8;
}

.input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  padding: 0 12px;
  font-size: 14px;
  color: #1a1d2e;
  height: 100%;
}

.btn-create {
  background: linear-gradient(135deg, #6366f1, #818cf8);
  color: white;
  border: none;
  padding: 0 24px;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  height: 100%;
  transition:
    opacity 0.2s,
    background 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.btn-create:hover {
  opacity: 0.9;
}

.btn-create:active {
  background: #4f46e5;
}

/* .btn-create:hover:not(:disabled) {
  opacity: 0.88;
  transform: translateY(-1px);
}

.btn-create:disabled {
  opacity: 0.55;
  cursor: not-allowed;
} */

/* ── Spinner ── */
/* .spinner {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
} */

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Divider ── */
.divider {
  border: none;
  border-top: 1.5px solid #f0f2f8;
  margin: 0 0 24px;
}

/* ── Table ── */
.table-responsive {
  overflow-x: auto;
}

.ecommerce-table {
  width: 100%;
  border-collapse: collapse;
}

.ecommerce-table thead tr {
  background: #f8f9ff;
  border-radius: 10px;
}

.ecommerce-table th {
  font-family: "Syne", sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #8b92a8;
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1.5px solid #ebebf5;
}
.table-row {
  transition: background 0.15s;
}

.table-row:hover {
  background: #fafaff;
}

.table-row td {
  padding: 14px 16px;
  border-bottom: 1px solid #f0f2f8;
  vertical-align: middle;
  text-align: center;
}

.id-cell {
  color: #6366f1;
  font-weight: 700;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
}

.cat-name {
  font-size: 14.5px;
  color: #2d3050;
  font-weight: 500;
}

/* ── Inline Edit Input ── */
.inline-edit-input {
  border: 1.5px solid #6366f1;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  color: #1a1d2e;
  background: #f8f9ff;
  outline: none;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  transition: box-shadow 0.2s;
}

/* ── Action Buttons ── */
.button-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
}

.btn {
  border-radius: 8px;
  padding: 7px 12px;
  cursor: pointer;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  transition: all 0.18s;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.btn-outline-primary {
  background: #f0f2ff;
  border: 1.5px solid #c7caef;
  color: #6366f1;
}

.btn-outline-primary:hover {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

.btn-delete {
  background: #fff5f5;
  border: 1.5px solid #fecaca;
  color: #ef4444;
}

.btn-delete:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}

.btn-save {
  background: linear-gradient(135deg, #10b981, #34d399);
  border: none;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.btn-save:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.btn-cancel {
  background: #f8f9ff;
  border: 1.5px solid #e0e3f5;
  color: #8b92a8;
}

.btn-cancel:hover {
  background: #e0e3f5;
  color: #555;
}

/* ── Empty State ── */
.empty-state {
  text-align: center;
  padding: 48px !important;
  color: #a0a8c8;
}

.empty-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

/* ── Footer ── */
.table-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.count-badge {
  font-size: 12px;
  font-weight: 600;
  color: #8b92a8;
  background: #f0f2f8;
  padding: 4px 12px;
  border-radius: 20px;
  font-family: "Syne", sans-serif;
  letter-spacing: 0.5px;
}

.text-right {
  text-align: right;
}
</style>
