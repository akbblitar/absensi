import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Fragmen/Navbar";
import { getUserFromToken } from "../../../services/auth.service";
import LogoutModal from '../../Fragmen/LogoutModal';
import axios from "axios";

const EditUserLayouts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: ""
    });
    const [error, setError] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }

        // Fetch user data
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/user/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (response.data.status) {
                    const userData = response.data.data;
                    setFormData({
                        username: userData.username,
                        password: "",
                        role: userData.role
                    });
                }
            } catch (err) {
                console.error("Error details:", err);
                setError(err.response?.data?.message || "Error fetching user data");
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/user/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (response.data.status) {
                navigate("/admin-dashboard/user");
            }
        } catch (err) {
            console.error("Update error details:", err);
            setError(err.response?.data?.message || "Error updating user");
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Navbar.NavbarAdmin username={user?.username} onLogout={handleLogout} />
            
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }}
            />

            <main className="flex-1 p-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-black text-black mb-8 uppercase 
                        bg-white border-4 border-black p-4 inline-block rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Edit User
                    </h1>

                    {error && (
                        <div className="bg-red-400 border-4 border-black p-4 mb-6 
                            rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-black font-black">{error}</p>
                        </div>
                    )}

                    <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-black font-black uppercase mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-4 border-black bg-white 
                                        text-black placeholder-gray-500 focus:outline-none
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                />
                            </div>

                            <div>
                                <label className="block text-black font-black uppercase mb-2">
                                    Password (Leave blank to keep current)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-4 border-black bg-white 
                                        text-black placeholder-gray-500 focus:outline-none
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                />
                            </div>

                            <div>
                                <label className="block text-black font-black uppercase mb-2">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-4 border-black bg-white 
                                        text-black focus:outline-none
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Supervisor">Supervisor</option>
                                    <option value="Karyawan">Karyawan</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin-dashboard/user")}
                                    className="bg-gray-200 px-6 py-3 border-4 border-black 
                                        font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:-translate-y-1 transform transition-transform"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-400 px-6 py-3 border-4 border-black 
                                        font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:-translate-y-1 transform transition-transform"
                                >
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditUserLayouts;