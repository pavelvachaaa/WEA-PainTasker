import { createStore } from "vuex";
import authModule from "./modules/auth.module";
import todoModule from "./modules/todo.module";

// Modulární state managment této aplikace pro rozšířitelnost
const store = createStore({
    modules: {
        todos: todoModule,
        auth: authModule
    }
})

export default store;