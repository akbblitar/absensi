import axios from "axios";

export const getKehadiran = (callback) => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    axios
        .get(`${import.meta.env.VITE_API_URL}api/kehadiran`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response);
        });
}

export const addKehadiran = (data, callback) => {
    const token = localStorage.getItem("token");
    axios
        .post(`${import.meta.env.VITE_API_URL}api/kehadiran`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response?.data?.message || 'Terjadi kesalahan saat menambah kehadiran');
        });
}

export const getKehadiranByKaryawan = (id_karyawan, bulanAwal, bulanAkhir, tahun, callback) => {
    const token = localStorage.getItem("token");
    axios
        .get(`${import.meta.env.VITE_API_URL}api/kehadiran/karyawan/${id_karyawan}/${bulanAwal}/${bulanAkhir}/${tahun}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response);
        });
}

export const getKehadiranByKaryawanStatus = (id_karyawan, bulanAwal, bulanAkhir, tahun, status, callback) => {
    const token = localStorage.getItem("token");
    axios
        .get(`${import.meta.env.VITE_API_URL}api/kehadiran/karyawan/${id_karyawan}/${bulanAwal}/${bulanAkhir}/${tahun}/${status}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response);
        });
}

export const getKehadiranByBulan = (bulan, callback) => {
    const token = localStorage.getItem("token");
    axios
        .get(`${import.meta.env.VITE_API_URL}api/kehadiran/bulan/${bulan}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response);
        });
}

export const getKehadiranByStatus = (status, callback) => {
    const token = localStorage.getItem("token");
    axios
        .get(`${import.meta.env.VITE_API_URL}api/kehadiran/status/${status}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response);
        });
}

export const getKehadiranSendiri = (bulan, tahun, callback) => {
    const token = localStorage.getItem("token");
    axios
        .get(`${import.meta.env.VITE_API_URL}api/kehadiran/sendiri/${bulan}/${tahun}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response);
        });
}

export const getKehadiranSendiriRentang = (bulanAwal, bulanAkhir, tahun, callback) => {
    const token = localStorage.getItem("token");
    axios
        .get(`${import.meta.env.VITE_API_URL}api/kehadiran/sendiri/rentang/${bulanAwal}/${bulanAkhir}/${tahun}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response);
        });
}