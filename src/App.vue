<template>
    <div>
        <NavBar></NavBar>
            <main>
                <router-view></router-view>
            </main>
        
    </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue';


</script>

<style scoped>

</style>