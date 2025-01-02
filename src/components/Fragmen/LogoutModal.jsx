import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border-4 border-black p-8 rotate-1
                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 
                        bg-red-400 border-4 border-black mb-6">
                        <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-black text-black uppercase mb-4">Konfirmasi Logout</h3>
                    <p className="text-black font-bold mb-8">Apakah Anda yakin ingin keluar dari akun?</p>
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-200 border-4 border-black text-black 
                            font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                            hover:-translate-y-1 transform transition-transform"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-3 bg-red-400 border-4 border-black text-black 
                            font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                            hover:-translate-y-1 transform transition-transform"
                    >
                        Ya, Keluar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
