import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Fragmen/Navbar";
import Button from "../../Elements/Button";
import InputForm from "../../Elements/Input/index";
import { cariGajiById, updateGaji } from "../../../services/gaji.service";
import { getUserFromToken } from "../../../services/auth.service";

const EditGajiLayouts = (props) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id_karyawan: "",
        gaji: ""
    });
    const [user, setUser] = useState(null);
    const [editFailed, setEditFailed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }

        cariGajiById(id, (status, data) => {
            if (status) {
                console.log("Data Gaji:", data); // Tambahkan console.log di sini
                if (data && data.length > 0) {
                    const gajiData = data[0]; // Asumsikan data adalah array dan ambil elemen pertama
                    setFormData({
                        id_karyawan: gajiData.id_karyawan,
                        gaji: gajiData.gaji
                    });
                    console.log("Form Data:", {
                        id_karyawan: gajiData.id_karyawan,
                        gaji: gajiData.gaji
                    }); // Tambahkan console.log di sini
                } else {
                    console.log("Data Gaji tidak ditemukan");
                    setEditFailed(true);
                }
            } else {
                console.log("Error:", data);
                setEditFailed(true);
            }
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateGaji(id, formData, (status, data) => {
            if (status) {
                alert("Gaji berhasil diperbarui!");
                navigate("/admin-dashboard/gaji");
            } else {
                console.log("Error:", data);
                setEditFailed(true);
            }
        });
    };

    return (
        <div className="flex min-h-screen">
            <Navbar.NavbarAdmin username={user?.username} onLogout={props.onLogout} />
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Gaji</h1>
                <form onSubmit={handleSubmit}>
                    {editFailed && <p className="text-red-500 text-sm">Gagal memperbarui gaji</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_karyawan">
                            ID Karyawan
                        </label>
                        <input
                            id="id_karyawan"
                            name="id_karyawan"
                            type="text"
                            value={formData.id_karyawan}
                            readOnly
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
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
                        type="submit">Perbarui Gaji</Button>
                </form>
            </main>
        </div>
    );
};

export default EditGajiLayouts;