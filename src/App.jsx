import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Pages/Login';
import DashboardAdmin from './components/Pages/DashboardAdmin';
import DashboardSupervisor from './components/Pages/DashboardSupervisor';
import DashboardKaryawan from './components/Pages/DashboardKaryawan';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Root route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard routes */}
        <Route path="/admin-dashboard/*" element={<DashboardAdmin />} />
        <Route path="/supervisor-dashboard/*" element={<DashboardSupervisor />} />
        <Route path="/karyawan-dashboard/*" element={<DashboardKaryawan />} />

        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;