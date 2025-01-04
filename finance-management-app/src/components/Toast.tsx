import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-sm font-bold underline focus:outline-none"
      >
        Close
      </button>
    </div>
  );
};

export default Toast;
