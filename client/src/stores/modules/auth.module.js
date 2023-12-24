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

        /**
         * Funkce vrací uživatele pokud je přihlášen a má validní token
         * pokud nemá validní token je smazan a přesměrován na přihlašovací obrazovku
         * @returns user
         */
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
            return isTokenValid(getToken())
        }
    }
}


export default authModule