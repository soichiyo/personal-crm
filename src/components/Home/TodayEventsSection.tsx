import React from 'react';
import { Contact } from '../../types/Contact';
import { Cake } from 'lucide-react';

interface TodayEventsSectionProps {
  contacts: Contact[];
  onCardClick: (contactId: number) => void;
}

export const TodayEventsSection: React.FC<TodayEventsSectionProps> = ({
  contacts,
  onCardClick,
}) => {
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // 今日が誕生日の人を抽出
  const birthdayContacts = contacts.filter((contact) => {
    if (!contact.birthday) return false;
    const birthday = new Date(contact.birthday);
    return birthday.getMonth() === todayMonth && birthday.getDate() === todayDate;
  });

  if (birthdayContacts.length === 0) {
    return null; // 誕生日の人がいない場合は表示しない
  }

  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Cake className="w-5 h-5 text-pink-500" />
        今日のイベント
      </h2>

      <div className="space-y-3">
        {birthdayContacts.map((contact) => {
          const age = contact.birthday
            ? today.getFullYear() - new Date(contact.birthday).getFullYear()
            : null;

          return (
            <div
              key={contact.id}
              onClick={() => onCardClick(contact.id)}
              className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-2xl overflow-hidden shrink-0">
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
                  <div className="flex items-center gap-2 mb-1">
                    <Cake className="w-4 h-4 text-pink-600" />
                    <h3 className="font-semibold text-gray-900">
                      {contact.name}さんの誕生日
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    🎂 {age ? `${age}歳` : ''}のお誕生日おめでとうございます！
                  </p>
                  <p className="text-xs text-gray-600">
                    {contact.company} · {contact.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
