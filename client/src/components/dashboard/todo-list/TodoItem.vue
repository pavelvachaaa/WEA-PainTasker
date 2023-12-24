<template>
    <div
        class="flex items-center p-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-800 hover:bg-gray-700 ">
        <template v-if="!isEditing">
            <div class="flex items-center  ">
                <input id="bordered-checkbox-1" type="checkbox" v-model="todo.isDone" name="bordered-checkbox"
                    @change="checkboxChangeTodo"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">

            </div>

            <a href="#" @click="switchDoneTodo" class="flex-1 " :style="{
                'text-decoration': todo.isDone ? 'line-through' : 'none',
                'text-decoration-thickness': todo.isDone ? '4px' : 'initial',
                'text-decoration-color': todo.isDone ? '#1f2937' : 'initial'
            }">
                <h5 class="mx-4 text-1xl font-bold  tracking-tight text-gray-900 dark:text-white">
                    {{ todo.title ?? '' }}
                </h5>
            </a>

            <div class="flex items-center space-x-2">
                <button @click="editTodo" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path
                            d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                        <path
                            d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                </button>

                <button @click="deleteTodo" class="text-red-500 hover:text-red-700 dark:hover:text-red-300">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                    </svg>
                </button>
            </div>
        </template>

        <template v-else>

            <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path
                            d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                        <path
                            d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                </div>
                <input type="text" v-model="editedTitle" @keyup.enter="saveEditedTodo" @keyup.esc="cancelEdit" autofocus
                    class="block text-white w-full p-4 ps-10 text-sm border border-gray-800 rounded-t-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Zprovoznit semestrálku na WEA" required>
                <button @click="saveEditedTodo"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Upravit</button>
            </div>

        </template>
    </div>
</template>



<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore();
const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
});

const isEditing = ref(false);
const editedTitle = ref(props.todo.title);

const deleteTodo = async () => {
    await store.dispatch("todos/deleteTodo", props.todo._id)
}

/// Checkbox totiž už rovnou změní tu hodnotu isDone, i když to nevyjde
const checkboxChangeTodo = async () => {
    await store.dispatch("todos/editTodo", { id: props.todo._id, data: { isDone: props.todo.isDone } })

}
const switchDoneTodo = async () => {
    await store.dispatch("todos/editTodo", { id: props.todo._id, data: { isDone: !props.todo.isDone } })
}

const editTodo = () => {
    isEditing.value = true;
}

const cancelEdit = () => {
    isEditing.value = false;
    editedTitle.value = props.todo.title;
}

const saveEditedTodo = async () => {
    isEditing.value = false;
    await store.dispatch("todos/editTodo", { id: props.todo._id, data: { title: editedTitle.value } })
}

</script>

