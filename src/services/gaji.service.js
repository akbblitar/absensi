import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
    Authorization: `Bearer ${token}`
};

export const getGaji = (callback) => {
    axios
        .get(`${import.meta.env.VITE_API_URL}api/gaji`, { headers })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
};

export const tambahGaji = (gajiData, callback) => {
    axios
        .post(`${import.meta.env.VITE_API_URL}api/gaji`, gajiData, { headers })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
};

export const cariGajiById = (id_gaji, callback) => {
    axios
        .get(`${import.meta.env.VITE_API_URL}api/gaji/${id_gaji}`, { headers })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
};

export const updateGaji = (id_gaji, gajiData, callback) => {
    axios
        .patch(`${import.meta.env.VITE_API_URL}api/gaji/${id_gaji}`, gajiData, { headers })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
};

export const deleteGaji = (id_gaji, callback) => {
    axios
        .delete(`${import.meta.env.VITE_API_URL}api/gaji/${id_gaji}`, { headers })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
};