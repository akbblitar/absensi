import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../../../services/auth.service';
import { addPengajuanIzin } from '../../../services/pengajuanIzin.service';
import IzinLayouts from '../../Layouts/izin/IzinLayouts';

const BuatIzin = () => {
    const [user, setUser] = useState(null);
    const [tanggal, setTanggal] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tanggal || !keterangan || !file) {
            setError('Semua field harus diisi');
            return;
        } else {
            setError('');
        }

        const newData = new FormData();
        newData.append('id_karyawan', user.id_user);
        newData.append('tanggal', tanggal);
        newData.append('keterangan', keterangan);
        newData.append('file', file);

        addPengajuanIzin(newData, (statusAdd, dataAdd) => {
            if (statusAdd) {
                navigate('/karyawan-dashboard/pengajuan-izin');
            } else {
                setError('Gagal menambahkan data pengajuan izin');
            }
        });
    };

    return (
        <IzinLayouts>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="tanggal" className="form-label">Tanggal</label>
                    <input type="date" className="form-control" id="tanggal" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="keterangan" className="form-label">Keterangan</label>
                    <textarea className="form-control" id="keterangan" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Berkas</label>
                    <input type="file" className="form-control" id="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="text-danger">{error}</div>
                <button type="submit" className="btn btn-primary">Simpan</button>
            </form>
        </IzinLayouts>
    );
};

export default BuatIzin;
