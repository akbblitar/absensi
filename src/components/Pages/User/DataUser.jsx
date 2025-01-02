import { useState, useEffect } from "react";
import UserDataLayouts from "../../Layouts/User/UserDataLayouts";
import { getUserFromToken } from "../../../services/auth.service";
import { getUser } from "../../../services/user.service";

const DataUser = () => {
    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = getUserFromToken(token);
            setUsername(user?.username);
        }
    }, []);

    useEffect(() => {
        if (username) {
            setLoading(true);
            getUser((status, data) => {
                if (status) {
                    setUserData(data);
                } else {
                    console.log("Error:", data);
                }
                setLoading(false);
            });
        }
    }, [username]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* <div className="p-4 sm:p-6 lg:p-8"> */}
                        {loading ? (
                            <div className="flex justify-center items-center h-48">
                                <p className="text-gray-500">Loading...</p>
                            </div>
                        ) : (
                            <UserDataLayouts 
                                userData={userData} 
                                username={username} 
                                onLogout={handleLogout}
                                className="w-full overflow-x-auto" 
                            />
                        )}
                    {/* </div> */}
                </div>
            {/* </div> */}
        </div>
    );
}

export default DataUser;