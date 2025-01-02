import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Fragmen/Navbar";
import Button from "../../Elements/Button";
import Table from "../../Elements/Table";
import { getUserFromToken } from "../../../services/auth.service";
import { getGaji, deleteGaji } from "../../../services/gaji.service";
import { getKaryawan } from "../../../services/karyawan.service";
import LogoutModal from "../../Fragmen/LogoutModal";

const GajiLayouts = (props) => {
    const navigate = useNavigate();
    const columns = ["id_gaji", "nama_karyawan", "gaji", "aksi"];
    const [gajiData, setGajiData] = useState([]);
    const [karyawanData, setKaryawanData] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        getGaji((status, data) => {
            if (status) {
                setGajiData(data);
            }
            setLoading(false);
        });
        getKaryawan((status, data) => {
            if (status) {
                setKaryawanData(data);
            }
        });
    }, []); // Empty dependency array ensures this runs only once

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDelete = (id_gaji) => {
        deleteGaji(id_gaji, (status) => {
            if (status) {
                setGajiData(gajiData.filter(gaji => gaji.id_gaji !== id_gaji));
            }
        });
    };

    const renderActions = (id_gaji) => (
        <div className="flex flex-col sm:flex-row gap-2">
            <Link 
                to={`/admin-dashboard/gaji/edit-gaji/${id_gaji}`} 
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center text-sm"
            >
                Edit
            </Link>
            <button 
                onClick={() => handleDelete(id_gaji)} 
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
            >
                Hapus
            </button>
        </div>
    );

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const mergedData = gajiData.map(gaji => {
        const karyawan = karyawanData.find(k => k.id_karyawan === gaji.id_karyawan);
        return {
            ...gaji,
            nama_karyawan: karyawan ? karyawan.nama_karyawan : 'Unknown',
            gaji: formatRupiah(gaji.gaji),
            aksi: renderActions(gaji.id_gaji)
        };
    });

    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
            <Navbar.NavbarAdmin username={user?.username} onLogout={handleLogout} />
            
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            <main className="flex-1 p-4 sm:p-8">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Data Gaji</h1>
                        <Link to="/admin-dashboard/gaji/tambah-gaji" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 transition-colors">
                                <span className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Tambah Gaji
                                </span>
                            </Button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <Table columns={columns} data={mergedData} loading={loading} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default GajiLayouts;