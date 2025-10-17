import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

export type FlashType = "success" | "error" | "warning" | "info";

interface FlashProps {
  type: FlashType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // 表示時間（ミリ秒）
  actionText?: string; // アクションボタンのテキスト
  onAction?: () => void; // アクションボタンのクリックハンドラー
}

export const Flash: React.FC<FlashProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 2000,
  actionText,
  onAction,
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

  const bgColors: Record<FlashType, string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-600",
    info: "bg-blue-600",
  };

  const icons: Record<FlashType, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <div
      className={`absolute top-0 left-0 right-0 z-[9997] ${bgColors[type]} text-white px-4 py-3 shadow-lg animate-in slide-in-from-top duration-300`}
      role="alert"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9997,
        width: "100%",
        maxWidth: "393px",
        margin: "0 auto",
      }}
    >
      <div className="flex items-center justify-center gap-2 w-full">
        {icons[type]}
        <span className="font-medium text-sm">{message}</span>
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="ml-2 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-xs font-medium transition-colors"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};
