import { useToast } from 'vue-toast-notification';

const $toast = useToast();


/**
 * Funkce vrací data z API ve formátu {message:"", data:"",errors:[], responseCode:0}
 * @param {string} method - GET/PUT/POST/DELETE
 * @param {string} endpoint - e.g. GET /api/v1/resource
 * @param {Map} body - {}
 * @param {boolean} shouldToast - chceme zobrazit notifikaci? 
 * @returns JSON data z API
 */
const apiCall = async ({ method = "POST", endpoint = "", body = {}, shouldToast = false }) => {

    const headersList = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    }

    let response;
    if (method === "GET") {
        response = await fetch(`${import.meta.env.VITE_ROOT_API ?? 'http://localhost:5454'}${endpoint}`, {
            method: method,
            headers: headersList
        });
    } else {
        response = await fetch(`${import.meta.env.VITE_ROOT_API ?? 'http://localhost:5454'}${endpoint}`, {
            method: method,
            body: JSON.stringify(body),
            headers: headersList
        });
    }


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