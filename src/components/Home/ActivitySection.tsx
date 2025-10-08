import React from 'react';
import { Activity } from '../../types/Activity';
import { CheckCircle } from 'lucide-react';

interface ActivitySectionProps {
  activities: Activity[];
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
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

  if (activities.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          📊 最近のActivity
        </h2>
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">まだアクティビティがありません</p>
        </div>
      </section>
    );
  }

  const recentActivities = activities.slice(0, 5);

  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3">
        📊 最近のActivity
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
