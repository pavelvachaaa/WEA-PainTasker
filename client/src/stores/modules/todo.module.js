import todoService from "@/services/todo.service";

const todoModule = {
    namespaced: true,
    state() {
        return {
            todos: []
        }
    },
    mutations: {
        SET_TODOS(state, todos) {
            state.todos = todos;
        },

        ADD_TODO(state, todo) {
            state.todos.unshift(todo);
        }
    },
    actions: {
        async getTodos({ commit }) {
            const data = await todoService.getAll()
            commit("SET_TODOS", data)
        },
        async addTodo({ commit }, title) {
            const data = await todoService.add(title);
            commit("ADD_TODO", data)
        }
    },
    getters: {
        allTodos(state) {
            return state.todos
        }
    },
};

export default todoModule;