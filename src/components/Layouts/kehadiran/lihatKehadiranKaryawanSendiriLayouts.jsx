import React, { useState, useEffect } from 'react';
import { getKehadiranSendiriRentang } from '../../../services/kehadiran.service';
import Table from '../../Elements/Table';
import Navbar from '../../Fragmen/Navbar';
import LogoutModal from '../../Fragmen/LogoutModal';
import { getUserFromToken } from '../../../services/auth.service';

const LihatKehadiranKaryawanSendiriLayouts = () => {
    const [user, setUser] = useState({});
    const [bulanAwal, setBulanAwal] = useState('');
    const [bulanAkhir, setBulanAkhir] = useState('');
    const [tahun, setTahun] = useState('');
    const [kehadiranData, setKehadiranData] = useState([]);
    const [error, setError] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const months = [
        { value: "1", label: "Januari" },
        { value: "2", label: "Februari" },
        { value: "3", label: "Maret" },
        { value: "4", label: "April" },
        { value: "5", label: "Mei" },
        { value: "6", label: "Juni" },
        { value: "7", label: "Juli" },
        { value: "8", label: "Agustus" },
        { value: "9", label: "September" },
        { value: "10", label: "Oktober" },
        { value: "11", label: "November" },
        { value: "12", label: "Desember" }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bulanAwal || !bulanAkhir || !tahun) {
            setError('Semua field harus diisi.');
            return;
        }
        setError('');
        getKehadiranSendiriRentang(bulanAwal, bulanAkhir, tahun, (status, data) => {
            if (status) {
                const formattedData = data.map(item => ({
                    ...item,
                    tanggal_kehadiran: new Date(item.tanggal_kehadiran).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: 'Asia/Jakarta'
                    })
                }));
                setKehadiranData(formattedData);
            } else {
                setError('Gagal mengambil data');
            }
        });
    };

    const columns = [
        { header: "ID Kehadiran", accessor: "id_kehadiran" },
        { header: "ID Karyawan", accessor: "id_karyawan" },
        { header: "Tanggal & Waktu", accessor: "tanggal_kehadiran" },
        { header: "Status", accessor: "status" }
    ];

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Navbar.NavbarKaryawan 
                username={user?.username} 
                onLogout={handleLogout}
            />

            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black text-black mb-8 uppercase 
                        bg-white border-4 border-black p-4 inline-block rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Lihat Kehadiran Saya
                    </h1>

                    <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-400 border-4 border-black p-4 
                                    rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-black font-black uppercase">{error}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-black font-black uppercase mb-2">
                                        Bulan Awal
                                    </label>
                                    <select
                                        value={bulanAwal}
                                        onChange={(e) => setBulanAwal(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black font-bold focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                    >
                                        <option value="">Pilih Bulan</option>
                                        {months.map((month) => (
                                            <option key={month.value} value={month.value}>
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-black font-black uppercase mb-2">
                                        Bulan Akhir
                                    </label>
                                    <select
                                        value={bulanAkhir}
                                        onChange={(e) => setBulanAkhir(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black font-bold focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                    >
                                        <option value="">Pilih Bulan</option>
                                        {months.map((month) => (
                                            <option key={month.value} value={month.value}>
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-black font-black uppercase mb-2">
                                        Tahun
                                    </label>
                                    <select
                                        value={tahun}
                                        onChange={(e) => setTahun(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black font-bold focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                    >
                                        <option value="">Pilih Tahun</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-yellow-400 px-8 py-4 border-4 border-black 
                                        text-black font-black uppercase 
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                                        transform transition-transform"
                                >
                                    Tampilkan Data
                                </button>
                            </div>
                        </form>
                    </div>

                    {kehadiranData.length > 0 && (
                        <div className="bg-white border-4 border-black rotate-[0.5deg]
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-2xl font-black text-black uppercase p-4
                                bg-blue-400 border-b-4 border-black">
                                Hasil Pencarian
                            </h2>
                            <div className="overflow-x-auto p-4">
                                <table className="min-w-full border-4 border-black">
                                    <thead>
                                        <tr className="bg-yellow-400 border-b-4 border-black">
                                            {columns.map((column, index) => (
                                                <th
                                                    key={index}
                                                    className="px-6 py-4 text-left text-black 
                                                        font-black uppercase tracking-wider
                                                        border-r-4 border-black last:border-r-0"
                                                >
                                                    {column.header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y-4 divide-black">
                                        {kehadiranData.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-100">
                                                <td className="px-6 py-4 whitespace-nowrap font-bold
                                                    border-r-4 border-black">
                                                    {item.id_kehadiran}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold
                                                    border-r-4 border-black">
                                                    {item.id_karyawan}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold
                                                    border-r-4 border-black">
                                                    {item.tanggal_kehadiran}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold">
                                                    {item.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LihatKehadiranKaryawanSendiriLayouts;