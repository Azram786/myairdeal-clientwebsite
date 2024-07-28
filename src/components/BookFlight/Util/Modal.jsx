import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`relative rounded-lg w-full max-w-7xl mx-auto z-10 bg-white transform ${
          isOpen ? "scale-100" : "scale-95"
        } transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-1 border-b">
          <div
            className="flex-grow"
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1 ml-4 flex-shrink-0"
          >
            <RiCloseCircleLine size={24} />
          </button>
        </div>
        <div className="p-3 max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-8rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
