<template>
    <div style="width: 100vw; height: 100vh;">
        <div ref="container" class="lottie-wrapper"></div>
        <div class="w-100 d-flex justify-content-center flex-column">
            <h3 class="text-center display-5 fw-bold">Page not found</h3>
            <p class="text-center text-muted">Oops! The page you're looking for doesn't exist.</p>
            <div class="w-100 text-center">
            <router-link to="/" class="text-center btn btn-main"><i class="bi bi-arrow-left-short me-2"></i>back to home page</router-link>

            </div>
        </div>
    </div> 
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import lottie from "lottie-web";
import animationData from "@/assets/animation/404NotFound.json";

const container = ref(null);
let animationInstance = null;

onMounted(() => {
    animationInstance = lottie.loadAnimation({
        container: container.value,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
    });
});

onBeforeUnmount(() => {
    if (animationInstance) {
        animationInstance.destroy();
    }
});
</script>

<style scoped>
.lottie-wrapper {
    width: 500px;
    height: 500px;
    margin: auto;
}
</style>
