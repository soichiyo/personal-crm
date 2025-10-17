import { useState } from "react";
import {
  User,
  Users,
  Home,
  Settings,
  Link2,
  Check,
  Plus,
  Cake,
  StickyNote,
  Heart,
} from "lucide-react";
import { Contact } from "../types/Contact";
import { Notification } from "../types/Notification";
import { Reminder } from "../types/Reminder";
import { Activity } from "../types/Activity";
import { AddModal } from "./AddModal";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationModal } from "./NotificationModal";
import { ContactDetailPage } from "./ContactDetailPage";
import { FollowUpModal } from "./FollowUpModal";
import { AddNoteModal } from "./AddNoteModal";
import {
  TimelineSettings,
  defaultTimelineSettings,
} from "../types/TimelineSettings";
import { TimelineSettingsSection } from "./Settings/TimelineSettingsSection";

interface DesktopViewProps {
  contacts: Contact[];
  notifications: Notification[];
  reminders?: Reminder[];
  activities?: Activity[];
}

export const DesktopView = ({
  contacts: initialContacts,
  notifications: initialNotifications,
  activities: initialActivities = [],
}: DesktopViewProps) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0] || null);
  const [currentSidebarItem, setCurrentSidebarItem] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [notifications] = useState(initialNotifications);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [activities, setActivities] = useState(initialActivities);

  // モーダル管理
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [followUpMessageType, setFollowUpMessageType] = useState<"thank-you" | "birthday">("thank-you");

  // Timeline settings state
  const [timelineSettings, setTimelineSettings] = useState<TimelineSettings>(
    defaultTimelineSettings
  );

  // Activity追加
  const addActivity = (description: string, contactId?: string) => {
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      contactId: contactId || "",
      type: "note-added",
      description,
      timestamp: new Date(),
    };
    setActivities([newActivity, ...activities]);
  };

  // アーカイブ処理
  const handleArchive = (id: number) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      addActivity(`${contact.name}さんを後で見ることにしました`);
    }
    setContacts(
      contacts.map((c) =>
        c.id === id ? { ...c, status: "archived" as const } : c
      )
    );
  };

  const renderMainContent = () => {
    if (currentSidebarItem === "home") {
      // 誕生日コンタクト
      const birthdayContacts = contacts.filter((contact) => {
        if (!contact.birthday) return false;
        if (contact.birthdayMessageSent) return false;

        const today = new Date();
        const birthday = new Date(contact.birthday);
        const thisYearBirthday = new Date(
          today.getFullYear(),
          birthday.getMonth(),
          birthday.getDate()
        );
        const diffTime = thisYearBirthday.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays >= 0 && diffDays <= 7;
      });

      // 新着コンタクト
      const newContacts = contacts.filter((c) => c.status === "new");

      return (
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* 誕生日セクション */}
            {birthdayContacts.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Cake className="w-5 h-5 text-gray-600" />
                  今日のイベント
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {birthdayContacts.map((contact) => {
                    const age = contact.birthday
                      ? new Date().getFullYear() -
                        new Date(contact.birthday).getFullYear()
                      : null;

                    return (
                      <div
                        key={contact.id}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                      >
                        <div
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowContactDetail(true);
                          }}
                          className="mb-3 cursor-pointer hover:bg-gray-50 -m-4 p-4 rounded-t-xl transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl overflow-hidden shrink-0">
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
                                <Cake className="w-4 h-4 text-gray-600" />
                                <h3 className="font-semibold text-gray-900">
                                  {contact.name}さんの誕生日
                                </h3>
                              </div>
                              <p className="text-sm text-gray-700 mb-1">
                                🎂 {age ? `${age}歳` : ""}のお誕生日おめでとうございます！
                              </p>
                              <p className="text-xs text-gray-600">
                                {contact.company} · {contact.title}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setFollowUpMessageType("birthday");
                            setShowCelebrationModal(true);
                          }}
                          className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                          <Heart className="w-4 h-4" />
                          お祝いを送る
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 新着コンタクトセクション */}
            {newContacts.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  新着コンタクト
                  <span className="text-sm font-normal text-gray-500">
                    未整理: {newContacts.length}件
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                      <div
                        className="mb-3 cursor-pointer hover:bg-gray-50 -m-4 p-4 rounded-t-xl transition-colors"
                        onClick={() => {
                          setSelectedContact(contact);
                          setShowContactDetail(true);
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl overflow-hidden shrink-0">
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
                            <h3 className="text-base font-bold text-gray-900 truncate">
                              {contact.name}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">{contact.title}</p>
                            <p className="text-xs text-gray-500 truncate">
                              {contact.company}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowAddNoteModal(true);
                          }}
                          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                        >
                          <StickyNote className="w-3.5 h-3.5" />
                          メモ
                        </button>
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setFollowUpMessageType("thank-you");
                            setShowFollowUpModal(true);
                          }}
                          className="flex-1 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          お礼の連絡
                        </button>
                        <button
                          onClick={() => handleArchive(contact.id)}
                          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          後で
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Activity セクション */}
            {activities.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Activity
                </h2>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="space-y-3">
                    {activities.slice(0, 10).map((activity: Activity) => (
                      <div key={activity.id} className="flex gap-3 text-sm">
                        <span className="text-gray-500 font-medium">
                          {new Date(activity.timestamp).toLocaleDateString('ja-JP', {
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </span>
                        <p className="text-gray-700">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      );
    } else if (currentSidebarItem === "contacts") {
      return (
        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                All Contacts
              </h2>
              <input
                type="text"
                placeholder="名前・会社・タグで検索..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedContact?.id === contact.id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl overflow-hidden shrink-0">
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
                      {contact.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {contact.company}
                    </p>
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {contact.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedContact && (
            <div className="flex-1 overflow-y-auto bg-gray-50">
              <ContactDetailPage
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
                onEdit={(contact) => {
                  // TODO: Open edit modal
                  console.log("Edit contact:", contact);
                }}
                onFollowUpClick={() => {
                  setShowFollowUpModal(true);
                  setFollowUpMessageType("thank-you");
                }}
                onDeepSearchClick={() => {
                  // TODO: Implement deep search
                  console.log("Deep search:", selectedContact);
                }}
              />
            </div>
          )}
        </div>
      );
    } else if (currentSidebarItem === "settings") {
      return (
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">外部連携</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Prairie Card</h4>
                        <p className="text-sm text-green-600">接続済み</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    デジタル名刺の読み取り履歴から自動でContactを作成します。
                  </p>
                  <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200">
                    設定を確認
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Link2 className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Slack</h4>
                        <p className="text-sm text-gray-500">未接続</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    チーム内でコンタクトを共有できます。
                  </p>
                  <button className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800">
                    連携する
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Link2 className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Facebook</h4>
                        <p className="text-sm text-gray-500">未接続</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Messengerでメッセージを送れます。
                  </p>
                  <button className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800">
                    連携する
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">通知設定</h3>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                {/* V1: フォローアップリマインド設定は非表示 */}
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">誕生日通知</p>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer hover:bg-gray-400">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <TimelineSettingsSection
              settings={timelineSettings}
              onSettingsChange={setTimelineSettings}
            />

            <div className="bg-white rounded-2xl shadow-sm">
              <button className="w-full p-4 text-left border-b hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-800">AI設定</p>
              </button>
              <button className="w-full p-4 text-left border-b hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-800">プライバシー</p>
              </button>
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-800">About</p>
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const getScreenId = () => {
    const sidebarIds: Record<string, string> = {
      home: "DSK-HOME",
      contacts: "DSK-CONTACTS",
      settings: "DSK-SETTINGS",
    };
    return sidebarIds[currentSidebarItem] || "DSK-UNKNOWN";
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Screen Identifier Bar */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-3 py-1 flex items-center justify-center shrink-0">
        <span className="text-xs font-mono font-semibold text-yellow-900">
          {getScreenId()}
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">Personal CRM</h1>
              <NotificationIcon
                unreadCount={notifications.filter(n => !n.read).length}
                onClick={() => setShowNotificationModal(true)}
              />
            </div>
          </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add Contact</span>
          </button>

          <button
            onClick={() => setCurrentSidebarItem("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
              currentSidebarItem === "home"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </button>

          <button
            onClick={() => setCurrentSidebarItem("contacts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
              currentSidebarItem === "contacts"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Contacts</span>
          </button>

          <button
            onClick={() => setCurrentSidebarItem("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
              currentSidebarItem === "settings"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                ユーザー名
              </p>
              <p className="text-xs text-gray-500 truncate">
                user@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

        {renderMainContent()}
        {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}

        <NotificationModal
          isOpen={showNotificationModal}
          onClose={() => setShowNotificationModal(false)}
          notifications={notifications}
          contacts={contacts}
        />

        {/* FollowUpModal */}
        {showFollowUpModal && selectedContact && (
          <FollowUpModal
            isOpen={showFollowUpModal}
            contact={selectedContact}
            onClose={() => {
              setShowFollowUpModal(false);
              setSelectedContact(null);
            }}
            onMarkAsSent={() => {
              if (selectedContact) {
                addActivity(
                  `${selectedContact.name}さんにお礼の連絡を送信しました`,
                  selectedContact.id.toString()
                );
                setContacts(
                  contacts.map((c) =>
                    c.id === selectedContact.id
                      ? { ...c, status: "active" as const }
                      : c
                  )
                );
              }
              setShowFollowUpModal(false);
            }}
            messageType={followUpMessageType}
          />
        )}

        {/* CelebrationModal (birthday messages) */}
        {showCelebrationModal && selectedContact && (
          <FollowUpModal
            isOpen={showCelebrationModal}
            contact={selectedContact}
            onClose={() => {
              setShowCelebrationModal(false);
              setSelectedContact(null);
            }}
            onMarkAsSent={() => {
              if (selectedContact) {
                addActivity(
                  `${selectedContact.name}さんに誕生日メッセージを送信しました`,
                  selectedContact.id.toString()
                );
                setContacts(
                  contacts.map((c) =>
                    c.id === selectedContact.id
                      ? { ...c, birthdayMessageSent: true }
                      : c
                  )
                );
              }
              setShowCelebrationModal(false);
            }}
            messageType="birthday"
          />
        )}

        {/* AddNoteModal */}
        {showAddNoteModal && selectedContact && (
          <AddNoteModal
            isOpen={showAddNoteModal}
            contact={selectedContact}
            onClose={() => {
              setShowAddNoteModal(false);
              setSelectedContact(null);
            }}
            onAddNote={(note: string) => {
              if (selectedContact) {
                addActivity(
                  `${selectedContact.name}さんにメモを追加しました: ${note}`,
                  selectedContact.id.toString()
                );
              }
              setShowAddNoteModal(false);
            }}
          />
        )}

        {/* ContactDetailModal (from Home screen) */}
        {showContactDetail && selectedContact && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-8">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <ContactDetailPage
                contact={selectedContact}
                onClose={() => {
                  setShowContactDetail(false);
                  setSelectedContact(null);
                }}
                onEdit={(contact) => {
                  // TODO: Open edit modal
                  console.log("Edit contact:", contact);
                }}
                onFollowUpClick={() => {
                  setShowFollowUpModal(true);
                  setFollowUpMessageType("thank-you");
                }}
                onDeepSearchClick={() => {
                  // TODO: Implement deep search
                  console.log("Deep search:", selectedContact);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
