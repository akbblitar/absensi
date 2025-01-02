import React, { useState, useEffect } from 'react';
import Navbar from '../../Fragmen/Navbar';
import { tambahIzin, getRiwayatIzinSendiri } from '../../../services/izin.service';
import Table from '../../Elements/Table';
import { Link } from 'react-router-dom';
import { getUserFromToken } from '../../../services/auth.service';
import LogoutModal from '../../Fragmen/LogoutModal';
import { FiInfo } from 'react-icons/fi';

const PengajuanIzinLayouts = (props) => {
    const { onLogout } = props;
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        tanggal_mulai: '',
        tanggal_selesai: '',
        jenis_izin: '',
        keterangan: '',
        bukti: null
    });
    const [riwayatIzin, setRiwayatIzin] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('form');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [selectedIzin, setSelectedIzin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
        const fetchRiwayatIzin = async () => {
            try {
                const updatedRiwayat = await getRiwayatIzinSendiri();
                console.log('Riwayat Izin:', updatedRiwayat.data);
                setRiwayatIzin(updatedRiwayat.data);
            } catch (err) {
                setError('Gagal mengambil riwayat izin');
            }
        };
        fetchRiwayatIzin();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        const formDataToSend = new FormData();
        formDataToSend.append('tanggal_mulai', formData.tanggal_mulai);
        formDataToSend.append('tanggal_selesai', formData.tanggal_selesai);
        formDataToSend.append('keterangan', formData.keterangan);
        if (formData.bukti) {
            formDataToSend.append('bukti', formData.bukti);
        }

        try {
            await tambahIzin(formDataToSend);
            setSuccess('Pengajuan izin berhasil dikirim!');
            setFormData({
                tanggal_mulai: '',
                tanggal_selesai: '',
                jenis_izin: '',
                keterangan: '',
                bukti: null
            });
            const updatedRiwayat = await getRiwayatIzinSendiri();
            setRiwayatIzin(updatedRiwayat.data);
        } catch (err) {
            console.error('Error saat mengajukan izin:', err);
            setError(err.message || 'Gagal mengajukan izin');
            const errorElement = document.querySelector('.error-notification');
            if (errorElement) {
                errorElement.classList.add('animate-shake');
                setTimeout(() => {
                    errorElement.classList.remove('animate-shake');
                }, 500);
            }
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
            case 'disetujui':
                return 'bg-green-100 text-green-800';
            case 'rejected':
            case 'ditolak':
                return 'bg-red-100 text-red-800';
            case 'pending':
            case 'belum disetujui':
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getStatusText = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
            case 'disetujui':
                return 'Disetujui';
            case 'rejected':
            case 'ditolak':
                return 'Ditolak';
            case 'pending':
            case 'belum disetujui':
            default:
                return 'Menunggu';
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
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
                    <h1 className="text-3xl font-black text-black mb-8 uppercase 
                        bg-white border-4 border-black p-4 inline-block rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Pengajuan Izin
                    </h1>

                    <div className="flex mb-6 gap-4">
                        <button
                            className={`flex-1 py-3 px-4 text-center font-black text-lg uppercase border-4 
                                border-black transition-transform hover:-translate-y-1 
                                ${activeTab === 'form' 
                                    ? 'bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                                    : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}
                            onClick={() => setActiveTab('form')}
                        >
                            Form Pengajuan
                        </button>
                        <button
                            className={`flex-1 py-3 px-4 text-center font-black text-lg uppercase border-4 
                                border-black transition-transform hover:-translate-y-1
                                ${activeTab === 'riwayat' 
                                    ? 'bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                                    : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}
                            onClick={() => setActiveTab('riwayat')}
                        >
                            Riwayat Izin
                        </button>
                    </div>

                    {activeTab === 'form' ? (
                        <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            {error && (
                                <div className="bg-red-400 border-4 border-black p-4 mb-6 
                                    rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-black font-black uppercase">{error}</p>
                                </div>
                            )}
                            {success && (
                                <div className="bg-green-400 border-4 border-black p-4 mb-6 
                                    rotate-[-0.5deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-black font-black uppercase">{success}</p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-black font-black uppercase mb-2">
                                        Bukti (Opsional)
                                    </label>
                                    <input
                                        type="file"
                                        name="bukti"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black font-bold focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                        accept="image/*,.pdf"
                                    />
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
                                        Ajukan Izin
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white border-4 border-black rotate-[-0.5deg]
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-4 border-black">
                                    <thead>
                                        <tr className="bg-yellow-400 border-b-4 border-black">
                                            <th className="px-6 py-4 text-left text-black font-black uppercase 
                                                tracking-wider border-r-4 border-black">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-4 text-left text-black font-black uppercase 
                                                tracking-wider border-r-4 border-black">
                                                Keterangan
                                            </th>
                                            <th className="px-6 py-4 text-left text-black font-black uppercase 
                                                tracking-wider border-r-4 border-black">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-black font-black uppercase 
                                                tracking-wider">
                                                Bukti
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y-4 divide-black">
                                        {Array.isArray(riwayatIzin) && riwayatIzin.map((izin) => (
                                            <tr key={izin.id_pengajuan_izin}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(izin.tanggal).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {izin.status?.toLowerCase() === 'rejected' ? (
                                                            <span className="text-red-600">{izin.keterangan_ditolak || '-'}</span>
                                                        ) : (
                                                            <span>{izin.keterangan}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(izin.status)}`}>
                                                        {getStatusText(izin.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {izin.file ? (
                                                        <a
                                                            href={`http://localhost:5000/public/uploads/izin/${izin.file}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                                        >
                                                            Lihat Bukti
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400">Tidak ada bukti</span>
                                                    )}
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

export default PengajuanIzinLayouts;