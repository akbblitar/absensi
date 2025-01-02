import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    const navigate = useNavigate();

    const handleConfirm = () => {
        localStorage.removeItem('token');
        onClose();
        navigate('/'); // Akan di-redirect ke home yang kemudian akan redirect ke login
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white border-4 border-black p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                max-w-md w-full mx-4 rotate-[-0.5deg]">
                <h2 className="text-2xl font-black text-black mb-4 uppercase">Konfirmasi Logout</h2>
                <p className="text-black font-bold mb-6">Apakah Anda yakin ingin keluar?</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 border-4 border-black font-black 
                            uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                            hover:-translate-y-1 transform transition-transform"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-400 border-4 border-black font-black 
                            uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                            hover:-translate-y-1 transform transition-transform"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
