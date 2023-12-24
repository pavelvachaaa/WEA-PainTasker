<template>
    <div class="p-6 bg-white border border-gray-200   dark:bg-gray-800 dark:border-gray-800">
        <a href="#">
            <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{{ todo.title ?? "" }}</h5>
        </a>
    </div>

    <!-- <div>
    Checkbox na odškrutnutí
    Klikatelné celé
    edit při kliknutí do textu nebo taky ikonka??
    smazat
</div> -->
</template>

<script setup>

const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
});
</script>