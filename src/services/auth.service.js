import axios from "axios";

export const login = (data, callback) => {
    axios
        .post(`${import.meta.env.VITE_API_URL}api/user/login`, data)
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
}

export const getUserFromToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        console.log('Token payload:', payload); 
        return payload;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};