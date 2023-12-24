<script setup>
import Login from '@/components/Login.vue';
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
   <Login></Login>
</template>
 

