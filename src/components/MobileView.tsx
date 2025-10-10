import { useState } from "react";
import { Users, Plus, Home, Settings, Link2, Check } from "lucide-react";
import { Contact } from "../types/Contact";
import { Notification } from "../types/Notification";
import { Reminder } from "../types/Reminder";
import { Activity } from "../types/Activity";
import {
  TimelineSettings,
  defaultTimelineSettings,
} from "../types/TimelineSettings";
import { AddModal } from "./AddModal";
import { ContactEditModal } from "./ContactEditModal";
import { ContactDetailPage } from "./ContactDetailPage";
import { KeepInTouchModal } from "./KeepInTouchModal";
import { FollowUpModal } from "./FollowUpModal";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationModal } from "./NotificationModal";
import { NewContactsSection } from "./Home/NewContactsSection";
import { ActivitySection } from "./Home/ActivitySection";
import { TodayEventsSection } from "./Home/TodayEventsSection";
import { Flash, FlashType } from "./common/Flash";
import { TimelineSettingsSection } from "./Settings/TimelineSettingsSection";

interface MobileViewProps {
  contacts: Contact[];
  notifications: Notification[];
  reminders: Reminder[];
  activities: Activity[];
}

export const MobileView = ({
  contacts: initialContacts,
  notifications: initialNotifications,
  reminders: initialReminders,
  activities: initialActivities,
}: MobileViewProps) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [reminders, setReminders] = useState(initialReminders);
  const [activities, setActivities] = useState(initialActivities);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [showKeepInTouchModal, setShowKeepInTouchModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [currentTab, setCurrentTab] = useState("home");
  const [editOrigin, setEditOrigin] = useState<"detail" | "direct" | null>(
    null
  ); // 編集画面の開始元を追跡
  const [autoOpenNoteInput, setAutoOpenNoteInput] = useState(false); // メモ入力を自動で開く

  // Flash state
  const [flashVisible, setFlashVisible] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState<FlashType>("info");

  // Timeline settings state
  const [timelineSettings, setTimelineSettings] = useState<TimelineSettings>(
    defaultTimelineSettings
  );

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

  const handleArchive = (id: number) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      addActivity(`${contact.name}さんをアーカイブしました`);
    }
    setContacts(
      contacts.map((c) =>
        c.id === id ? { ...c, status: "archived" as const } : c
      )
    );
  };

  const handleKeepInTouchConfirm = (
    interval: "1week" | "3weeks" | "1month" | "ai"
  ) => {
    if (selectedContact) {
      // 新しいReminderを作成
      const dueDate = calculateDueDate(interval);
      const newReminder: Reminder = {
        id: `reminder-${Date.now()}`,
        contactId: selectedContact.id.toString(),
        dueDate,
        type: "keep-in-touch" as const,
        interval,
        completed: false,
      };

      setReminders([...reminders, newReminder]);
      setContacts(
        contacts.map((c) =>
          c.id === selectedContact.id ? { ...c, status: "active" as const } : c
        )
      );

      // Activity追加
      addActivity(`${selectedContact.name}さんのリマインダーを設定しました`);

      setShowKeepInTouchModal(false);
      setSelectedContact(null);
      alert(
        `設定しました！✨\n${selectedContact.name}さんのリマインダーを作成しました`
      );
    }
  };

  const calculateDueDate = (interval: string): Date => {
    const now = new Date();
    switch (interval) {
      case "1week":
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case "3weeks":
        return new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
      case "1month":
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      case "ai":
        // AIおまかせは2週間後を提案（モック）
        return new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  };

  const handleCardClick = (contactId: number) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      // 未開封タグを削除
      const updatedContact = {
        ...contact,
        tags: contact.tags?.filter((tag) => tag !== "未開封") || [],
      };
      setSelectedContact(updatedContact);
      setContacts(
        contacts.map((c) => (c.id === contactId ? updatedContact : c))
      );
      setShowContactDetail(true);
    }
  };

  const handleCelebration = (id: number) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      setSelectedContact(contact);
      setShowCelebrationModal(true);
    }
  };

  const handleCloseEdit = () => {
    if (selectedContact) {
      addActivity(`${selectedContact.name}さんの情報を更新しました`);
    }
    setShowEditModal(false);

    // 編集画面の開始元がContactDetailPageの場合は、そこに戻る
    if (editOrigin === "detail") {
      setShowContactDetail(true);
      setEditOrigin(null);
    } else {
      setSelectedContact(null);
      setEditOrigin(null);
    }
  };

  const handleSaveContact = (updatedContact: Contact) => {
    // 自動保存時はcontactsを更新するだけ（Activity追加なし、モーダルは閉じない）
    setContacts(
      contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
    );
  };

  const handleDeepSearch = () => {
    if (!selectedContact) return;

    // 1. AI検索ステータスを'processing'に更新
    const updatedContact = {
      ...selectedContact,
      aiSearchStatus: "processing" as const,
    };
    setContacts(
      contacts.map((c) => (c.id === selectedContact.id ? updatedContact : c))
    );
    setSelectedContact(updatedContact);

    // 2. 通知に新規AI検索通知を追加
    const newNotification: Notification = {
      id: `ai-search-${Date.now()}`,
      type: "ai-search",
      contactId: selectedContact.id.toString(),
      title: `${selectedContact.name}さんのAI検索`,
      message: "情報の検索中です...",
      timestamp: new Date(),
      read: false,
    };
    setNotifications([newNotification, ...notifications]);

    // 3. フラッシュメッセージ表示
    setFlashMessage("人物検索を開始しました。完了したら通知します。");
    setFlashType("info");
    setFlashVisible(true);

    // 4. 編集モーダルを閉じて詳細画面に戻る
    setShowEditModal(false);
    setShowContactDetail(true);

    // 5. モック: 3秒後にステータスを'completed'に更新
    setTimeout(() => {
      const completedContact = {
        ...updatedContact,
        aiSearchStatus: "completed" as const,
      };
      setContacts(
        contacts.map((c) =>
          c.id === selectedContact.id ? completedContact : c
        )
      );

      // 通知を'completed'状態に更新
      setNotifications(
        notifications.map((n) =>
          n.id === newNotification.id
            ? {
                ...n,
                message: "SNSプロフィール情報の検索が完了しました。",
                read: false,
              }
            : n
        )
      );
    }, 3000);
  };

  const renderTabContent = () => {
    if (currentTab === "home") {
      return (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <TodayEventsSection
            contacts={contacts}
            onCardClick={handleCardClick}
            onCelebration={handleCelebration}
          />
          {/* V1: リマインダー機能は非表示（V2以降で復活予定） */}
          {/* <ReminderSection
            reminders={reminders}
            contacts={contacts}
            onComplete={handleReminderComplete}
            onPostpone={handleReminderPostpone}
          /> */}
          <NewContactsSection
            contacts={contacts}
            onArchive={handleArchive}
            onMemo={(id) => {
              const contact = contacts.find((c) => c.id === id);
              if (contact) {
                setSelectedContact(contact);
                setAutoOpenNoteInput(true);
                setShowContactDetail(true);
              }
            }}
            onThankYou={(id) => {
              const contact = contacts.find((c) => c.id === id);
              if (contact) {
                setSelectedContact(contact);
                setShowFollowUpModal(true);
              }
            }}
            onCardClick={handleCardClick}
          />
          <ActivitySection
            activities={activities}
            timelineSettings={timelineSettings}
          />
        </div>
      );
    } else if (currentTab === "contacts") {
      return (
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contacts</h2>
            <input
              type="text"
              placeholder="名前・会社・タグで検索..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="divide-y divide-gray-100">
            {[...contacts]
              .sort(
                (a, b) =>
                  new Date(b.createdDate).getTime() -
                  new Date(a.createdDate).getTime()
              )
              .map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCardClick(contact.id)}
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
                      <p className="text-xs text-gray-500 truncate mb-2">
                        {contact.company}
                      </p>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {contact.source}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    } else if (currentTab === "settings") {
      return (
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">
            Settings
          </h2>

          <div className="bg-white rounded-2xl shadow-sm mb-4">
            <h3 className="text-sm font-semibold text-gray-700 p-4 border-b">
              外部連携
            </h3>

            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Prairie Card</p>
                  <p className="text-xs text-green-600">接続済み</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Slack</p>
                  <p className="text-xs text-gray-500">未接続</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">
                連携
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Facebook</p>
                  <p className="text-xs text-gray-500">未接続</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">
                連携
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm mb-4">
            <h3 className="text-sm font-semibold text-gray-700 p-4 border-b">
              通知設定
            </h3>
            {/* V1: フォローアップリマインド設定は非表示 */}
            <div className="p-4">
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
            <button className="w-full p-4 text-left border-b">
              <p className="font-medium text-gray-800">AI設定</p>
            </button>
            <button className="w-full p-4 text-left border-b">
              <p className="font-medium text-gray-800">プライバシー</p>
            </button>
            <button className="w-full p-4 text-left">
              <p className="font-medium text-gray-800">About</p>
            </button>
          </div>
        </div>
      );
    }
  };

  const getScreenId = () => {
    const tabIds: Record<string, string> = {
      home: "MOB-HOME",
      contacts: "MOB-CONTACTS",
      settings: "MOB-SETTINGS",
    };
    return tabIds[currentTab] || "MOB-UNKNOWN";
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      {/* Screen Identifier Bar */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-3 py-1 flex items-center justify-center shrink-0">
        <span className="text-xs font-mono font-semibold text-yellow-900">
          {getScreenId()}
        </span>
      </div>

      <div className="p-4 flex items-center justify-between bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-lg font-bold text-gray-900">Personal CRM</h1>
        <NotificationIcon
          unreadCount={notifications.filter((n) => !n.read).length}
          onClick={() => setShowNotificationModal(true)}
        />
      </div>

      {renderTabContent()}

      <div className="bg-white border-t border-gray-200 flex justify-around items-center px-2 py-3 shrink-0">
        <button
          onClick={() => setCurrentTab("home")}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
            currentTab === "home" ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={() => setCurrentTab("contacts")}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
            currentTab === "contacts" ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs font-medium">Contacts</span>
        </button>

        <button
          onClick={() => setCurrentTab("settings")}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
            currentTab === "settings" ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs font-medium">Settings</span>
        </button>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-20 right-4 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 active:scale-95 transition-all z-40"
      >
        <Plus className="w-7 h-7 text-white" />
      </button>

      {showAddModal && (
        <AddModal
          onClose={() => setShowAddModal(false)}
          onAddContacts={(newContacts) => {
            // 複数コンタクトを追加
            setContacts([...newContacts, ...contacts]);
            // アクティビティに記録
            newContacts.forEach((contact) => {
              addActivity(
                `${contact.name}さんを追加しました`,
                contact.id.toString()
              );
            });
            // Homeタブに遷移
            setCurrentTab("home");
          }}
        />
      )}

      {showEditModal && selectedContact && (
        <ContactEditModal
          contact={selectedContact}
          onClose={handleCloseEdit}
          onSave={handleSaveContact}
          onDeepSearchClick={handleDeepSearch}
        />
      )}

      {showKeepInTouchModal && selectedContact && (
        <KeepInTouchModal
          isOpen={showKeepInTouchModal}
          contact={selectedContact}
          onClose={() => {
            setShowKeepInTouchModal(false);
            setSelectedContact(null);
          }}
          onConfirm={handleKeepInTouchConfirm}
        />
      )}

      {showFollowUpModal && selectedContact && (
        <FollowUpModal
          isOpen={showFollowUpModal}
          contact={selectedContact}
          onClose={() => {
            setShowFollowUpModal(false);
          }}
          onMarkAsSent={() => {
            // 新着コンタクトのステータスをactiveに変更（リストから消える）
            setContacts(
              contacts.map((c) =>
                c.id === selectedContact.id
                  ? { ...c, status: "active" as const }
                  : c
              )
            );
            addActivity(
              `${selectedContact.name}さんにフォローアップメッセージを送信しました`,
              selectedContact.id.toString()
            );
            setShowFollowUpModal(false);
          }}
        />
      )}

      {showCelebrationModal && selectedContact && (
        <FollowUpModal
          isOpen={showCelebrationModal}
          contact={selectedContact}
          messageType="birthday"
          onClose={() => {
            setShowCelebrationModal(false);
          }}
          onMarkAsSent={() => {
            // 誕生日メッセージ送信済みフラグを立てる（リストから消える）
            setContacts(
              contacts.map((c) =>
                c.id === selectedContact.id
                  ? { ...c, birthdayMessageSent: true }
                  : c
              )
            );
            addActivity(
              `${selectedContact.name}さんにお祝いメッセージを送信しました`,
              selectedContact.id.toString()
            );
            setShowCelebrationModal(false);
          }}
        />
      )}

      {showContactDetail && selectedContact && (
        <ContactDetailPage
          contact={selectedContact}
          onClose={() => {
            setShowContactDetail(false);
            setSelectedContact(null);
            setAutoOpenNoteInput(false);
          }}
          onEdit={(contact) => {
            setShowContactDetail(false);
            setSelectedContact(contact);
            setEditOrigin("detail"); // 編集元をContactDetailPageとして記録
            setShowEditModal(true);
          }}
          onFollowUpClick={() => {
            setShowFollowUpModal(true);
          }}
          autoOpenNoteInput={autoOpenNoteInput}
        />
      )}

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        notifications={notifications}
        contacts={contacts}
      />

      {/* Flash Message */}
      <Flash
        type={flashType}
        message={flashMessage}
        isVisible={flashVisible}
        onClose={() => setFlashVisible(false)}
        duration={3000}
      />
    </div>
  );
};
