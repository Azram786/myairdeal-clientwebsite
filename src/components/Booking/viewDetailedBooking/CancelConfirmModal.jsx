import React, { useState, useEffect } from 'react';
import ReactToast from '../../util/ReactToast';

const CancelConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    if (!isModalOpen) return null;

    const handleConfirm = () => {
        console.log("nithin")
        // if (!selection) ReactToast("choose yes or no")
        // else {


            onConfirm(selection);

            onClose();
            // ReactToast("Cancel Request sent sucessfully!")
        // }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                {/* <div className="flex justify-center space-x-4">
                    <button
                        className={`px-4 py-2 rounded ${selection === 'yes' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                            } hover:bg-green-600 hover:text-white transition-colors`}
                        onClick={() => setSelection('yes')}
                    >
                        Yes
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${selection === 'no' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                            } hover:bg-red-600 hover:text-white transition-colors`}
                        onClick={() => setSelection('no')}
                    >
                        No
                    </button>
                </div> */}
                <div className="mt-6 text-center">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={handleConfirm}
                    // disabled={!selection}
                    >
                        Confirm
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CancelConfirmModal;