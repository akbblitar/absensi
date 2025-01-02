import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const getPosisi = (callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .get(`${import.meta.env.VITE_API_URL}api/posisi`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response);
            callback(false, err);
        });
};

export const getPosisiById = (id, callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .get(`${import.meta.env.VITE_API_URL}api/posisi/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response);
            callback(false, err);
        });
};

export const addPosisi = (data, callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .post(`${import.meta.env.VITE_API_URL}api/posisi`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response);
            callback(false, err);
        });
};

export const updatePosisi = (id, data, callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .patch(`${import.meta.env.VITE_API_URL}api/posisi/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response);
            callback(false, err);
        });
};

export const deletePosisi = (id, callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .delete(`${import.meta.env.VITE_API_URL}api/posisi/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response);
            callback(false, err);
        });
};