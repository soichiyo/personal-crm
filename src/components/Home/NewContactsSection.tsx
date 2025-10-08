import React from 'react';
import { Contact } from '../../types/Contact';
import { Calendar, Tag } from 'lucide-react';

interface NewContactsSectionProps {
  contacts: Contact[];
  onArchive?: (id: number) => void;
  onKeepInTouch?: (id: number) => void;
  onLater?: (id: number) => void;
  onCardClick?: (id: number) => void;
}

export const NewContactsSection: React.FC<NewContactsSectionProps> = ({
  contacts,
  onArchive,
  onKeepInTouch,
  onLater,
  onCardClick,
}) => {
  const newContacts = contacts.filter((c) => c.status === 'new');

  if (newContacts.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          📇 新着コンタクト
        </h2>
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">新着コンタクトはありません</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
        新着コンタクト
        <span className="text-xs font-normal text-gray-500">
          未整理: {newContacts.length}件
        </span>
      </h2>

      <div className="space-y-3">
        {newContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            {/* カード内容 */}
            <div
              className="mb-4 cursor-pointer hover:bg-gray-50 -m-4 p-4 rounded-t-xl transition-colors"
              onClick={() => onCardClick && onCardClick(contact.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{contact.avatar}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{contact.title}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {contact.company}
                  </p>
                </div>
              </div>

              {/* メタ情報 */}
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(contact.createdDate).toLocaleDateString('ja-JP', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                {contact.metLocation && (
                  <span className="truncate">📍 {contact.metLocation}</span>
                )}
              </div>

              {/* タグ */}
              {contact.tags && contact.tags.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  <Tag className="w-3 h-3 text-gray-400" />
                  {contact.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* アクションボタン */}
            <div className="flex gap-2">
              <button
                onClick={() => onLater && onLater(contact.id)}
                className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                ⏰ あとで
              </button>
              <button
                onClick={() => onKeepInTouch && onKeepInTouch(contact.id)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                💌 連絡する
              </button>
              <button
                onClick={() => onArchive && onArchive(contact.id)}
                className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                🗄️ アーカイブ
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
