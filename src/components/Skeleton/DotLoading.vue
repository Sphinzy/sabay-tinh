<template>
    <div ref="container" class="lottie-wrapper"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import lottie from "lottie-web";
import animationData from "@/assets/animation/DotLoading.json";

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
    width: 300px;
    height: 300px;
    margin: auto;
}
</style>
