import { apiCall } from "./api.service"

export default {
    delete: async (id) => {
        const res = await apiCall({ endpoint: `/api/v1/todos/${id}`, method: "DELETE", shouldToast: true })
        return res?.data ?? false
    },

    getAll: async () => {
        const res = await apiCall({ endpoint: "/api/v1/todos", method: "GET" })
        return res?.data ?? []
    },

    edit: async (id, data) => {
        const res = await apiCall({ endpoint: `/api/v1/todos/${id}`, method: "PUT", shouldToast: true, body: data })
        return res?.data ?? false
    },

    add: async (title = "") => {
        const res = await apiCall({ endpoint: "/api/v1/todos", method: "POST", body: { title: title } })
        return res?.data ?? {}
    },

}