<template>
    <div class="flex  flex-col justify-center  items-center py-20">
        <a href="#" @click="tokenCopy" class="text-white text-xs hover:text-blue-800 w-3/4 lg:w-1/2  pb-4">Copy Bearer
            token</a>

        <form class="w-3/4 lg:w-1/2 " @submit.prevent="addTodo">
            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Přidat Todo</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z" />
                    </svg>

                </div>
                <input type="text" id="title" v-model="form.title.value"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-800 rounded-t-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Zprovoznit WEA" required>
                <button type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Přidat</button>
            </div>
        </form>
        <div class="w-3/4 lg:w-1/2 border-t border-gray-700">

            <TodoItem v-for="todo in todos" :todo="todo" :key="todo._id"></TodoItem>


        </div>
        <div class="w-3/4 lg:w-1/2 flex justify-between rounded-b-lg dark:bg-gray-800 border-t border-gray-700">

            <div v-for="filter in filters" :key="filter.value"
                class="p-3 rounded-b-lg cursor-pointer flex-grow text-center text-sm hover:bg-gray-700 text-white "
                @click="setFilter(filter.value)" :class="{ ' dark:bg-gray-700': currentFilter === filter.value }">
                {{ filter.label }}
            </div>

        </div>
    </div>
</template>


<script setup>


import TodoItem from "./TodoItem.vue"

import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { ref } from 'vue';
import { getToken } from "@/utils/auth.util";
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

const filters = [
    { label: 'Vše', value: 'all' },
    { label: 'Hotové', value: 'done' },
    { label: 'Čekající', value: 'notDone' }
];

const currentFilter = ref('all');

const form = {
    title: ref('')
};

const store = useStore();
const todos = computed(() => {

    switch (currentFilter.value) {
        case "done":
            return store.getters["todos/allTodosDone"]
        case "notDone":
            return store.getters["todos/allTodosNotDone"]
        default:
            return store.getters["todos/allTodos"]

    }
});

const tokenCopy = () => {
    const jwtToken = getToken()

    if (jwtToken) {
        const tempInput = document.createElement('input');
        tempInput.value = jwtToken;
        document.body.appendChild(tempInput);

        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // mobilní zařízení

        navigator.clipboard.writeText(tempInput.value);
        document.body.removeChild(tempInput);

        $toast.success("JWT zkopírováno")
    } else {
        $toast.error('JWT nebylo nalezeno');
    }
}

const addTodo = async () => {
    if (form.title.value.trim() !== '') {
        await store.dispatch('todos/addTodo', form.title.value);
        form.title.value = '';
    }
};

const setFilter = filter => {
    currentFilter.value = filter;
};


onMounted(async () => {
    await store.dispatch('todos/getTodos');
});


</script>