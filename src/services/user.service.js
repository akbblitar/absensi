import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const getUser = (callback) => {
    const token = getToken();
    console.log("Token:", token); // Log the token to verify it is being retrieved correctly
    axios
        .get(`${import.meta.env.VITE_API_URL}api/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response); // Log the error response for more details
            callback(false, err);
        });
};

export const getUserById = (id, callback) => {
    const token = getToken();
    console.log("Token:", token); // Log the token to verify it is being retrieved correctly
    axios
        .get(`${import.meta.env.VITE_API_URL}api/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response); // Log the error response for more details
            callback(false, err);
        });
};

export const editUser = async (id, data) => {
    const token = getToken();
    console.log("Token:", token); // Log the token to verify it is being retrieved correctly
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}api/user/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("API Response:", response.data);
        return response.data;
    } catch (err) {
        console.log("Error:", err.response); // Log the error response for more details
        throw err;
    }
};

export const addUser = (data, callback) => {
    const token = getToken();
    console.log("Token:", token); // Log the token to verify it is being retrieved correctly
    axios
        .post(`${import.meta.env.VITE_API_URL}api/user`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response); // Log the error response for more details
            callback(false, err);
        });
};