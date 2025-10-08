import React from 'react';
import { Notification } from '../../types/Notification';
import { Contact } from '../../types/Contact';
import { Search, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface AISearchTabProps {
  notifications?: Notification[];
  contacts?: Contact[];
  onViewResults?: (contactId: string) => void;
  onManualAdd?: (contactId: string) => void;
}

export const AISearchTab: React.FC<AISearchTabProps> = ({
  notifications = [],
  contacts = [],
  onViewResults,
  onManualAdd,
}) => {
  const aiSearchNotifications = notifications.filter(
    (n) => n.type === 'ai-search'
  );

  const getStatusIcon = (status?: Contact['aiSearchStatus']) => {
    switch (status) {
      case 'pending':
        return <Search className="w-5 h-5 text-gray-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusEmoji = (status?: Contact['aiSearchStatus']) => {
    switch (status) {
      case 'pending':
        return '🔍';
      case 'processing':
        return '⏳';
      case 'completed':
        return '✅';
      case 'failed':
        return '⚠️';
      default:
        return '❌';
    }
  };

  const getStatusText = (status?: Contact['aiSearchStatus']) => {
    switch (status) {
      case 'pending':
        return '検索待機中';
      case 'processing':
        return '検索中...';
      case 'completed':
        return '検索完了';
      case 'failed':
        return '検索失敗';
      default:
        return '不明';
    }
  };

  if (aiSearchNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-500 text-sm">AI検索の通知はありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {aiSearchNotifications.map((notification) => {
        const contact = contacts.find((c) => c.id.toString() === notification.contactId);
        const status = contact?.aiSearchStatus;

        return (
          <div
            key={notification.id}
            className="p-4 rounded-lg border border-gray-200 bg-white"
          >
            <div className="flex items-start gap-3">
              {/* Status Icon */}
              <div className="text-2xl flex-shrink-0">
                {getStatusEmoji(status)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  {getStatusIcon(status)}
                  <span className="text-xs text-gray-500">
                    {getStatusText(status)}
                  </span>
                </div>

                {/* Action Buttons */}
                {status === 'completed' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onViewResults && notification.contactId && onViewResults(notification.contactId)
                      }
                      className="px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                    >
                      確認する
                    </button>
                  </div>
                )}

                {status === 'failed' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onManualAdd && notification.contactId && onManualAdd(notification.contactId)
                      }
                      className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-900 rounded hover:bg-gray-200 transition-colors"
                    >
                      手動で追加
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
