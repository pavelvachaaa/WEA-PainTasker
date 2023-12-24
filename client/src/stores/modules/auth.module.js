import router from "@/router";
import userService from "@/services/user.service";
import { deleteToken, getToken, isTokenValid } from "@/utils/auth.util";

const authModule = {
    namespaced: true,
    state() {
        return {
            user: {}
        }
    },
    mutations: {
        LOGOUT(state) {
            state.user = {};
            deleteToken()
        },
        SET_USER(state, user) {
            state.user = user;
        }
    },

    actions: {
        async login({ commit }, data) {
            console.log(data)
            const res = await userService.login(data);

            if (res) {
                commit("SET_USER", res)
                router.push('/dashboard')
            }
        },

        logout({ commit }) {
            commit("LOGOUT");
            router.push("/login")
        }
    },

    getters: {
        getUser(state) {
            if (!isTokenValid(getToken())) {
                state.user = {};
                deleteToken()
                router.push("/login")
            }

            if (Object.keys(state.user).length === 0) {
                return userService.getUserFromStorage()
            }

            return state.user;
        },
        isLoggedIn(state) {
            return Object.keys(state.user).length !== 0 && isTokenValid(getToken())
        }
    }
}


export default authModule