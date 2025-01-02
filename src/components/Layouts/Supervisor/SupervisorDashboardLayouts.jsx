import React, { useState } from 'react';
import DashboardLayouts from '../DashboardLayouts';
import LogoutModal from '../../Fragmen/LogoutModal';

const SupervisorDashboardLayouts = ({ children }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    // Create a mock user object for the supervisor
    const supervisorUser = {
        role: 'Supervisor',
        username: localStorage.getItem('username') || 'Supervisor'
    };

    return (
        <DashboardLayouts 
            user={supervisorUser}
            onLogout={handleLogout}
        >
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />
            {children}
        </DashboardLayouts>
    );
};

export default SupervisorDashboardLayouts;
