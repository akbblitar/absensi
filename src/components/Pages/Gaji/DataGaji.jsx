import { useState, useEffect } from "react";
import GajiLayouts from "../../Layouts/Gaji/GajiLayouts";
import { getUserFromToken } from "../../../services/auth.service";
import { getGaji } from "../../../services/gaji.service";
import { getKaryawan } from "../../../services/karyawan.service";

const DataGaji = (props) => {
    const [gaji, setGaji] = useState([]);
    const [karyawan, setKaryawan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }

        getGaji((status, data) => {
            if (status) {
                setGaji(data);
                setLoading(false);
            }
        });

        getKaryawan((status, data) => {
            if (status) {
                setKaryawan(data);
            }
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirect to login page
    };

    return (
        <GajiLayouts
            gajiData={gaji}
            karyawanData={karyawan}
            user={user}
            loading={loading}
            onLogout={handleLogout}
        />
    );
};

export default DataGaji;