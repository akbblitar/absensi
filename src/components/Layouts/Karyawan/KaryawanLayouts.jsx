import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Fragmen/Navbar";
import LogoutModal from '../../Fragmen/LogoutModal';

const KaryawanLayouts = (props) => {
    const { user, karyawanData, posisiData, onLogout, onDelete } = props;
    const columns = ["nama_karyawan", "username", "alamat", "nomor_telepon", "nama_posisi", "aksi"];
    const [mergedData, setMergedData] = useState([]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    useEffect(() => {
        const data = karyawanData.map(karyawan => {
            const posisi = posisiData.find(p => p.id_posisi === karyawan.id_posisi);
            return {
                ...karyawan,
                nama_karyawan: karyawan.nama_karyawan,
                username: karyawan.user ? karyawan.user.username : 'Belum ada',
                alamat: karyawan.alamat || '-',
                nomor_telepon: karyawan.nomor_telepon,
                nama_posisi: posisi ? posisi.nama_posisi : 'Unknown',
                aksi: (
                    <div className="flex gap-2">
                        <Link 
                            to={`/admin-dashboard/karyawan/edit-karyawan/${karyawan.id_karyawan}`} 
                            className="bg-blue-400 px-4 py-2 border-4 border-black 
                                font-bold uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:-translate-y-1 transform transition-transform"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => {
                                if (window.confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
                                    onDelete(karyawan.id_karyawan);
                                }
                            }}
                            className="bg-red-400 px-4 py-2 border-4 border-black 
                                font-bold uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:-translate-y-1 transform transition-transform"
                        >
                            Hapus
                        </button>
                    </div>
                )
            };
        });
        setMergedData(data);
    }, [karyawanData, posisiData]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-yellow-50">
            <Navbar.NavbarAdmin username={user?.username} onLogout={handleLogout} />
            
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start 
                        md:items-center mb-8">
                        <h1 className="text-4xl font-black text-black mb-6 uppercase 
                            bg-white border-4 border-black p-4 inline-block rotate-1
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Data Karyawan
                        </h1>
                        
                        <Link to="/admin-dashboard/karyawan/tambah-karyawan">
                            <button className="bg-green-400 px-6 py-3 border-4 border-black 
                                font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:-translate-y-1 transform transition-transform">
                                + Tambah Karyawan
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white border-4 border-black rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="overflow-x-auto p-4">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-blue-400 border-b-4 border-black">
                                        {columns.map((column, index) => (
                                            <th key={index} 
                                                className="px-6 py-4 text-left text-black 
                                                    font-black uppercase tracking-wider">
                                                {column.replace(/_/g, ' ')}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y-4 divide-black">
                                    {mergedData.map((item, index) => (
                                        <tr key={index} className="hover:bg-yellow-50">
                                            {columns.map((column, colIndex) => (
                                                <td key={colIndex} 
                                                    className="px-6 py-4 whitespace-nowrap font-bold">
                                                    {item[column]}
                                                </td>
                                            ))}
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
}

export default KaryawanLayouts;