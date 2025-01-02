import React, { useState, useEffect } from 'react';
import { addKehadiran } from '../../../services/kehadiran.service';
import Navbar from '../../Fragmen/Navbar';
import { FiClock, FiCalendar, FiUser, FiCheckCircle } from 'react-icons/fi';
import LogoutModal from '../../Fragmen/LogoutModal';
import { getUserFromToken } from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const BuatKehadiranKaryawanLayouts = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const columns = ["ID Kehadiran", "ID Karyawan", "Tanggal & Waktu", "Status"];
    const [tanggalKehadiran, setTanggalKehadiran] = useState('');
    const [status, setStatus] = useState('1');
    const [kehadiranData, setKehadiranData] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
        const today = new Date();
        setTanggalKehadiran(today.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);

    const getStatusLabel = (status) => {
        switch(status) {
            case '1':
                return 'Hadir';
            case '2':
                return 'Terlambat';
            case '3':
                return 'Tidak Hadir';
            default:
                return status;
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError('');
        setSuccess('');

        const newData = {
            id_karyawan: user?.id_user,
            tanggal_kehadiran: new Date().toISOString(),
            status: '1' // Explicitly set to '1' for 'Hadir'
        };

        addKehadiran(newData, (statusAdd, response) => {
            if (statusAdd) {
                setSuccess('Kehadiran berhasil disimpan!');
                const newEntry = {
                    id_kehadiran: response.data.id_kehadiran,
                    id_karyawan: response.data.id_karyawan,
                    tanggal_kehadiran: response.data.tanggal_kehadiran,
                    status: response.data.status
                };
                setKehadiranData([newEntry, ...kehadiranData]);
            } else {
                setError(response || 'Kehadiran sudah diisi untuk hari ini');
            }
            setIsSubmitting(false);
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Navbar.NavbarKaryawan username={user?.username} onLogout={handleLogout} />
            
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                        p-6 mb-8 rotate-[0.5deg]">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl md:text-3xl font-black text-black uppercase 
                                transform -rotate-[1deg]">
                                Buat Kehadiran
                            </h1>
                            <div className="bg-yellow-400 border-4 border-black p-2 font-bold 
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <FiClock className="inline mr-2" />
                                {new Date().toLocaleTimeString('id-ID')}
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-400 border-4 border-black text-black 
                                font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-0.5deg]">
                                <p className="font-black uppercase">Ingat!</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-green-400 border-4 border-black text-black 
                                font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[0.5deg]">
                                <p className="font-black uppercase">Sukses!</p>
                                <p>{success}</p>
                            </div>
                        )}

                        <div className="bg-blue-400 border-4 border-black p-6 mb-8 
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-0.5deg]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white border-4 border-black p-4 
                                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex items-center">
                                        <FiUser className="text-black mr-3 text-xl" />
                                        <div>
                                            <p className="text-sm font-bold uppercase">Nama Karyawan</p>
                                            <p className="font-black">{user?.username || 'Loading...'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white border-4 border-black p-4 
                                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex items-center">
                                        <FiCalendar className="text-black mr-3 text-xl" />
                                        <div>
                                            <p className="text-sm font-bold uppercase">Tanggal</p>
                                            <p className="font-black">{tanggalKehadiran}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`
                                        flex items-center justify-center
                                        px-8 py-4 
                                        bg-yellow-400 border-4 border-black
                                        text-black font-black uppercase
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        transform transition-transform
                                        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                                        ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    <FiCheckCircle className="mr-2" />
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan Kehadiran'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {kehadiranData.length > 0 && (
                        <div className="bg-white border-4 border-black 
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 rotate-[0.5deg]">
                            <h2 className="text-xl font-black uppercase mb-4 
                                bg-blue-400 border-4 border-black p-2 inline-block
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
                                Riwayat Kehadiran Hari Ini
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-4 border-black">
                                    <thead>
                                        <tr className="bg-yellow-400 border-b-4 border-black">
                                            {columns.map((column, index) => (
                                                <th
                                                    key={index}
                                                    className="px-6 py-3 text-left font-black text-black 
                                                        uppercase border-r-4 border-black last:border-r-0"
                                                >
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-4 divide-black">
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
                                                    {new Date(item.tanggal_kehadiran).toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold">
                                                    {getStatusLabel(item.status)}
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

export default BuatKehadiranKaryawanLayouts;