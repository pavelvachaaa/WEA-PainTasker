import { apiCall } from "./api.service"

export default {
    login: async (body = {}) => {
        const data = await apiCall({
            endpoint: "/api/v1/auth/login", body: body, shouldToast: true
        })

        const success = data?.responseCode === 200
        if (success) {
            // Dáváme to do localStoarge, aby nám odpadla trable s CSRF
            // Ovšem, když se tu vyskytne chyba s XSS, bude to mít horší dopad... - je to prostě tradeoff
            if (data?.data?.token) {
                localStorage.setItem("jwt", data.data.token)
            }
        }

        return success

    },

    register: async (body = {}) => {
        const data = await apiCall({
            endpoint: "/api/v1/users", body: body, shouldToast: true, 
        })

        return data?.responseCode === 200
    },

    logout: async () => {

    }

}