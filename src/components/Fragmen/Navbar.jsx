import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaBriefcase, FaMoneyBill, FaCalendarCheck, FaUserCheck, FaUserClock, FaClipboardList, FaClipboardCheck, FaBars } from "react-icons/fa";
import Button from "../Elements/Button";

const NavbarAdmin = (props) => {
    const { username, onLogout } = props;
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Tambahkan handler untuk menutup menu saat klik di luar navbar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (windowWidth < 768 && isOpen) {
                // Periksa apakah klik terjadi di luar navbar dan tombol menu
                if (!event.target.closest('#navbar-admin') && !event.target.closest('#menu-button')) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, windowWidth]);

    const navClasses = `${windowWidth < 768 
        ? `fixed top-0 left-0 w-full h-full bg-yellow-400 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50 border-r-4 border-black`
        : 'bg-yellow-400 text-black w-64 min-h-screen border-r-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
    }`;

    return (
        <>
            {windowWidth < 768 && (
                <button 
                    id="menu-button"
                    onClick={toggleMenu}
                    className="fixed top-4 left-4 z-50 p-2 bg-blue-400 text-black border-4 border-black
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform transition-transform"
                >
                    <FaBars size={24} />
                </button>
            )}
            <aside id="navbar-admin" className={navClasses}>
                <div className="p-6 flex flex-col h-full">
                    <h1 className="text-2xl font-black mb-8 text-black uppercase rotate-2
                        border-4 border-black bg-white p-4 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Dashboard Admin
                    </h1>
                    
                    <nav className="flex flex-col space-y-4">
                        <Link
                            to="/admin-dashboard"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/admin-dashboard" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/admin-dashboard")}
                        >
                            <FaHome className="mr-2" size={24} /> Dashboard
                        </Link>
                        <Link
                            to="/admin-dashboard/user"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/admin-dashboard/user" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/admin-dashboard/user")}
                        >
                            <FaUser className="mr-2" size={24} /> User
                        </Link>
                        <Link
                            to="/admin-dashboard/karyawan"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/admin-dashboard/karyawan" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/admin-dashboard/karyawan")}
                        >
                            <FaUsers className="mr-2" size={24} /> Karyawan
                        </Link>
                        <Link
                            to="/admin-dashboard/posisi"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/admin-dashboard/posisi" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/admin-dashboard/posisi")}
                        >
                            <FaBriefcase className="mr-2" size={24} /> Posisi
                        </Link>
                        <Link
                            to="/admin-dashboard/gaji"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/admin-dashboard/gaji" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/admin-dashboard/gaji")}
                        >
                            <FaMoneyBill className="mr-2" size={24} /> Gaji
                        </Link>
                        <Link
                            to="/admin-dashboard/kehadiran"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/admin-dashboard/kehadiran" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/admin-dashboard/kehadiran")}
                        >
                            <FaCalendarCheck className="mr-2" size={24} /> Lihat Kehadiran
                        </Link>
                        {/* <Link
                            to="/admin-dashboard/persetujuan-izin"
                            className={`flex items-center font-semibold text-white text-base px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${activeLink === "/admin-dashboard/persetujuan-izin" ? "bg-blue-700 bg-opacity-50" : ""}`}
                            onClick={() => handleLinkClick("/admin-dashboard/persetujuan-izin")}
                        >
                            <FaClipboardCheck className="mr-2" size={24} /> Persetujuan Izin
                        </Link> */}
                    </nav>
                    <div className="mt-auto">
                        <p className="font-black text-black text-xl mb-4 uppercase">
                            Hai, {username}
                        </p>
                        <button
                            onClick={onLogout}
                            className="w-full bg-red-400 border-4 border-black text-black font-black 
                                uppercase py-3 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:-translate-y-1 transform transition-transform"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

const NavbarKaryawan = (props) => {
    const { username, onLogout } = props;
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Tambahkan handler untuk menutup menu saat klik di luar navbar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (windowWidth < 768 && isOpen) {
                // Periksa apakah klik terjadi di luar navbar dan tombol menu
                if (!event.target.closest('#navbar-karyawan') && !event.target.closest('#menu-button-karyawan')) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, windowWidth]);

    const navClasses = `${windowWidth < 768 
        ? `fixed top-0 left-0 w-full h-full bg-blue-400 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50 border-r-4 border-black`
        : 'bg-blue-400 text-black w-64 min-h-screen border-r-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
    }`;

    return (
        <>
            {windowWidth < 768 && (
                <button 
                    id="menu-button-karyawan"
                    onClick={toggleMenu}
                    className="fixed top-4 left-4 z-50 p-2 bg-blue-400 text-black border-4 border-black
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform transition-transform"
                >
                    <FaBars size={24} />
                </button>
            )}
            <aside id="navbar-karyawan" className={navClasses}>
                <div className="p-6 flex flex-col h-full">
                    <h1 className="text-2xl font-black mb-8 text-black uppercase rotate-2
                        border-4 border-black bg-white p-4 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Dashboard Karyawan
                    </h1>
                    
                    <nav className="flex flex-col space-y-4">
                        <Link
                            to="/karyawan-dashboard"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/karyawan-dashboard" 
                                    ? "bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/karyawan-dashboard")}
                        >
                            <FaHome className="mr-2" size={24} /> Dashboard
                        </Link>
                        <Link
                            to="/karyawan-dashboard/buat-kehadiran"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/karyawan-dashboard/kehadiran" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/karyawan-dashboard/kehadiran")}
                        >
                            <FaUserCheck className="mr-2" size={24} /> Kehadiran
                        </Link>
                        <Link
                            to="/karyawan-dashboard/kehadiran-saya"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/karyawan-dashboard/kehadiran-saya" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/karyawan-dashboard/kehadiran-saya")}
                        >
                            <FaUserClock className="mr-2" size={24} /> Lihat Kehadiran
                        </Link>
                        <Link
                            to="/karyawan-dashboard/pengajuan-izin"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/karyawan-dashboard/pengajuan-izin" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/karyawan-dashboard/pengajuan-izin")}
                        >
                            <FaClipboardList className="mr-2" size={24} /> Pengajuan Izin
                        </Link>
                    </nav>
                    <div className="mt-auto">
                        <p className="font-black text-black text-xl mb-4 uppercase">
                            Hai, {username}
                        </p>
                        <button
                            onClick={onLogout}
                            className="w-full bg-red-400 border-4 border-black text-black font-black 
                                uppercase py-3 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:-translate-y-1 transform transition-transform"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

const NavbarSupervisor = (props) => {
    const { username, onLogout } = props;
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (windowWidth < 768 && isOpen) {
                if (!event.target.closest('#navbar-supervisor') && !event.target.closest('#menu-button-supervisor')) {
                    setIsOpen(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, windowWidth]);

    const navClasses = `${windowWidth < 768 
        ? `fixed top-0 left-0 w-full h-full bg-green-400 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50 border-r-4 border-black`
        : 'bg-green-400 text-black w-64 min-h-screen border-r-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
    }`;

    return (
        <>
            {windowWidth < 768 && (
                <button 
                    id="menu-button-supervisor"
                    onClick={toggleMenu}
                    className="fixed top-4 left-4 z-50 p-2 bg-blue-400 text-black border-4 border-black
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform transition-transform"
                >
                    <FaBars size={24} />
                </button>
            )}
            <aside id="navbar-supervisor" className={navClasses}>
                <div className="p-6 flex flex-col h-full">
                    <h1 className="text-2xl font-black mb-8 text-black uppercase rotate-2
                        border-4 border-black bg-white p-4 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Dashboard Supervisor
                    </h1>
                    
                    <nav className="flex flex-col space-y-4">
                        <Link
                            to="/supervisor-dashboard"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/supervisor-dashboard" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/supervisor-dashboard")}
                        >
                            <FaHome className="mr-2" size={24} /> Dashboard
                        </Link>
                        
                        <Link
                            to="/supervisor-dashboard/persetujuan-izin"
                            className={`flex items-center font-black text-black uppercase px-4 py-3 
                                border-4 border-black transition-transform hover:-translate-y-1
                                ${activeLink === "/supervisor-dashboard/persetujuan-izin" 
                                    ? "bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
                            onClick={() => handleLinkClick("/supervisor-dashboard/persetujuan-izin")}
                        >
                            <FaClipboardCheck className="mr-2" size={24} /> Persetujuan Izin
                        </Link>
                    </nav>
                    <div className="mt-auto">
                        <p className="font-black text-black text-xl mb-4 uppercase">
                            Hai, {username}
                        </p>
                        <button
                            onClick={onLogout}
                            className="w-full bg-red-400 border-4 border-black text-black font-black 
                                uppercase py-3 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:-translate-y-1 transform transition-transform"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

const Navbar = {
    NavbarAdmin,
    NavbarKaryawan,
    NavbarSupervisor
};

export default Navbar;