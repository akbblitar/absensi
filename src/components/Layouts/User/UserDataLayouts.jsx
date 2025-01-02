import React, { useState } from "react";
import Navbar from "../../Fragmen/Navbar";
import Button from "../../Elements/Button";
import Table from "../../Elements/Table";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../../Fragmen/LogoutModal";

const UserDataLayouts = (props) => {
    const { userData, username } = props;
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const columns = ["id_user", "username", "role", "aksi"];

    const dataWithActions = userData.map(user => ({
        ...user,
        aksi: (
            <Link to={`/admin-dashboard/user/edit-user/${user.id_user}`} 
                  className="text-blue-500 hover:underline">
                Edit
            </Link>
        )
    }));

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen w-screen bg-gray-50">
            <Navbar.NavbarAdmin username={username} onLogout={handleLogout} />
            
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            <div className="flex-1 w-full">
                <div className="p-4 md:p-8">
                    <h1 className="text-2xl font-bold mb-10">Data User</h1>
                    <Link to="/admin-dashboard/user/tambah-user">
                        <Button className="mb-6 bg-black text-white px-6 py-2 rounded-lg">
                            Tambah User
                        </Button>
                    </Link>
                    <div className="bg-white rounded-lg shadow-sm w-full">
                        <div className="overflow-x-auto w-full">
                            <Table 
                                columns={columns} 
                                data={dataWithActions}
                                className="w-full"
                                headerClassName="bg-gray-600 text-white"
                                bodyClassName="bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDataLayouts;