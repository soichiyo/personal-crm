import React from "react";
import { Bell } from "lucide-react";

interface NotificationIconProps {
  unreadCount: number;
  onClick: () => void;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  unreadCount,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={`通知 ${unreadCount > 0 ? `${unreadCount}件の未読通知` : ""}`}
    >
      <Bell className="w-6 h-6 text-gray-600" />
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {unreadCount > 99 ? "99+" : unreadCount}
        </div>
      )}
    </button>
  );
};
