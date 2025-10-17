import React from 'react';
import { Modal } from './common/Modal';
import { Activity } from '../types/Activity';
import { Contact } from '../types/Contact';
import { FileText, Mail, Cake, MessageCircle, CheckCircle } from 'lucide-react';

interface ActivityDetailModalProps {
  isOpen: boolean;
  activity: Activity | null;
  contact: Contact | null;
  onClose: () => void;
  onViewContact?: () => void; // Homeから開いた場合のみ表示
  messageContent?: string; // メッセージ内容（オプション）
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  isOpen,
  activity,
  contact,
  onClose,
  onViewContact,
  messageContent,
}) => {
  if (!activity || !contact) return null;

  const getActivityIcon = () => {
    switch (activity.type) {
      case 'note-added':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'follow-up-sent':
      case 'email-received':
        return <Mail className="w-6 h-6 text-green-600" />;
      case 'birthday':
        return <Cake className="w-6 h-6 text-pink-600" />;
      case 'meeting':
        return <MessageCircle className="w-6 h-6 text-purple-600" />;
      default:
        return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
  };

  const getActivityTitle = () => {
    switch (activity.type) {
      case 'note-added':
        return 'メモ';
      case 'follow-up-sent':
        return 'フォローアップメッセージ';
      case 'email-received':
        return 'メール受信';
      case 'birthday':
        return 'お祝いメッセージ';
      case 'meeting':
        return 'ミーティング';
      default:
        return 'アクティビティ';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getActivityTitle()}>
      <div className="space-y-4">
        {/* Screen Identifier */}
        <div className="bg-purple-50 border border-purple-200 px-3 py-1 flex items-center justify-center rounded-lg -mx-6 -mt-4 mb-4">
          <span className="text-xs font-mono font-semibold text-purple-900">
            MOB-ACTIVITY-DETAIL
          </span>
        </div>

        {/* コンタクト情報 */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl overflow-hidden">
            {contact.photoUrl ? (
              <img
                src={contact.photoUrl}
                alt={contact.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{contact.avatar}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {contact.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {contact.title} {contact.company && `at ${contact.company}`}
            </p>
          </div>
        </div>

        {/* アクティビティアイコンとタイプ */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 rounded-lg">
            {getActivityIcon()}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{getActivityTitle()}</h4>
            <p className="text-xs text-gray-500">
              {new Date(activity.timestamp).toLocaleString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* 詳細内容 */}
        <div className="border-t border-gray-200 pt-4">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">詳細</h5>
          <p className="text-sm text-gray-900">{activity.description}</p>
        </div>

        {/* メッセージ内容（あれば） */}
        {messageContent && (
          <div className="border-t border-gray-200 pt-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">
              メッセージ内容
            </h5>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-900 whitespace-pre-wrap">
              {messageContent}
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <div className="border-t border-gray-200 pt-4 space-y-2">
          {onViewContact && (
            <button
              onClick={onViewContact}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              {contact.name}さんのページを見る
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            閉じる
          </button>
        </div>
      </div>
    </Modal>
  );
};
