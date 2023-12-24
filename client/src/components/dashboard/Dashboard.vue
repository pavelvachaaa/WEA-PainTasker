<script setup>

import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
import Todo from "./todo-list/Todo.vue"
import { computed } from "vue";
import { jwtDecode } from "jwt-decode";


const username = computed(() => {
    const jwtString = localStorage.getItem("jwt")
    const data = jwtDecode(jwtString);
    console.log(data);
    return data.name;
});
</script>


<template>
    <Nav :name="username"></Nav>
    <Todo></Todo>
    <Footer></Footer>
</template>

