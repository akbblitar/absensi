import KaryawanLayouts from "../../Layouts/Karyawan/KaryawanLayouts";
import { getUserFromToken } from "../../../services/auth.service";
import { getKaryawan, deleteKaryawan } from "../../../services/karyawan.service";
import { getPosisi } from "../../../services/posisi.service";
import { useState, useEffect } from "react";

const DataKaryawan = () => {
    const [user, setUser] = useState(null);
    const [karyawan, setKaryawan] = useState([]);
    const [posisi, setPosisi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = getUserFromToken(token);
                setUser(userData);
            } catch (err) {
                setError('Gagal memuat data user');
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch karyawan data
                getKaryawan((status, data) => {
                    if (status) {
                        setKaryawan(data);
                    } else {
                        setError('Gagal memuat data karyawan');
                    }
                });

                // Fetch posisi data
                getPosisi((status, data) => {
                    if (status) {
                        setPosisi(data);
                    } else {
                        setError('Gagal memuat data posisi');
                    }
                });
            } catch (err) {
                setError('Terjadi kesalahan saat memuat data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const handleDelete = async (id_karyawan) => {
        try {
            deleteKaryawan(id_karyawan, (status) => {
                if (status) {
                    setKaryawan(prevData => prevData.filter(karyawan => karyawan.id_karyawan !== id_karyawan));
                } else {
                    setError('Gagal menghapus data karyawan');
                }
            });
        } catch (err) {
            setError('Terjadi kesalahan saat menghapus data');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg">Loading...</p>
        </div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen">
            <p className="text-red-500">{error}</p>
        </div>;
    }

    if (!user) {
        return <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg">User belum terdaftar</p>
        </div>;
    }

    return (
        <div className="min-h-screen">
            <KaryawanLayouts
                user={user}
                karyawanData={karyawan}
                posisiData={posisi}
                onLogout={handleLogout}
                onDelete={handleDelete}
                isMobile={windowWidth < 768}
            />
        </div>
    );
};

export default DataKaryawan;