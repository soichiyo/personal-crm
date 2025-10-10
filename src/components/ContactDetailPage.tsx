import { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Mail, Phone, MapPin, Globe, Plus, Sparkles, Cake } from 'lucide-react';
import { Contact } from '../types/Contact';

interface ContactDetailPageProps {
  contact: Contact;
  onClose: () => void;
  onEdit: (contact: Contact) => void;
  onFollowUpClick?: () => void;
  autoOpenNoteInput?: boolean;
}

interface TimelineEntry {
  id: string;
  date: string;
  type: 'note' | 'linkedin' | 'contact_created' | 'birthday';
  content: string;
}

interface ActivityEntry {
  id: string;
  date: string;
  type: 'reminder_completed' | 'contact_created';
  content: string;
}

export const ContactDetailPage = ({ contact, onClose, onEdit, onFollowUpClick, autoOpenNoteInput = false }: ContactDetailPageProps) => {
  const [showNoteInput, setShowNoteInput] = useState(autoOpenNoteInput);
  const [noteText, setNoteText] = useState('');

  // Mock timeline data
  const [timeline, setTimeline] = useState<TimelineEntry[]>([
    {
      id: '1',
      date: '08.01',
      type: 'linkedin',
      content: 'LinkedInで投稿: 「この度私は...」',
    },
    {
      id: '2',
      date: '08.05',
      type: 'note',
      content: 'Note追加「会話で印象に残ったこと...」',
    },
  ]);

  // 誕生日をtimelineに自動追加
  useEffect(() => {
    if (contact.birthday) {
      const birthday = new Date(contact.birthday);
      const birthdayEntry: TimelineEntry = {
        id: 'birthday',
        date: `${String(birthday.getMonth() + 1).padStart(2, '0')}.${String(birthday.getDate()).padStart(2, '0')}`,
        type: 'birthday',
        content: `🎂 ${birthday.getFullYear()}年${birthday.getMonth() + 1}月${birthday.getDate()}日生まれ`,
      };

      // 既存のtimelineに誕生日エントリーがない場合のみ追加
      setTimeline(prev => {
        const hasBirthday = prev.some(entry => entry.type === 'birthday');
        if (!hasBirthday) {
          return [birthdayEntry, ...prev];
        }
        return prev;
      });
    }
  }, [contact.birthday]);

  // Mock activity data (V1: Reminder関連のアクティビティは非表示)
  const allActivities: ActivityEntry[] = [
    {
      id: '1',
      date: '08.25',
      type: 'reminder_completed',
      content: 'Reminder完了（フォロー済）',
    },
    {
      id: '2',
      date: '08.01',
      type: 'contact_created',
      content: 'Contact作成',
    },
  ];

  // Reminder関連のアクティビティをフィルタリング
  const activities = allActivities.filter(
    (activity) => activity.type !== 'reminder_completed'
  );

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    const newNote: TimelineEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' }),
      type: 'note',
      content: `Note追加「${noteText}」`,
    };

    setTimeline([newNote, ...timeline]);
    setNoteText('');
    setShowNoteInput(false);
  };

  const getSNSIcon = (platform: string) => {
    // SNSごとのアイコン表示（簡易版）
    return platform;
  };

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col overflow-hidden">
      {/* Screen Identifier */}
      <div className="bg-purple-400 px-3 py-1 flex items-center justify-center shrink-0">
        <span className="text-xs font-mono font-bold text-gray-900">
          MOB-CONTACT-DETAIL
        </span>
      </div>

      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={() => onEdit(contact)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Edit3 className="w-4 h-4" />
          編集
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="px-6 py-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl shrink-0 overflow-hidden">
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
              <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
              {contact.nameReading && (
                <p className="text-sm text-gray-500">{contact.nameReading}</p>
              )}
              {contact.title && (
                <p className="text-base text-gray-700 mt-1">{contact.title}</p>
              )}
              {contact.company && (
                <p className="text-sm text-gray-600 mt-1">{contact.company}</p>
              )}
              {contact.tagline && contact.tagline !== contact.title && (
                <p className="text-sm text-gray-700 mt-2 italic">{contact.tagline}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          {contact.bio && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{contact.bio}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            {contact.email && (
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href={`tel:${contact.phone}`} className="hover:underline">
                  {contact.phone}
                </a>
              </div>
            )}
          </div>

          {/* Organization Info */}
          {contact.organization && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">組織情報</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">{contact.organization.name}</span>
                </p>
                {contact.organization.title && (
                  <p className="text-gray-600">{contact.organization.title}</p>
                )}
                {contact.organization.address && (
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{contact.organization.address}</span>
                  </div>
                )}
                {contact.organization.url && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <a href={contact.organization.url} className="hover:underline">
                      {contact.organization.url}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SNS Links */}
          {contact.social && Object.values(contact.social).some(v => v) && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">SNS</h3>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(contact.social).map(([platform, url]) => {
                  if (!url) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-xs text-gray-600 capitalize">
                        {getSNSIcon(platform)}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Content URLs */}
          {contact.contentUrls && contact.contentUrls.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">コンテンツ</h3>
              <div className="space-y-2">
                {contact.contentUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    {url}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-100"></div>

        {/* Timeline Section */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Timeline</h2>
            <button
              onClick={() => setShowNoteInput(!showNoteInput)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Note Input */}
          {showNoteInput && (
            <div className="mb-4 bg-gray-50 rounded-lg p-4">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="ノートを追加..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
                rows={3}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setShowNoteInput(false);
                    setNoteText('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  追加
                </button>
              </div>
            </div>
          )}

          {/* Timeline Entries */}
          <div className="space-y-3">
            {timeline.map((entry) => (
              <div key={entry.id} className={`flex gap-3 text-sm ${entry.type === 'birthday' ? 'bg-pink-50 -mx-2 px-2 py-2 rounded-lg' : ''}`}>
                <span className="text-gray-500 font-medium min-w-[40px]">
                  {entry.date}
                </span>
                {entry.type === 'birthday' && (
                  <Cake className="w-4 h-4 text-pink-600 mt-0.5" />
                )}
                <p className={`${entry.type === 'birthday' ? 'text-pink-900 font-medium' : 'text-gray-700'}`}>
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-100"></div>

        {/* Activity Section */}
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Activity</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3 text-sm">
                <span className="text-gray-500 font-medium min-w-[40px]">
                  {activity.date}
                </span>
                <p className="text-gray-700">{activity.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-100"></div>

        {/* Action Section */}
        <div className="px-6 py-6">
          <button
            onClick={() => {
              if (onFollowUpClick) {
                onFollowUpClick();
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            <span>フォローアップ文章を作成</span>
          </button>
        </div>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};
