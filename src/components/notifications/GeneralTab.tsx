import React from 'react';
import { Notification } from '../../types/Notification';
import { ChevronRight } from 'lucide-react';

interface GeneralTabProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onNavigate?: (url: string) => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigate,
}) => {
  const generalNotifications = notifications.filter((n) => n.type === 'general');
  const unreadCount = generalNotifications.filter((n) => !n.read).length;

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    return `${days}日前`;
  };

  const handleCardClick = (notification: Notification) => {
    if (onMarkAsRead && !notification.read) {
      onMarkAsRead(notification.id);
    }
    if (onNavigate && notification.actionUrl) {
      onNavigate(notification.actionUrl);
    }
  };

  // const handleSwipeDelete = (_id: string) => {
  //   // Future: implement swipe-to-delete functionality
  // };

  if (generalNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">🔔</div>
        <p className="text-gray-500 text-sm">通知はありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Header with Mark All as Read */}
      {unreadCount > 0 && (
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">未読 {unreadCount}件</span>
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-gray-900 hover:underline"
          >
            すべて既読にする
          </button>
        </div>
      )}

      {/* Notification Cards */}
      <div className="space-y-2">
        {generalNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleCardClick(notification)}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              notification.read
                ? 'bg-white border-gray-200'
                : 'bg-gray-50 border-gray-300'
            } hover:bg-gray-100`}
          >
            <div className="flex items-start gap-3">
              {/* Unread Indicator */}
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {notification.message}
                </p>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(notification.timestamp)}
                </span>
              </div>

              {/* Action Icon */}
              {notification.actionUrl && (
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
