<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const logout = () => {
    store.dispatch("auth/logout")
}
const user = computed(() => store.getters["auth/getUser"])

</script>
<template>
    <header class="antialiased">
        <nav class="bg-white border-gray-200 px-4 lg:px-10 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center">
                <div class="flex justify-start items-center">

                    <a href="/dashboard" class="flex mr-4">
                        <img src="https://flowbite.s3.amazonaws.com/logo.svg" class="mr-3 h-8" alt="FlowBite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PainTasker</span>
                    </a>

                </div>
                <div class="flex items-center lg:order-2 ">
                    <img class="w-8 h-8 rounded-full invisible lg:visible" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo">
                    <div class="py-3 px-4">
                        <span class="block text-xs lg:text-sm font-semibold text-gray-900 dark:text-white">{{ user.name ?? "" }}</span>
                        <span class="block text-xs lg:text-sm text-gray-500 truncate dark:text-gray-400">{{ user.email ?? "" }}</span>
                    </div>
                    <button @click="logout"
                        class="text-white text-xs lg:text-sm end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Odhlásit
                        se</button>


                </div>
            </div>
        </nav>
    </header>
</template>
