import { useState } from "react";
import {
  Heart,
  X,
  Bell,
  User,
  Users,
  Plus,
  Home,
  Settings,
  Link2,
  Check,
} from "lucide-react";
import { Contact } from "../types/Contact";
import { AddModal } from "./AddModal";

interface MobileViewProps {
  contacts: Contact[];
}

export const MobileView = ({ contacts: initialContacts }: MobileViewProps) => {
  const [contacts] = useState(initialContacts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX =
      "clientX" in e ? e.clientX : e.touches[0].clientX;
    setDragStart(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return;
    const clientX =
      "clientX" in e ? e.clientX : e.touches[0].clientX;
    setDragOffset(clientX - dragStart);
  };

  const handleDragEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        console.log("Keep contact:", contacts[currentIndex].name);
      } else {
        console.log("Skip contact:", contacts[currentIndex].name);
      }

      if (currentIndex < contacts.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setDragStart(null);
    setDragOffset(0);
  };

  const handleAction = (action: string) => {
    console.log(action, contacts[currentIndex].name);
    if (currentIndex < contacts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderTabContent = () => {
    if (currentTab === "home") {
      return (
        <>
          <div className="p-4 text-center">
            <p className="text-sm text-gray-600">
              新しいContact {currentIndex + 1} / {contacts.length}
            </p>
          </div>

          <div className="flex-1 relative px-4 pb-8">
            {contacts.map((contact, index) => {
              if (index < currentIndex) return null;

              const isTop = index === currentIndex;
              const offset = (index - currentIndex) * 8;
              const scale = 1 - (index - currentIndex) * 0.03;
              const rotation = isTop ? dragOffset / 20 : 0;

              return (
                <div
                  key={contact.id}
                  className="absolute inset-x-4 top-0 bottom-0"
                  style={{
                    transform: `translateY(${offset}px) scale(${scale}) rotate(${rotation}deg) translateX(${
                      isTop ? dragOffset : 0
                    }px)`,
                    transition: dragStart !== null ? "none" : "all 0.3s ease",
                    zIndex: contacts.length - index,
                    opacity: index < currentIndex + 3 ? 1 : 0,
                  }}
                  onMouseDown={isTop ? handleDragStart : undefined}
                  onMouseMove={isTop ? handleDragMove : undefined}
                  onMouseUp={isTop ? handleDragEnd : undefined}
                  onMouseLeave={isTop ? handleDragEnd : undefined}
                  onTouchStart={isTop ? handleDragStart : undefined}
                  onTouchMove={isTop ? handleDragMove : undefined}
                  onTouchEnd={isTop ? handleDragEnd : undefined}
                >
                  <div className="h-full bg-white rounded-3xl shadow-xl p-6 flex flex-col cursor-grab active:cursor-grabbing">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        {contact.source}
                      </span>
                      <span className="text-4xl">{contact.avatar}</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {contact.name}
                      </h2>
                      <p className="text-lg text-gray-700 mb-1">
                        {contact.title}
                      </p>
                      <p className="text-base text-gray-600 mb-6">
                        {contact.company}
                      </p>

                      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                        <p className="text-xs text-gray-500 mb-1">
                          出会った場所
                        </p>
                        <p className="text-sm text-gray-700">{contact.metAt}</p>
                      </div>
                    </div>

                    {isTop && dragOffset !== 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className={`text-6xl font-bold ${
                            dragOffset > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {dragOffset > 0 ? "✓" : "✕"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 bg-white flex justify-center gap-8">
            <button
              onClick={() => handleAction("skip")}
              className="w-16 h-16 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center shadow-lg transition-all active:scale-95"
            >
              <X className="w-8 h-8 text-red-500" />
            </button>
            <button
              onClick={() => handleAction("keep")}
              className="w-16 h-16 rounded-full bg-green-50 hover:bg-green-100 flex items-center justify-center shadow-lg transition-all active:scale-95"
            >
              <Heart className="w-8 h-8 text-green-500" />
            </button>
          </div>
        </>
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
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
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
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
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
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
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
                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">誕生日通知</p>
                <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
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

  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white flex flex-col relative overflow-hidden">
      <div className="p-4 flex items-center justify-between bg-white shadow-sm shrink-0">
        <h1 className="text-xl font-bold text-gray-800">Personal CRM</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </div>
          <User className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {renderTabContent()}

      <div className="bg-white border-t border-gray-200 flex justify-around items-center px-2 py-3 shrink-0">
        <button
          onClick={() => setCurrentTab("home")}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
            currentTab === "home" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={() => setCurrentTab("contacts")}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
            currentTab === "contacts" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs font-medium">Contacts</span>
        </button>

        <button
          onClick={() => setCurrentTab("settings")}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
            currentTab === "settings" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs font-medium">Settings</span>
        </button>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all z-40"
      >
        <Plus className="w-7 h-7 text-white" />
      </button>

      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};
