<script setup>

import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
import Todo from "./todo-list/Todo.vue"

</script>


<template>
    <Nav></Nav>
    <Todo id="todolist"></Todo>
    <Footer></Footer>
</template>

<style scoped>
#todolist {
    padding-bottom: 20%;
}
</style>
