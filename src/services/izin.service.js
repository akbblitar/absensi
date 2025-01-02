import axios from 'axios';

export const tambahIzin = async (izinData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}api/pengajuan-izin/`, izinData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error saat menambah izin:', error.response.data);
        throw error.response ? error.response.data : new Error('Server Error');
    }
};

export const getRiwayatIzinSendiri = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/pengajuan-izin/riwayat-izin-sendiri`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.data) {
            response.data.data = response.data.data.map(izin => ({
                ...izin,
                status: izin.status === 'disetujui' ? 'approved' : 
                        izin.status === 'ditolak' ? 'rejected' : 
                        izin.status === 'belum disetujui' ? 'pending' : 'pending'
            }));
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server Error');
    }
};

export const validasiIzin = async (idPengajuanIzin, data) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}api/pengajuan-izin/validasi-izin/${idPengajuanIzin}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server Error');
    }
};

export const getIzinBelumDisetujui = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/pengajuan-izin/izin-belum-disetujui`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server Error');
    }
};

export const getIzinDisetujui = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/pengajuan-izin/izin-disetujui`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server Error');
    }
};

export const getIzinDitolak = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/pengajuan-izin/izin-ditolak`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server Error');
    }
};

export const getIzinTerbaru = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/pengajuan-izin/izin-terbaru`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server Error');
    }
};

export const getPengajuanIzinById = async (idPengajuanIzin) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/pengajuan-izin/${idPengajuanIzin}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server Error');
    }
};