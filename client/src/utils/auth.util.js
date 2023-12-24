import { jwtDecode } from "jwt-decode";

/**
 * Duplicitní metoda getUserFromToken, ale je jednodušší to udělat takhle než kontrolovat
 * zdali se vrací platný objekt
 * @param {string} token 
 * @returns zdali zadaný token je validní
 */
const isTokenValid = (token) => {
    if (!token) {
        return false
    }

    try {
        jwtDecode(token);
        return true;
    } catch (e) {
        return false;
    }
}
/**
 * Vrací objekt uživatele pokud token byl validní
 * @param {string} token jwt token 
 * @returns user
 */
const getUserFromToken = (token) => {
    if (!token) {
        return null
    }

    try {
        return jwtDecode(token);
    } catch (e) {
        return null
    }
}

const getToken = () => localStorage.getItem("jwt")
const deleteToken = () => localStorage.removeItem("jwt");
const isLoggedIn = () => isTokenValid(getToken())

export { isTokenValid, getUserFromToken, getToken, deleteToken, isLoggedIn };