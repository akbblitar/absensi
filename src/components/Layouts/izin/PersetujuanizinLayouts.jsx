import React, { useState, useEffect } from 'react';
import Navbar from '../../Fragmen/Navbar';
import LogoutModal from '../../Fragmen/LogoutModal';
import {
    getIzinTerbaru,
    getIzinBelumDisetujui,
    getIzinDisetujui,
    getIzinDitolak,
    validasiIzin
} from '../../../services/izin.service';
import { getUserFromToken } from '../../../services/auth.service.js';

const PersetujuanIzinLayouts = (props) => {
    const { onLogout } = props;
    const [pengajuanList, setPengajuanList] = useState([]);
    const [filter, setFilter] = useState('pending'); // pending, approved, rejected
    const [success, setSuccess] = useState('');
    const [username, setUsername] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = getUserFromToken(token);
        setUsername(userData?.username);

        const fetchIzinData = async () => {
            let data;
            try {
                switch (filter) {
                    case 'pending':
                        data = await getIzinBelumDisetujui();
                        break;
                    case 'approved':
                        data = await getIzinDisetujui();
                        break;
                    case 'rejected':
                        data = await getIzinDitolak();
                        break;
                    default:
                        data = await getIzinTerbaru();
                }
                console.log('Data yang diterima:', data);
                setPengajuanList(data.data); // Simpan data ke dalam state
            } catch (error) {
                console.error('Error fetching izin data:', error);
                setPengajuanList([]); // Atur ke array kosong jika terjadi error
            }
        };

        fetchIzinData();
    }, [filter]); // Tambahkan filter sebagai dependensi

    const handleApproval = async (id, status) => {
        try {
            // Validate user role and permissions
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Anda harus login terlebih dahulu');
                return;
            }

            const userData = getUserFromToken(token);
            if (!userData || userData.role !== 'Supervisor') {
                alert('Anda tidak memiliki izin untuk melakukan tindakan ini');
                return;
            }

            let keterangan_ditolak = '';
            if (status === 'ditolak') {
                keterangan_ditolak = prompt('Masukkan alasan penolakan:');
                if (!keterangan_ditolak) {
                    alert('Alasan penolakan harus diisi!');
                    return;
                }
            }

            // Call the API to validate the permission
            await validasiIzin(id, { 
                status, 
                keterangan_ditolak 
            });
            
            // Update the local state and show success message
            alert(`Pengajuan izin berhasil ${status === 'disetujui' ? 'disetujui' : 'ditolak'}`);
            
            // Refresh the data
            const updatedData = await getIzinBelumDisetujui();
            setPengajuanList(updatedData.data);
        } catch (error) {
            const errorMessage = error.message || 'Terjadi kesalahan saat memproses pengajuan';
            alert(errorMessage);
            console.error('Error handling approval:', error);
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'belum disetujui':
                return 'border-4 border-black bg-yellow-400';
            case 'disetujui':
                return 'border-4 border-black bg-green-400';
            case 'ditolak':
                return 'border-4 border-black bg-red-400';
            default:
                return '';
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Navbar.NavbarSupervisor username={username} onLogout={handleLogout} />
            
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-black text-black mb-8 uppercase 
                        bg-white border-4 border-black p-4 inline-block rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Persetujuan Izin Karyawan
                    </h1>

                    <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        {success && (
                            <div className="bg-green-400 border-4 border-black p-4 mb-6 
                                rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-black font-black uppercase">{success}</p>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-black font-black uppercase mb-2">
                                Filter Status
                            </label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full md:w-auto px-4 py-3 border-4 border-black bg-white 
                                    text-black font-bold focus:outline-none
                                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                    transition-all duration-200"
                            >
                                <option value="pending">Menunggu Persetujuan</option>
                                <option value="approved">Disetujui</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border-4 border-black">
                                <thead>
                                    <tr className="bg-yellow-400 border-b-4 border-black">
                                        <th className="px-6 py-4 text-left text-black font-black uppercase 
                                            tracking-wider border-r-4 border-black">
                                            Karyawan
                                        </th>
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
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y-4 divide-black">
                                    {Array.isArray(pengajuanList) && pengajuanList.map((item) => (
                                        <tr key={item.id_pengajuan_izin} className="hover:bg-blue-100">
                                            <td className="px-6 py-4 whitespace-nowrap font-bold border-r-4 border-black">
                                                {item.karyawan.nama_karyawan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold border-r-4 border-black">
                                                {item.tanggal}
                                            </td>
                                            <td className="px-6 py-4 font-bold border-r-4 border-black">
                                                <div>
                                                    <p className="text-black">{item.keterangan}</p>
                                                    {item.file && (
                                                        <div className="mt-2">
                                                            <a
                                                                href={`${import.meta.env.VITE_API_URL}public/uploads/izin/${item.file}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center font-black text-blue-600 
                                                                    hover:text-blue-800 underline"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                                </svg>
                                                                Lihat Bukti
                                                            </a>
                                                        </div>
                                                    )}
                                                    {item.status === 'ditolak' && item.keterangan_ditolak && (
                                                        <p className="text-red-600 font-black mt-1">
                                                            Alasan ditolak: {item.keterangan_ditolak}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold border-r-4 border-black">
                                                <span className={`px-4 py-2 text-black font-black uppercase 
                                                    border-4 border-black ${getStatusBadgeClass(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.status === 'belum disetujui' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleApproval(item.id_pengajuan_izin, 'disetujui')}
                                                            className="px-4 py-2 bg-green-400 text-black font-black uppercase 
                                                                border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                                                hover:-translate-y-1 transform transition-transform"
                                                        >
                                                            Setuju
                                                        </button>
                                                        <button
                                                            onClick={() => handleApproval(item.id_pengajuan_izin, 'ditolak')}
                                                            className="px-4 py-2 bg-red-400 text-black font-black uppercase 
                                                                border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                                                hover:-translate-y-1 transform transition-transform"
                                                        >
                                                            Tolak
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PersetujuanIzinLayouts;