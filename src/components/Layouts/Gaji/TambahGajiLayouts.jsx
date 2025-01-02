import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Fragmen/Navbar";
import Button from "../../Elements/Button";
import InputForm from "../../Elements/Input/index";
import { tambahGaji } from "../../../services/gaji.service";
import { getKaryawan } from "../../../services/karyawan.service";
import { getUserFromToken } from "../../../services/auth.service";

const TambahGajiLayouts = (props) => {
    const [karyawanData, setKaryawanData] = useState([]);
    const [formData, setFormData] = useState({
        id_karyawan: "",
        gaji: ""
    });
    const [user, setUser] = useState(null);
    const [addFailed, setAddFailed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }

        getKaryawan((status, data) => {
            if (status) {
                setKaryawanData(data);
            }
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        tambahGaji(formData, (status, data) => {
            if (status) {
                alert("Gaji berhasil ditambahkan!");
                navigate("/admin-dashboard/gaji");
            } else {
                console.log("Error:", data);
                setAddFailed(true);
            }
        });
    };

    return (
        <div className="flex min-h-screen">
            <Navbar.NavbarAdmin username={user?.username} onLogout={props.onLogout} />
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tambah Gaji</h1>
                <form onSubmit={handleSubmit}>
                    {addFailed && <p className="text-red-500 text-sm">Gagal menambahkan gaji</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_karyawan">
                            Karyawan
                        </label>
                        <select
                            id="id_karyawan"
                            name="id_karyawan"
                            value={formData.id_karyawan}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Pilih Karyawan</option>
                            {karyawanData.map((karyawan) => (
                                <option key={karyawan.id_karyawan} value={karyawan.id_karyawan}>
                                    {karyawan.nama_karyawan}
                                </option>
                            ))}
                        </select>
                    </div>
                    <InputForm
                        label="Gaji"
                        name="gaji"
                        type="number"
                        value={formData.gaji}
                        onChange={handleChange}
                    />
                    <Button
                        variant="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-base w-full"
                        type="submit">Tambah Gaji</Button>
                </form>
            </main>
        </div>
    );
};

export default TambahGajiLayouts;