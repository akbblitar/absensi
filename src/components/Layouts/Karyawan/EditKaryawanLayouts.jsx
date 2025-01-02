import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getKaryawanById, editKaryawan } from '../../../services/karyawan.service';
import { getUserFromToken } from '../../../services/auth.service';
import Navbar from '../../Fragmen/Navbar';

const EditKaryawanLayouts = (props) => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [idKaryawan, setIdKaryawan] = useState('');
    const [namaKaryawan, setNamaKaryawan] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomorTelepon, setNomorTelepon] = useState('');
    const [email, setEmail] = useState('');
    const [idPosisi, setIdPosisi] = useState('');
    const [editFailed, setEditFailed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = getUserFromToken(token);
            setUser(user);
        }
    }, []);

    useEffect(() => {
        if (props.karyawanData) {
            const { id_karyawan, nama_karyawan, alamat, nomor_telepon, email, id_posisi } = props.karyawanData;
            setIdKaryawan(id_karyawan);
            setNamaKaryawan(nama_karyawan);
            setAlamat(alamat);
            setNomorTelepon(nomor_telepon);
            setEmail(email);
            setIdPosisi(id_posisi);
            setLoading(false);
        }
    }, [props.karyawanData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await props.onEditKaryawan({ nama_karyawan: namaKaryawan, alamat, nomor_telepon: nomorTelepon, email, id_posisi: idPosisi });
            console.log('Karyawan edited successfully');
        } catch (error) {
            console.error('Failed to edit karyawan', error);
            setEditFailed(true);
        }
    };

    return (
        <div className="flex min-h-screen bg-yellow-50">
            <Navbar.NavbarAdmin username={user?.username} onLogout={props.onLogout} />
            
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black text-black mb-8 uppercase 
                        bg-white border-4 border-black p-4 inline-block rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Edit Karyawan
                    </h1>

                    {loading ? (
                        <div className="bg-white border-4 border-black p-8 rotate-2
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-2xl font-black text-black uppercase">Loading...</p>
                        </div>
                    ) : (
                        <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {editFailed && (
                                    <div className="bg-red-400 border-4 border-black p-4 mb-6 
                                        rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <p className="text-black font-bold">{editFailed}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="mb-6">
                                        <label className="block mb-2 text-black font-bold uppercase">
                                            ID Karyawan
                                        </label>
                                        <input
                                            type="text"
                                            value={idKaryawan}
                                            onChange={(e) => setIdKaryawan(e.target.value)}
                                            disabled
                                            className="w-full px-4 py-3 border-4 border-black bg-gray-100 
                                                text-black placeholder-gray-500 focus:outline-none
                                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block mb-2 text-black font-bold uppercase">
                                            Nama Karyawan
                                        </label>
                                        <input
                                            type="text"
                                            value={namaKaryawan}
                                            onChange={(e) => setNamaKaryawan(e.target.value)}
                                            className="w-full px-4 py-3 border-4 border-black bg-white 
                                                text-black placeholder-gray-500 focus:outline-none
                                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                                transition-all duration-200"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block mb-2 text-black font-bold uppercase">
                                            Alamat
                                        </label>
                                        <input
                                            type="text"
                                            value={alamat}
                                            onChange={(e) => setAlamat(e.target.value)}
                                            className="w-full px-4 py-3 border-4 border-black bg-white 
                                                text-black placeholder-gray-500 focus:outline-none
                                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                                transition-all duration-200"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block mb-2 text-black font-bold uppercase">
                                            Nomor Telepon
                                        </label>
                                        <input
                                            type="text"
                                            value={nomorTelepon}
                                            onChange={(e) => setNomorTelepon(e.target.value)}
                                            className="w-full px-4 py-3 border-4 border-black bg-white 
                                                text-black placeholder-gray-500 focus:outline-none
                                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                                transition-all duration-200"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block mb-2 text-black font-bold uppercase">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 border-4 border-black bg-white 
                                                text-black placeholder-gray-500 focus:outline-none
                                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                                transition-all duration-200"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block mb-2 text-black font-bold uppercase">
                                            Posisi
                                        </label>
                                        <select
                                            value={idPosisi}
                                            onChange={(e) => setIdPosisi(e.target.value)}
                                            className="w-full px-4 py-3 border-4 border-black bg-white 
                                                text-black focus:outline-none
                                                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                                transition-all duration-200"
                                        >
                                            <option value="">Pilih Posisi</option>
                                            {props.posisiData && props.posisiData.map((posisi) => (
                                                <option key={posisi.id_posisi} value={posisi.id_posisi}>
                                                    {posisi.nama_posisi}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="bg-gray-200 px-6 py-3 border-4 border-black 
                                            font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:-translate-y-1 transform transition-transform"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-400 px-6 py-3 border-4 border-black 
                                            font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:-translate-y-1 transform transition-transform"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditKaryawanLayouts;