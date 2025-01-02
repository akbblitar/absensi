import { useState, useEffect } from "react";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import LogoutModal from '../Fragmen/LogoutModal';
import { getUserFromToken } from "../../services/auth.service";
import { FaUser, FaCalendar, FaClipboard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardKaryawan = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        hadir: 20,
        terlambat: 2,
        izin: 1,
        sisaCuti: 10
    });
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
            console.log('User Data:', userData);
        }
    }, []);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <DashboardLayouts user={user} onLogout={handleLogout}>
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />
            <div className="p-6 bg-yellow-50">
                {/* Welcome Section */}
                <div className="bg-blue-400 border-4 border-black p-6 mb-8 rotate-1
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                    <h2 className="text-3xl font-black text-black mb-2 uppercase">
                        Selamat Datang, {user?.username || 'Karyawan'}! 👋
                    </h2>
                    <p className="text-black font-bold">Dashboard Manajemen Kehadiran Anda</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Kehadiran Card */}
                    <div className="bg-green-400 border-4 border-black p-6 rotate-[-1deg]
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-black font-bold uppercase">Total Kehadiran</p>
                                <p className="text-3xl font-black text-black">{stats.hadir}</p>
                            </div>
                            <div className="bg-white border-4 border-black p-3">
                                <FaClipboard className="text-2xl text-black" />
                            </div>
                        </div>
                    </div>

                    {/* Keterlambatan Card */}
                    <div className="bg-yellow-400 border-4 border-black p-6 rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-black font-bold uppercase">Keterlambatan</p>
                                <p className="text-3xl font-black text-black">{stats.terlambat}</p>
                            </div>
                            <div className="bg-white border-4 border-black p-3">
                                <FaCalendar className="text-2xl text-black" />
                            </div>
                        </div>
                    </div>

                    {/* Izin Card */}
                    <div className="bg-pink-400 border-4 border-black p-6 rotate-[-1deg]
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-black font-bold uppercase">Izin</p>
                                <p className="text-3xl font-black text-black">{stats.izin}</p>
                            </div>
                            <div className="bg-white border-4 border-black p-3">
                                <FaCalendar className="text-2xl text-black" />
                            </div>
                        </div>
                    </div>

                    {/* Sisa Cuti Card */}
                    <div className="bg-purple-400 border-4 border-black p-6 rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-black font-bold uppercase">Sisa Cuti</p>
                                <p className="text-3xl font-black text-black">{stats.sisaCuti}</p>
                            </div>
                            <div className="bg-white border-4 border-black p-3">
                                <FaUser className="text-2xl text-black" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-black text-black mb-6 uppercase">Aktivitas Terakhir</h3>
                    <div className="space-y-6">
                        <div className="flex items-center border-b-4 border-black pb-4 hover:bg-yellow-50 p-4
                            transform transition-transform hover:-translate-x-1">
                            <div className="bg-blue-400 border-4 border-black p-2 mr-4
                                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <FaCalendar className="text-2xl text-black" />
                            </div>
                            <div>
                                <p className="font-bold text-black uppercase">Check-in hari ini</p>
                                <p className="text-black font-medium">08:00 WIB</p>
                            </div>
                        </div>
                        <div className="flex items-center border-b-4 border-black pb-4 hover:bg-yellow-50 p-4
                            transform transition-transform hover:-translate-x-1">
                            <div className="bg-green-400 border-4 border-black p-2 mr-4
                                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <FaClipboard className="text-2xl text-black" />
                            </div>
                            <div>
                                <p className="font-bold text-black uppercase">Check-out kemarin</p>
                                <p className="text-black font-medium">17:00 WIB</p>
                            </div>
                        </div>
                        <div className="flex items-center hover:bg-yellow-50 p-4
                            transform transition-transform hover:-translate-x-1">
                            <div className="bg-purple-400 border-4 border-black p-2 mr-4
                                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <FaCalendar className="text-2xl text-black" />
                            </div>
                            <div>
                                <p className="font-bold text-black uppercase">Pengajuan cuti diterima</p>
                                <p className="text-black font-medium">3 hari yang lalu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayouts>
    );
}

export default DashboardKaryawan;
