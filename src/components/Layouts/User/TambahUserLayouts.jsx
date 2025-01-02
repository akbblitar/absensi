import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../services/user.service";
import { addKaryawan } from "../../../services/karyawan.service";
import { getUserFromToken } from "../../../services/auth.service";
import Navbar from "../../Fragmen/Navbar";

const TambahUserLayouts = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [addFailed, setAddFailed] = useState(false);
    const [loggedInUsername, setLoggedInUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = getUserFromToken(token);
            setLoggedInUsername(userData.username);
        }
    }, []);

    const roles = [
        { value: "Admin", label: "Admin" },
        { value: "Supervisor", label: "Supervisor" },
        { value: "Karyawan", label: "Karyawan" }
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser({ username, role, password }, async (status, userData) => {
                if (status) {
                    if (role === "Karyawan") {
                        // Jika role adalah Karyawan, tambahkan entry di tabel karyawan
                        const karyawanData = {
                            id_user: userData.id_user, // ID user yang baru dibuat
                            nama: username, // Gunakan username sebagai nama awal
                            tempat_lahir: "",
                            tanggal_lahir: "",
                            jenis_kelamin: "",
                            alamat: "",
                            no_hp: "",
                            id_posisi: null // Posisi akan diisi nanti
                        };
                        
                        await addKaryawan(karyawanData, (karyawanStatus, karyawanData) => {
                            if (karyawanStatus) {
                                alert("User dan data karyawan berhasil ditambahkan! Silahkan lengkapi data karyawan.");
                                navigate("/admin-dashboard/karyawan");
                            } else {
                                console.log("Error menambahkan karyawan:", karyawanData);
                                alert("User berhasil ditambahkan tetapi gagal membuat data karyawan. Silahkan tambahkan data karyawan secara manual.");
                                navigate("/admin-dashboard/user");
                            }
                        });
                    } else {
                        alert("User berhasil ditambahkan!");
                        navigate("/admin-dashboard/user");
                    }
                } else {
                    console.log("Error:", userData);
                    setAddFailed(true);
                }
            });
        } catch (error) {
            console.error('Failed to add user', error);
            setAddFailed(true);
        }
    };

    return (
        <div className="flex min-h-screen bg-yellow-50">
            <Navbar.NavbarAdmin username={loggedInUsername} onLogout={handleLogout} />
            
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black text-black mb-8 uppercase 
                        bg-white border-4 border-black p-4 inline-block rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Tambah User
                    </h1>

                    <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {addFailed && (
                                <div className="bg-red-400 border-4 border-black p-4 mb-6 
                                    rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-black font-bold">Gagal menambahkan user</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-6">
                                <div className="mb-6">
                                    <label className="block mb-2 text-black font-black uppercase">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black placeholder-gray-500 focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                        placeholder="Masukkan username"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-black font-black uppercase">
                                        Role
                                    </label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                    >
                                        <option value="">Pilih Role</option>
                                        {roles.map((roleOption) => (
                                            <option key={roleOption.value} value={roleOption.value}
                                                className="font-bold">
                                                {roleOption.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-black font-black uppercase">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black placeholder-gray-500 focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                        placeholder="Masukkan password"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin-dashboard/user")}
                                    className="bg-gray-200 px-6 py-3 border-4 border-black 
                                        font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:-translate-y-1 transform transition-transform"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-400 px-6 py-3 border-4 border-black 
                                        font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:-translate-y-1 transform transition-transform"
                                >
                                    Tambah User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TambahUserLayouts;