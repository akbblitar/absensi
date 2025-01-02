import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const getKaryawan = (callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .get(`${import.meta.env.VITE_API_URL}api/karyawan`, {
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

export const getKaryawanById = (id, callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .get(`${import.meta.env.VITE_API_URL}api/karyawan/${id}`, {
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

export const getKaryawanByUserId = (userId) => {
    const token = getToken();
    return axios
        .get(`${import.meta.env.VITE_API_URL}api/karyawan`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            // Find karyawan with matching id_user
            const karyawan = res.data.find(k => k.id_user === userId);
            if (karyawan) {
                return karyawan;
            } else {
                throw new Error('Karyawan not found');
            }
        });
};

export const getKaryawanByPosisi = (id_posisi, callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .get(`${import.meta.env.VITE_API_URL}api/karyawan/posisi/${id_posisi}`, {
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

export const addKaryawan = (data, callback) => {
    const token = getToken();
    console.log("Token:", token);
    console.log("Data yang akan dikirim:", data);
    axios
        .post(`${import.meta.env.VITE_API_URL}api/karyawan`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log("API Response:", res.data);
            callback(true, res.data);
        })
        .catch((err) => {
            console.log("Error:", err.response ? err.response.data : err.message);
            callback(false, err);
        });
};

export const editKaryawan = (id, data, callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .patch(`${import.meta.env.VITE_API_URL}api/karyawan/${id}`, data, {
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

export const deleteKaryawan = (id, callback) => {
    const token = getToken();
    console.log("Token:", token);
    axios
        .delete(`${import.meta.env.VITE_API_URL}api/karyawan/${id}`, {
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