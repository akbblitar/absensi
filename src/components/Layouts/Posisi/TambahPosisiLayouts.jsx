import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPosisi } from '../../../services/posisi.service';
import InputForm from '../../Elements/Input/index';
import Navbar from '../../Fragmen/Navbar';
import { getUserFromToken } from '../../../services/auth.service';

const TambahPosisiLayouts = (props) => {
    const [namaPosisi, setNamaPosisi] = useState('');
    const [addFailed, setAddFailed] = useState(false);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!namaPosisi) {
            setErrorMessage('Nama Posisi tidak boleh kosong');
            return;
        }
        try {
            await addPosisi({ nama_posisi: namaPosisi }, (status, data) => {
                if (status) {
                    alert("Posisi berhasil ditambahkan!");
                    navigate("/admin-dashboard/posisi");
                } else {
                    console.log("Error:", data);
                    setAddFailed(true);
                }
            });
        } catch (error) {
            console.error('Failed to add posisi', error);
            setAddFailed(true);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Navbar.NavbarAdmin username={user?.username} onLogout={handleLogout} />
            <main className="flex-1 p-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-black text-black mb-8 uppercase 
                        bg-white border-4 border-black p-4 inline-block rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Tambah Posisi
                    </h1>

                    <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {addFailed && (
                                <div className="bg-red-400 border-4 border-black p-4 
                                    rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-black font-black uppercase">
                                        Gagal menambahkan posisi
                                    </p>
                                </div>
                            )}
                            
                            {errorMessage && (
                                <div className="bg-red-400 border-4 border-black p-4 
                                    rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-black font-black uppercase">
                                        {errorMessage}
                                    </p>
                                </div>
                            )}

                            <div className="mb-6">
                                <label className="block text-black font-black uppercase mb-2">
                                    Nama Posisi
                                </label>
                                <input
                                    type="text"
                                    value={namaPosisi}
                                    onChange={(e) => {
                                        setNamaPosisi(e.target.value);
                                        setErrorMessage('');
                                    }}
                                    className="w-full px-4 py-3 border-4 border-black bg-white 
                                        text-black font-bold focus:outline-none
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                        transition-all duration-200"
                                    placeholder="Masukkan nama posisi"
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
                                    Tambah Posisi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TambahPosisiLayouts;