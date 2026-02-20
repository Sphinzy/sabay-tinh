<template>
  <h1>Check Console</h1>
</template>

<script setup>
import { onMounted } from "vue";
import api from "@/api/http";

onMounted(async () => {
  try {
    const res = await api.post("/api/carts");
    console.log(res.data.data);
  } catch (error) {
    console.log("Error:", error);
  }
});
</script>
