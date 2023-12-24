import { createStore } from "vuex";
import authModule from "./modules/auth.module";
import todoModule from "./modules/todo.module";

const store = createStore({
    modules: {
        todos: todoModule,
        auth: authModule
    }
})

export default store;