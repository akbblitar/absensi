import React, { useState, useEffect } from "react";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import { getUserFromToken } from "../../services/auth.service";
import LogoutModal from '../Fragmen/LogoutModal';

const DashboardAdmin = () => {
    const [user, setUser] = useState(null);
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
        window.location.href = '/';
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-red-400 border-4 border-black p-8 rotate-2
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-2xl font-black text-black uppercase">
                        User belum terdaftar
                    </p>
                </div>
            </div>
        );
    }

    return (
        <DashboardLayouts user={user} onLogout={handleLogout}>
            <div className="p-6 space-y-8">
                {/* Header Section */}
                <div className="bg-blue-400 border-4 border-black p-8 rotate-1
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-3xl font-black text-black uppercase mb-4">
                        Selamat Datang, {user.username || 'Admin'} 👋
                    </h2>
                    <p className="text-black font-bold">
                        Kelola karyawan dan aktivitas perusahaan Anda di sini
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white border-4 border-black p-6 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 
                        transform transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-400 border-4 border-black p-3">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-black font-black uppercase">Total Karyawan</p>
                                <p className="text-2xl font-black text-black">150</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-4 border-black p-6 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 
                        transform transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-400 border-4 border-black p-3">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-black font-black uppercase">Kehadiran Hari Ini</p>
                                <p className="text-2xl font-black text-black">85%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-4 border-black p-6 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 
                        transform transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="bg-yellow-400 border-4 border-black p-3">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-black font-black uppercase">Tugas Aktif</p>
                                <p className="text-2xl font-black text-black">24</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-4 border-black p-6 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 
                        transform transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="bg-red-400 border-4 border-black p-3">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-black font-black uppercase">Performa</p>
                                <p className="text-2xl font-black text-black">92%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Employee List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <div className="bg-white border-4 border-black rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="p-6 border-b-4 border-black">
                            <h3 className="text-xl font-black text-black uppercase">
                                Aktivitas Terbaru
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-3 h-3 bg-green-400 border-2 border-black"></div>
                                <div className="flex-1">
                                    <p className="text-black font-bold">Budi mengajukan cuti</p>
                                    <p className="text-black font-bold">2 jam yang lalu</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-3 h-3 bg-blue-400 border-2 border-black"></div>
                                <div className="flex-1">
                                    <p className="text-black font-bold">Ani menyelesaikan tugas</p>
                                    <p className="text-black font-bold">3 jam yang lalu</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-3 h-3 bg-yellow-400 border-2 border-black"></div>
                                <div className="flex-1">
                                    <p className="text-black font-bold">Rapat tim development</p>
                                    <p className="text-black font-bold">5 jam yang lalu</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employee List */}
                    <div className="bg-white border-4 border-black rotate-[0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="p-6 border-b-4 border-black">
                            <h3 className="text-xl font-black text-black uppercase">
                                Karyawan Terbaru
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-4">
                                <img src="https://ui-avatars.com/api/?name=John+Doe" 
                                    alt="John Doe" 
                                    className="w-10 h-10 border-2 border-black" 
                                />
                                <div>
                                    <p className="font-black text-black">John Doe</p>
                                    <p className="font-bold text-black">Web Developer</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="px-3 py-1 text-black font-black uppercase 
                                        bg-green-400 border-2 border-black">
                                        Active
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img src="https://ui-avatars.com/api/?name=Jane+Smith" 
                                    alt="Jane Smith" 
                                    className="w-10 h-10 border-2 border-black" 
                                />
                                <div>
                                    <p className="font-black text-black">Jane Smith</p>
                                    <p className="font-bold text-black">UI Designer</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="px-3 py-1 text-black font-black uppercase 
                                        bg-green-400 border-2 border-black">
                                        Active
                                    </span>
                                </div>
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
};

export default DashboardAdmin;