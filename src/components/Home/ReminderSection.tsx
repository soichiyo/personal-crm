import React from 'react';
import { Reminder } from '../../types/Reminder';
import { Contact } from '../../types/Contact';
import { Clock } from 'lucide-react';

interface ReminderSectionProps {
  reminders: Reminder[];
  contacts: Contact[];
  onComplete?: (id: string) => void;
  onPostpone?: (id: string) => void;
}

export const ReminderSection: React.FC<ReminderSectionProps> = ({
  reminders,
  contacts,
  onComplete,
  onPostpone,
}) => {
  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id.toString() === contactId);
    return contact ? contact.name : `連絡先${contactId}`;
  };
  const todayReminders = reminders.filter((r) => {
    const today = new Date();
    const dueDate = new Date(r.dueDate);
    return (
      !r.completed &&
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  });

  if (todayReminders.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          今日のイベント
        </h2>
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">今日のイベントはありません</p>
          <p className="text-xs text-gray-400 mt-1">いい一日を！</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
        今日のイベント
        <span className="text-xs font-normal text-gray-500">
          ({todayReminders.length}件)
        </span>
      </h2>

      <div className="space-y-2">
        {todayReminders.map((reminder) => (
          <div
            key={reminder.id}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {reminder.type === 'birthday' && '🎂 '}
                  {getContactName(reminder.contactId)}さん
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {reminder.type === 'birthday' ? '誕生日です！' : 'フォローアップの時期です'}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onComplete && onComplete(reminder.id)}
                className="flex-1 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                ✓ 完了
              </button>
              <button
                onClick={() => onPostpone && onPostpone(reminder.id)}
                className="flex-1 px-3 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                ⏰ 延期
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
