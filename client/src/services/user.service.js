import { jwtDecode } from "jwt-decode"
import { apiCall } from "./api.service"
import { getToken, getUserFromToken } from "@/utils/auth.util"

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
                return jwtDecode(data.data.token)
            }
        }

        return null;
    },

    register: async (body = {}) => {
        const data = await apiCall({
            endpoint: "/api/v1/users", body: body, shouldToast: true,
        })

        return data?.responseCode === 200
    },

    getUserFromStorage: () => {
        return getUserFromToken(getToken()) ?? {}
    }
}