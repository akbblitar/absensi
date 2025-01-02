import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditUserLayouts from "../../Layouts/User/EditUserLayouts";
import { getUserFromToken } from "../../../services/auth.service"; // Perbarui jalur impor
import { getUserById, editUser } from "../../../services/user.service";

const EditUser = () => {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState(null);
    const { id: userId } = useParams(); // Menggunakan useParams untuk mendapatkan userId
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = getUserFromToken(token);
            setUsername(user?.username);
        }
    }, []);

    useEffect(() => {
        if (username) {
            getUserById(userId, (status, data) => {
                if (status) {
                    setUserData(data);
                } else {
                    console.log("Error:", data);
                }
            });
        }
    }, [username, userId]);

    const handleEditUser = async (updatedData) => {
        try {
            await editUser(userId, updatedData);
            alert("User berhasil diedit!");
            navigate("/admin-dashboard/user"); // Arahkan ke halaman DataUser
        } catch (error) {
            console.log("Error:", error);
            alert("Terjadi kesalahan saat mengedit user.");
        }
    };

    return (
        <EditUserLayouts userData={userData} onEditUser={handleEditUser} onLogout={() => navigate("/")} />
    );
}

export default EditUser;