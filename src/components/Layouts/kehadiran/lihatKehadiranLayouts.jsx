import React, { useState, useEffect } from 'react';
import { getKehadiranByKaryawan } from '../../../services/kehadiran.service';
import { getKaryawan } from '../../../services/karyawan.service';
import Table from '../../Elements/Table';
import Navbar from '../../Fragmen/Navbar';
import LogoutModal from '../../Fragmen/LogoutModal';

const LihatKehadiranLayouts = (props) => {
    const { user, onLogout } = props;
    const [karyawanId, setKaryawanId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [bulanAwal, setBulanAwal] = useState('');
    const [bulanAkhir, setBulanAkhir] = useState('');
    const [tahun, setTahun] = useState('');
    const [kehadiranData, setKehadiranData] = useState([]);
    const [karyawanData, setKaryawanData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
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
        // Fetch data karyawan
        getKaryawan((status, data) => {
            if (status) {
                setKaryawanData(data);
            } else {
                console.error('Failed to fetch karyawan data:', data);
            }
        });
    }, []);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowDropdown(true);
    };

    const handleKaryawanSelect = (karyawan) => {
        setKaryawanId(karyawan.id_karyawan);
        setSearchTerm(karyawan.nama_karyawan);
        setShowDropdown(false);
    };

    const filteredKaryawan = karyawanData.filter(karyawan =>
        karyawan.nama_karyawan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!karyawanId || !bulanAwal || !bulanAkhir || !tahun) {
            setError('Semua field harus diisi.');
            return;
        }
        setError('');
        console.log('Fetching data with:', { karyawanId, bulanAwal, bulanAkhir, tahun });
        if (karyawanId && bulanAwal && bulanAkhir && tahun) {
            getKehadiranByKaryawan(karyawanId, bulanAwal, bulanAkhir, tahun, (status, data) => {
                if (status) {
                    console.log('Data fetched successfully:', data);
                    const mergedData = data.map(kehadiran => {
                        const karyawan = karyawanData.find(k => k.id_karyawan === kehadiran.id_karyawan);
                        return {
                            ...kehadiran,
                            nama_karyawan: karyawan ? karyawan.nama_karyawan : 'Unknown'
                        };
                    });
                    setKehadiranData(mergedData);
                } else {
                    console.error('Failed to fetch data:', data);
                }
            });
        }
    };

    const columns = ["id_kehadiran", "id_karyawan", "nama_karyawan", "tanggal_kehadiran", "status"];

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Navbar.NavbarAdmin username={user?.username} onLogout={handleLogout} />
            
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
                        Lihat Kehadiran Karyawan
                    </h1>

                    <div className="bg-white border-4 border-black p-6 mb-8 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-400 border-4 border-black p-4 mb-6
                                    rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-black font-black uppercase">{error}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label className="block text-black font-black uppercase mb-2">
                                        Nama Karyawan
                                    </label>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        onFocus={() => setShowDropdown(true)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black font-bold focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                        placeholder="Cari nama karyawan..."
                                    />
                                    {showDropdown && searchTerm && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border-4 
                                            border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                            {filteredKaryawan.length > 0 ? (
                                                filteredKaryawan.map((karyawan) => (
                                                    <div
                                                        key={karyawan.id_karyawan}
                                                        className="px-4 py-3 hover:bg-yellow-400 cursor-pointer
                                                            font-bold border-b-4 border-black last:border-b-0"
                                                        onClick={() => handleKaryawanSelect(karyawan)}
                                                    >
                                                        {karyawan.nama_karyawan}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-black font-bold">
                                                    Tidak ada karyawan ditemukan
                                                </div>
                                            )}
                                        </div>
                                    )}
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
                            </div>

                            <div className="flex justify-center mt-8">
                                <button
                                    type="submit"
                                    className="bg-yellow-400 px-8 py-4 border-4 border-black 
                                        text-black font-black uppercase 
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                                        transform transition-transform"
                                >
                                    Cari Data
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
                            <div className="p-4">
                                <Table
                                    columns={columns}
                                    data={kehadiranData.map(entry => ({
                                        ...entry,
                                        tanggal_kehadiran: new Date(entry.tanggal_kehadiran).toLocaleString('id-ID', {
                                            timeZone: 'Asia/Jakarta',
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false
                                        })
                                    }))}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LihatKehadiranLayouts;