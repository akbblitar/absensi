import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditKaryawanLayouts from "../../Layouts/Karyawan/EditKaryawanLayouts";
import { getUserFromToken } from "../../../services/auth.service";
import { getKaryawanById, editKaryawan } from "../../../services/karyawan.service";
import { getPosisi } from "../../../services/posisi.service";

const EditKaryawan = () => {
    const [karyawanData, setKaryawanData] = useState(null);
    const [posisiData, setPosisiData] = useState([]);
    const [username, setUsername] = useState(null);
    const { id: karyawanId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = getUserFromToken(token);
            setUsername(user?.username);
        }
    }, []);

    useEffect(() => {
        if (username) {
            // Get karyawan data
            getKaryawanById(karyawanId, (status, data) => {
                if (status) {
                    setKaryawanData(data[0]);
                } else {
                    console.log("Error:", data);
                }
            });

            // Get posisi data
            getPosisi((status, data) => {
                if (status) {
                    setPosisiData(data);
                } else {
                    console.log("Error:", data);
                }
            });
        }
    }, [username, karyawanId]);

    const handleEditKaryawan = async (updatedData) => {
        try {
            await editKaryawan(karyawanId, updatedData);
            alert("Karyawan berhasil diedit!");
            navigate("/admin-dashboard/karyawan");
        } catch (error) {
            console.log("Error:", error);
            alert("Terjadi kesalahan saat mengedit karyawan.");
        }
    };

    return (
        <EditKaryawanLayouts 
            karyawanData={karyawanData} 
            posisiData={posisiData}
            onEditKaryawan={handleEditKaryawan} 
            onLogout={() => navigate("/")} 
        />
    );
}

export default EditKaryawan;