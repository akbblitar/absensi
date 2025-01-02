import { useState, useEffect } from "react";
import PosisiLayouts from "../../Layouts/Posisi/PosisiLayouts";
import { getUserFromToken } from "../../../services/auth.service";

const DataPosisi = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
    }, []);

    if (!user) {
        return <p>User belum terdaftar</p>;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return <PosisiLayouts user={user} onLogout={handleLogout} />;
}

export default DataPosisi;