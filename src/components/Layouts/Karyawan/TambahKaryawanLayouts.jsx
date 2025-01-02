import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Fragmen/Navbar";
import { addKaryawan } from "../../../services/karyawan.service";

const TambahKaryawanLayouts = (props) => {
    const [namaKaryawan, setNamaKaryawan] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomorTelepon, setNomorTelepon] = useState('');
    const [email, setEmail] = useState('');
    const [idPosisi, setIdPosisi] = useState('');
    const [idUser, setIdUser] = useState('');
    const [tanggalBergabung, setTanggalBergabung] = useState('');
    const [addFailed, setAddFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi input
        if (!namaKaryawan || !alamat || !nomorTelepon || !email || !idPosisi || !idUser || !tanggalBergabung) {
            setErrorMessage('Semua kolom harus diisi.');
            return;
        }

        const karyawanData = {
            nama_karyawan: namaKaryawan,
            alamat: alamat,
            nomor_telepon: nomorTelepon,
            email: email,
            id_posisi: idPosisi,
            id_users: idUser,
            tanggal_bergabung: tanggalBergabung
        };

        console.log("Data Karyawan yang dikirim:", karyawanData); // Tambahkan console.log di sini

        addKaryawan(karyawanData, (status, data) => {
            if (status) {
                console.log("Respons dari server:", data); // Tambahkan console.log di sini
                alert("Karyawan berhasil ditambahkan!");
                navigate("/admin-dashboard/karyawan");
            } else {
                console.log("Error:", data); // Tambahkan console.log di sini
                setAddFailed(true);
                setErrorMessage('Gagal menambahkan karyawan.');
            }
        });
    };

    return (
        <div className="flex min-h-screen bg-yellow-50">
            <Navbar.NavbarAdmin username={props.username} onLogout={props.onLogout} />
            
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black text-black mb-8 uppercase 
                        bg-white border-4 border-black p-4 inline-block rotate-1
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Tambah Karyawan
                    </h1>

                    <div className="bg-white border-4 border-black p-6 rotate-[-0.5deg]
                        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {addFailed && (
                                <div className="bg-red-400 border-4 border-black p-4 mb-6 
                                    rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-black font-bold">{errorMessage}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        ID Posisi
                                    </label>
                                    <input
                                        type="text"
                                        value={idPosisi}
                                        onChange={(e) => setIdPosisi(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black placeholder-gray-500 focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-black font-bold uppercase">
                                        ID User
                                    </label>
                                    <input
                                        type="text"
                                        value={idUser}
                                        onChange={(e) => setIdUser(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black placeholder-gray-500 focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-black font-bold uppercase">
                                        Tanggal Bergabung
                                    </label>
                                    <input
                                        type="date"
                                        value={tanggalBergabung}
                                        onChange={(e) => setTanggalBergabung(e.target.value)}
                                        className="w-full px-4 py-3 border-4 border-black bg-white 
                                            text-black placeholder-gray-500 focus:outline-none
                                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                            transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin-dashboard/karyawan")}
                                    className="bg-gray-200 px-6 py-3 border-4 border-black 
                                        font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:-translate-y-1 transform transition-transform"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-400 px-6 py-3 border-4 border-black 
                                        font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                        hover:-translate-y-1 transform transition-transform"
                                >
                                    Tambah Karyawan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TambahKaryawanLayouts;