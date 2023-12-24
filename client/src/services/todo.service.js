import { apiCall } from "./api.service"

export default {
    delete: async () => {

    },
    get: async () => {

    },
    getAll: async () => {
        const data = await apiCall({ endpoint: "/api/v1/todos", method: "GET" })
        return data?.data ?? []
    },
    edit: async () => {

    },

    add: async (title = "") => {
        const data = await apiCall({ endpoint: "/api/v1/todos", method: "POST", body: { title: title } })
        return data?.data ?? {}
    },

}