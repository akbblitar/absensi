import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Fragmen/Navbar";
import Button from "../../Elements/Button";
import Table from "../../Elements/Table";
import { getUserFromToken } from "../../../services/auth.service";
import { getPosisi, deletePosisi } from "../../../services/posisi.service";
import LogoutModal from "../../Fragmen/LogoutModal";

const PosisiLayouts = (props) => {
    const navigate = useNavigate();
    const columns = ["id_posisi", "nama_posisi", "aksi"];
    const [posisiData, setPosisiData] = useState([]);
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        getPosisi((status, data) => {
            if (status) {
                setPosisiData(data);
            }
        });
    }, []);

    const handleDelete = (id_posisi) => {
        deletePosisi(id_posisi, (status) => {
            if (status) {
                setPosisiData(posisiData.filter(posisi => posisi.id_posisi !== id_posisi));
            }
        });
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const renderActions = (id_posisi) => (
        <div className="flex gap-2">
            <Link 
                to={`/admin-dashboard/posisi/edit-posisi/${id_posisi}`} 
                className="px-4 py-2 bg-blue-400 text-black font-bold uppercase border-4 border-black
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform transition-transform"
            >
                Edit
            </Link>
            <button 
                onClick={() => handleDelete(id_posisi)} 
                className="px-4 py-2 bg-red-400 text-black font-bold uppercase border-4 border-black
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transform transition-transform"
            >
                Hapus
            </button>
        </div>
    );

    const dataWithActions = posisiData.map(posisi => ({
        ...posisi,
        aksi: renderActions(posisi.id_posisi)
    }));

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {user ? (
                user.role === "Admin" ? (
                    <Navbar.NavbarAdmin username={user.username} onLogout={handleLogout} />
                ) : (
                    <Navbar.NavbarKaryawan username={user.username} onLogout={handleLogout} />
                )
            ) : (
                <Navbar.NavbarKaryawan />
            )}

            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            <div className="flex-1 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white border-4 border-black p-6 mb-6 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <h1 className="text-3xl font-black text-black uppercase mb-6 md:mb-0 
                                bg-yellow-400 border-4 border-black p-4 inline-block rotate-1
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Data Posisi
                            </h1>
                            <Link to="/admin-dashboard/posisi/tambah-posisi">
                                <button className="px-6 py-3 bg-green-400 text-black font-black uppercase 
                                    border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                    hover:-translate-y-1 transform transition-transform">
                                    + Tambah Posisi
                                </button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="bg-white border-4 border-black 
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="overflow-x-auto p-4">
                                    <table className="min-w-full border-4 border-black">
                                        <thead>
                                            <tr className="bg-blue-400 border-b-4 border-black">
                                                {columns.map((column, index) => (
                                                    <th
                                                        key={index}
                                                        className="px-6 py-4 text-left text-black font-black 
                                                            uppercase tracking-wider border-r-4 border-black
                                                            last:border-r-0"
                                                    >
                                                        {column}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y-4 divide-black">
                                            {dataWithActions.map((row, rowIndex) => (
                                                <tr key={rowIndex} className="hover:bg-yellow-50">
                                                    {columns.map((column, colIndex) => (
                                                        <td 
                                                            key={colIndex}
                                                            className="px-6 py-4 text-black font-bold
                                                                border-r-4 border-black last:border-r-0"
                                                        >
                                                            {row[column]}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PosisiLayouts;