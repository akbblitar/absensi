import React, { useState } from "react";
import Navbar from "../Fragmen/Navbar";
import LogoutModal from '../Fragmen/LogoutModal';
import { useNavigate } from 'react-router-dom';

const DashboardLayouts = ({ user, children, onLogout }) => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-red-400 border-4 border-black p-8 rotate-2
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-2xl font-black text-black uppercase">
                        User data tidak ditemukan!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {user.role === 'Admin' ? (
                <Navbar.NavbarAdmin username={user.username} onLogout={handleLogout} />
            ) : user.role === 'Supervisor' ? (
                <Navbar.NavbarSupervisor username={user.username} onLogout={handleLogout} />
            ) : user.role === 'Karyawan' ? (
                <Navbar.NavbarKaryawan username={user.username} onLogout={handleLogout} />
            ) : (
                <div className="bg-red-400 border-4 border-black p-8 rotate-2
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-2xl font-black text-black uppercase">
                        Role tidak valid!
                    </p>
                </div>
            )}
            
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-black uppercase 
                                bg-yellow-400 border-4 border-black p-4 inline-block rotate-1
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Dashboard {user.role}
                            </h1>
                        </div>
                        
                        <div className="bg-white border-4 border-black p-6 
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DashboardLayouts;
