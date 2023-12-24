import { jwtDecode } from "jwt-decode";

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

const getToken = () => {
    return localStorage.getItem("jwt");
}

const deleteToken = () => {
    localStorage.removeItem("jwt");
}

export { isTokenValid, getUserFromToken, getToken, deleteToken };