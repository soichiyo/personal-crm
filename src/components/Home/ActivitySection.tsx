import React from 'react';
import { Activity, ActivityType } from '../../types/Activity';
import { CheckCircle, MessageCircle, Mail, Cake, FileText } from 'lucide-react';
import { TimelineSettings } from '../../types/TimelineSettings';
import { Contact } from '../../types/Contact';

interface ActivitySectionProps {
  activities: Activity[];
  contacts: Contact[];
  timelineSettings?: TimelineSettings;
  onActivityClick?: (activity: Activity, contact: Contact | undefined) => void;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
  contacts,
  timelineSettings,
  onActivityClick,
}) => {
  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    if (days < 7) return `${days}日前`;
    return new Date(timestamp).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getContact = (contactId: string) => {
    return contacts.find((c) => c.id.toString() === contactId);
  };

  const getActionIcon = (type: ActivityType) => {
    switch (type) {
      case 'note-added':
        return <FileText className="w-3 h-3 text-blue-600" />;
      case 'follow-up-sent':
      case 'email-received':
        return <Mail className="w-3 h-3 text-green-600" />;
      case 'birthday':
        return <Cake className="w-3 h-3 text-pink-600" />;
      case 'meeting':
        return <MessageCircle className="w-3 h-3 text-purple-600" />;
      default:
        return <CheckCircle className="w-3 h-3 text-green-600" />;
    }
  };

  // タイムラインイベント（人生の出来事）を設定に基づいてフィルタリング
  const timelineEventTypes: ActivityType[] = ['birthday', 'promotion', 'marriage', 'childbirth', 'job-change', 'new-product'];

  const filteredActivities = activities.filter((activity) => {
    // タイムラインイベントでない場合は常に表示
    if (!timelineEventTypes.includes(activity.type)) {
      return true;
    }

    // タイムラインイベントの場合は設定をチェック
    if (timelineSettings) {
      return timelineSettings.enabledEvents.includes(activity.type as any);
    }

    // 設定がない場合はすべて表示
    return true;
  });

  if (filteredActivities.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          最近のアクティビティ
        </h2>
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">まだアクティビティがありません</p>
        </div>
      </section>
    );
  }

  const recentActivities = filteredActivities.slice(0, 5);

  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3">
        最近のアクティビティ
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {recentActivities.map((activity) => {
          const contact = getContact(activity.contactId);
          return (
            <div
              key={activity.id}
              className="px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer active:bg-gray-100"
              onClick={() => onActivityClick?.(activity, contact)}
            >
              {/* ユーザーアバター + アクションアイコン */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg overflow-hidden">
                  {contact?.photoUrl ? (
                    <img
                      src={contact.photoUrl}
                      alt={contact.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{contact?.avatar || '👤'}</span>
                  )}
                </div>
                {/* アクションタイプのバッジ */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-gray-200">
                  {getActionIcon(activity.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {getRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
