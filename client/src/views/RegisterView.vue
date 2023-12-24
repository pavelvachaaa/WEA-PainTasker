<script setup>
import Register from '@/components/Register.vue';
import { isLoggedIn } from "../utils/auth.util"
import { onMounted } from 'vue';
import router from '@/router';

onMounted(() => {
        if (isLoggedIn()) {
                router.push("/dashboard")
        }
})

</script>


<template>
        <Register></Register>
</template>