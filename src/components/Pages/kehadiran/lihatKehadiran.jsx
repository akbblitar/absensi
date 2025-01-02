import React, { useState, useEffect } from 'react';
import LihatKehadiranLayouts from '../../Layouts/kehadiran/lihatKehadiranLayouts';
import { getUserFromToken } from '../../../services/auth.service';

const LihatKehadiran = () => {
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

    // Example props, you can replace these with actual values or state
    const karyawanId = null;
    const bulanAwal = null;
    const bulanAkhir = null;
    const tahun = null;
    const status = '';

    return (
        <LihatKehadiranLayouts
            user={user}
            onLogout={handleLogout}
            karyawanId={karyawanId}
            bulanAwal={bulanAwal}
            bulanAkhir={bulanAkhir}
            tahun={tahun}
            status={status}
        />
    );
};

export default LihatKehadiran;