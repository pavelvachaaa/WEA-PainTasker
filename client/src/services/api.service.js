import { useToast } from 'vue-toast-notification';

const $toast = useToast();


/**
 * Funkce vrací data z API ve formátu {message:"", data:"",errors:[], responseCode:0}
 * @param {*} method - GET/PUT/POST/DELETE
 * @param {*} endpoint - e.g. GET /api/v1/resource
 * @param {*} body - {}
 * @param {*} shouldToast - chceme zobrazit notifikaci? 
 * @returns JSON data z API
 */
const apiCall = async ({ method = "POST", endpoint = "", body = {}, shouldToast = false }) => {

    const headersList = {
        "Content-Type": "application/json"
    }
    console.log(import.meta.env)
    const response = await fetch(`${import.meta.env.VITE_ROOT_API ?? 'http://localhost:5454'}${endpoint}`, {
        method: method,
        body: JSON.stringify(body),
        headers: headersList
    });

    const data = await response.json();

    if (shouldToast) {
        if (response.ok) {
            $toast.success(data.message ?? "Úspěch");
        } else {
            $toast.error(data.message ?? "Chyba!");
        }
    }

    return data;
}


export { apiCall }