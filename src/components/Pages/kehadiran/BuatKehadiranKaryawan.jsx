import React, { useState, useEffect } from 'react';
import BuatKehadiranKaryawanLayouts from '../../Layouts/kehadiran/BuatKehadiranKaryawanLayouts';
import { getUserFromToken } from '../../../services/auth.service'; // Adjust the import path as needed

const BuatKehadiranKaryawan = () => {
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
        user ? <BuatKehadiranKaryawanLayouts user={user} onLogout={handleLogout} /> : <p>Loading...</p>
    );
};

export default BuatKehadiranKaryawan;