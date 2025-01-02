import { useState, useEffect } from "react";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import LogoutModal from '../Fragmen/LogoutModal';
import { getUserFromToken } from "../../services/auth.service";
import { FaUser, FaCalendar, FaClipboard, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardSupervisor = () => {
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
            <div className="p-6">
                {/* Welcome Section */}
                <div className="bg-blue-400 border-4 border-black p-6 mb-6 rotate-1
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-2xl font-black text-black uppercase mb-2">
                        Selamat Datang, {user?.username || 'Supervisor'}! 👋
                    </h2>
                    <p className="text-black font-bold">Dashboard Manajemen Kehadiran Anda</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Kehadiran Card */}
                    <div className="bg-white border-4 border-black p-6 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 
                        transform transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-black font-black uppercase">Total Kehadiran</p>
                                <p className="text-2xl font-black text-black">{stats.hadir}</p>
                            </div>
                            <div className="bg-green-400 border-4 border-black p-3">
                                <FaCheckCircle className="text-2xl text-black" />
                            </div>
                        </div>
                    </div>

                    {/* Keterlambatan Card */}
                    <div className="bg-white border-4 border-black p-6 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 
                        transform transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-black font-black uppercase">Keterlambatan</p>
                                <p className="text-2xl font-black text-black">{stats.terlambat}</p>
                            </div>
                            <div className="bg-yellow-400 border-4 border-black p-3">
                                <FaCalendar className="text-2xl text-black" />
                            </div>
                        </div>
                    </div>

                    {/* Izin Card */}
                    <div className="bg-white border-4 border-black p-6 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 
                        transform transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-black font-black uppercase">Izin</p>
                                <p className="text-2xl font-black text-black">{stats.izin}</p>
                            </div>
                            <div className="bg-blue-400 border-4 border-black p-3">
                                <FaCalendar className="text-2xl text-black" />
                            </div>
                        </div>
                    </div>

                    {/* Sisa Cuti Card */}
                    <div className="bg-white border-4 border-black p-6 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 
                        transform transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-black font-black uppercase">Sisa Cuti</p>
                                <p className="text-2xl font-black text-black">{stats.sisaCuti}</p>
                            </div>
                            <div className="bg-red-400 border-4 border-black p-3">
                                <FaUser className="text-2xl text-black" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-black uppercase mb-4">
                        Aktivitas Terakhir
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center border-b-4 border-black pb-4">
                            <div className="bg-blue-400 border-4 border-black p-2 mr-4">
                                <FaCalendar className="text-black" />
                            </div>
                            <div>
                                <p className="font-black text-black uppercase">Check-in hari ini</p>
                                <p className="font-bold text-black">08:00 WIB</p>
                            </div>
                        </div>
                        <div className="flex items-center border-b-4 border-black pb-4">
                            <div className="bg-green-400 border-4 border-black p-2 mr-4">
                                <FaCheckCircle className="text-black" />
                            </div>
                            <div>
                                <p className="font-black text-black uppercase">Check-out kemarin</p>
                                <p className="font-bold text-black">17:00 WIB</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-yellow-400 border-4 border-black p-2 mr-4">
                                <FaCalendar className="text-black" />
                            </div>
                            <div>
                                <p className="font-black text-black uppercase">Pengajuan cuti diterima</p>
                                <p className="font-bold text-black">3 hari yang lalu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />
        </DashboardLayouts>
    );
}

export default DashboardSupervisor;
