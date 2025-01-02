import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './components/Pages/Login.jsx';
import DashboardAdmin from './components/Pages/DashboardAdmin.jsx';
import DashboardKaryawan from './components/Pages/DashboardKaryawan.jsx';
import DataUser from './components/Pages/User/DataUser.jsx';
import EditUser from './components/Pages/User/EditUser.jsx';
import DataKaryawan from './components/Pages/Karyawan/DataKaryawan.jsx';
import DataPosisi from './components/Pages/Posisi/DataPosisi.jsx';
import TambahUser from './components/Pages/User/TambahUser.jsx';
import DataGaji from './components/Pages/Gaji/DataGaji.jsx';
import EditKaryawan from './components/Pages/Karyawan/EditKaryawan.jsx';
import TambahKaryawan from './components/Pages/Karyawan/TambahKaryawan.jsx';
import TambahGaji from './components/Pages/Gaji/TambahGaji.jsx';
import EditGaji from './components/Pages/Gaji/EditGaji.jsx';
import LihatKehadiran from './components/Pages/kehadiran/lihatKehadiran.jsx';
import BuatKehadiranKaryawan from './components/Pages/kehadiran/BuatKehadiranKaryawan.jsx';
import LihatKehadiranKaryawanSendiri from './components/Pages/kehadiran/lihatKehadiranKaryawanSendiri.jsx';
import TambahPosisi from './components/Pages/Posisi/TambahPosisi.jsx';
import PengajuanIzinLayouts from './components/Layouts/izin/pengajuanizinLayouts';
import PersetujuanIzinLayouts from './components/Layouts/izin/PersetujuanizinLayouts.jsx';
import DashboardSupervisor from './components/Pages/DashboardSupervisor.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  // {
  //   path: '/login',
  //   element: 
  // },
  {
    path: '/admin-dashboard',
    element: <DashboardAdmin />,
  },
  {
    path: '/karyawan-dashboard',
    element: <DashboardKaryawan />,
  },
  {
    path: '/admin-dashboard/user',
    element: <DataUser />,
  },
  {
    path: '/admin-dashboard/user/edit-user/:id',
    element: <EditUser />,
  },
  {
    path: '/admin-dashboard/karyawan',
    element: <DataKaryawan />,
  },
  {
    path: '/admin-dashboard/posisi',
    element: <DataPosisi />,
  },
  {
    path: '/admin-dashboard/user/tambah-user',
    element: <TambahUser />,
  },
  {
    path: '/admin-dashboard/gaji',
    element: <DataGaji />,
  },
  {
    path: '/admin-dashboard/gaji/tambah-gaji',
    element: <TambahGaji />,
  },
  {
    path: '/admin-dashboard/gaji/edit-gaji/:id',
    element: <EditGaji />,
  },
  {
    path: '/admin-dashboard/karyawan/edit-karyawan/:id',
    element: <EditKaryawan />,
  },
  {
    path: '/admin-dashboard/karyawan/tambah-karyawan',
    element: <TambahKaryawan />
  },
  {
    path: '/admin-dashboard/kehadiran',
    element: <LihatKehadiran />,
  },
  {
    path: '/karyawan-dashboard/buat-kehadiran',
    element: <BuatKehadiranKaryawan />,
  },
  {
    path: '/karyawan-dashboard/kehadiran-saya',
    element: <LihatKehadiranKaryawanSendiri />,
  },
  {
    path: '/admin-dashboard/posisi/tambah-posisi',
    element: <TambahPosisi />,
  },
  {
    path: '/karyawan-dashboard/pengajuan-izin',
    element: <PengajuanIzinLayouts />,
  },
  {
    path: '/admin-dashboard/persetujuan-izin',
    element: <PersetujuanIzinLayouts />,
  },
  {
    path: '/supervisor-dashboard',
    element: <DashboardSupervisor />,
  },
  {
    path: '/supervisor-dashboard/kehadiran',
    element: <LihatKehadiran />,
  },
  {
    path: '/supervisor-dashboard/persetujuan-izin',
    element: <PersetujuanIzinLayouts />,
  },
  {
    path: '/supervisor-dashboard/pengajuan-izin',
    element: <PengajuanIzinLayouts />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);