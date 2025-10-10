import React from 'react';
import { Activity, ActivityType } from '../../types/Activity';
import { CheckCircle } from 'lucide-react';
import { TimelineSettings } from '../../types/TimelineSettings';

interface ActivitySectionProps {
  activities: Activity[];
  timelineSettings?: TimelineSettings;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
  timelineSettings,
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
        {recentActivities.map((activity) => (
          <div key={activity.id} className="px-4 py-3 flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {getRelativeTime(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
