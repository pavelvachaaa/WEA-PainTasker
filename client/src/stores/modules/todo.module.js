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
        },
        DELETE_TODO(state, id) {
            state.todos = state.todos.filter(todo => todo._id !== id);
        },

        UPDATE_TODO(state, params) {
            state.todos = state.todos.map(todo => {
                if (todo._id === params.id) {
                    console.log("Zde", params.data)
                    return { ...todo, ...params.data };
                }
                return todo;
            });
        }
    },

    actions: {
        async getTodos({ commit }) {
            const data = await todoService.getAll()
            commit("SET_TODOS", data.reverse())
        },

        async addTodo({ commit }, title) {
            const data = await todoService.add(title);
            commit("ADD_TODO", data)
        },

        async deleteTodo({ commit }, id) {
            const res = await todoService.delete(id);
            if (res) {
                commit("DELETE_TODO", id)
            }
        },

        async editTodo({ commit }, params) {
            const res = await todoService.edit(params.id, params.data);
            if (res) {
                commit("UPDATE_TODO", params)
            }
        }

    },

    getters: {
        allTodos(state) {
            const sortedTodos = [...state.todos].sort((a, b) => {
                if (a.isDone !== b.isDone) {
                    return a.isDone ? 1 : -1;
                } else {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                }
            });

            return sortedTodos;
        },

        allTodosDone(state) {
            return state.todos.filter(todo => todo.isDone).sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });
        },

        allTodosNotDone(state) {
            return state.todos.filter(todo => !todo.isDone).sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });
        }

    },
};

export default todoModule;