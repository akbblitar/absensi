import React, { useState, useEffect } from 'react';
import LihatKehadiranKaryawanSendiriLayouts from '../../Layouts/kehadiran/lihatKehadiranKaryawanSendiriLayouts';
import { getUserFromToken } from '../../../services/auth.service'; // Adjust the import path as needed

const LihatKehadiranKaryawanSendiri = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        user ? <LihatKehadiranKaryawanSendiriLayouts user={user} onLogout={handleLogout} /> : <p>Loading...</p>
    );
};

export default LihatKehadiranKaryawanSendiri;