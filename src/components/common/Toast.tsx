import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // ミリ秒、デフォルト3000ms
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-l-green-600';
      case 'error':
        return 'border-l-red-600';
      case 'info':
        return 'border-l-blue-600';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top duration-300">
      <div
        className={`bg-white border-l-4 ${getBorderColor()} rounded-lg shadow-lg p-4 min-w-[300px] max-w-md flex items-start gap-3`}
      >
        {getIcon()}
        <p className="flex-1 text-sm text-gray-900">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          aria-label="Close toast"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};
