import { useState } from "react";
import {
  User,
  Users,
  Plus,
  Home,
  Settings,
  Link2,
  Check,
} from "lucide-react";
import { Contact } from "../types/Contact";
import { Notification } from "../types/Notification";
import { Reminder } from "../types/Reminder";
import { Activity } from "../types/Activity";
import { AddModal } from "./AddModal";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationModal } from "./NotificationModal";
import { ReminderSection } from "./Home/ReminderSection";
import { NewContactsSection } from "./Home/NewContactsSection";
import { ActivitySection } from "./Home/ActivitySection";

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
  activities: initialActivities
}: MobileViewProps) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [notifications] = useState(initialNotifications);
  const [reminders, setReminders] = useState(initialReminders);
  const [activities] = useState(initialActivities);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");

  const handleReminderComplete = (id: string) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, completed: true } : r
    ));
  };

  const handleReminderPostpone = (_id: string) => {
    alert("リマインダー延期機能（張りぼて）");
  };

  const handleArchive = (id: number) => {
    setContacts(contacts.map(c =>
      c.id === id ? { ...c, status: 'archived' as const } : c
    ));
  };

  const handleKeepInTouch = (_id: number) => {
    alert("Keep in Touch設定モーダル（張りぼて）");
  };

  const handleLater = (_id: number) => {
    alert("後で確認（張りぼて）");
  };

  const renderTabContent = () => {
    if (currentTab === "home") {
      return (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <ReminderSection
            reminders={reminders}
            onComplete={handleReminderComplete}
            onPostpone={handleReminderPostpone}
          />
          <NewContactsSection
            contacts={contacts}
            onArchive={handleArchive}
            onKeepInTouch={handleKeepInTouch}
            onLater={handleLater}
          />
          <ActivitySection activities={activities} />
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
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{contact.avatar}</span>
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
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">Settings</h2>

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
                  <p className="font-medium text-gray-800">Gmail</p>
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
                  <p className="font-medium text-gray-800">Slack</p>
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
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">フォローアップリマインド</p>
                <div className="w-12 h-6 bg-gray-900 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">誕生日通知</p>
                <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer hover:bg-gray-400">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

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
        <h1 className="text-xl font-bold text-gray-900">Personal CRM</h1>
        <div className="flex gap-3">
          <NotificationIcon
            unreadCount={notifications.filter(n => !n.read).length}
            onClick={() => setShowNotificationModal(true)}
          />
          <User className="w-6 h-6 text-gray-600" />
        </div>
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

      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        notifications={notifications}
        contacts={contacts}
      />
    </div>
  );
};
