const authModule = {
    namespaced: true,
    state() {
        return {
            token: "jwt-token"
        }
    },
    mutations: {
        logout(state) {
            state.token = null;
        },
        add(state) {
            console.log("To mrdej")
        }
    }
}


export default authModule