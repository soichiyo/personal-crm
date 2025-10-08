import { useState } from "react";
import {
  Heart,
  User,
  Users,
  Home,
  Settings,
  Link2,
  Check,
  Plus,
  X,
} from "lucide-react";
import { Contact } from "../types/Contact";
import { AddModal } from "./AddModal";

interface DesktopViewProps {
  contacts: Contact[];
}

export const DesktopView = ({ contacts }: DesktopViewProps) => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [currentSidebarItem, setCurrentSidebarItem] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);

  const renderMainContent = () => {
    if (currentSidebarItem === "home") {
      return (
        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                新しいContact
              </h2>
              <p className="text-sm text-gray-600">{contacts.length}件</p>
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
                  <span className="text-2xl">{contact.avatar}</span>
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

          <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                    {selectedContact.source}
                  </span>
                  <span className="text-6xl">{selectedContact.avatar}</span>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  {selectedContact.name}
                </h2>
                <p className="text-xl text-gray-700 mb-2">
                  {selectedContact.title}
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  {selectedContact.company}
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <p className="text-sm text-gray-500 mb-2">出会った場所</p>
                  <p className="text-base text-gray-700">
                    {selectedContact.metAt}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                  <p className="text-sm font-semibold text-blue-900 mb-3">
                    💡 AI提案
                  </p>
                  <p className="text-sm text-blue-800 mb-4">
                    最近お会いした方です。お礼とフォローアップをお勧めします。
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-700">
                      {selectedContact.name}様<br />
                      <br />
                      先日は貴重なお時間をいただきありがとうございました。
                      お話しできて大変参考になりました...
                      <br />
                      <br />
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Keep & Follow Up
                  </button>
                  <button className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <X className="w-5 h-5" />
                    Skip
                  </button>
                </div>
              </div>
            </div>
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
                  <span className="text-2xl">{contact.avatar}</span>
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

          <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                    {selectedContact.source}
                  </span>
                  <span className="text-6xl">{selectedContact.avatar}</span>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  {selectedContact.name}
                </h2>
                <p className="text-xl text-gray-700 mb-2">
                  {selectedContact.title}
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  {selectedContact.company}
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <p className="text-sm text-gray-500 mb-2">出会った場所</p>
                  <p className="text-base text-gray-700">
                    {selectedContact.metAt}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-700">詳細情報</p>
                    <button className="px-3 py-1 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800">
                      AIで自動収集する
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>SNS: LinkedIn, Twitter</p>
                    <p>Email: contact@example.com</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">メモ</p>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="メモを追加..."
                  />
                </div>
              </div>
            </div>
          </div>
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
                        <h4 className="font-bold text-gray-900">Gmail</h4>
                        <p className="text-sm text-gray-500">未接続</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    メール署名から自動でContactを作成できます。
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
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">通知設定</h3>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="font-medium text-gray-900">フォローアップリマインド</p>
                      <p className="text-sm text-gray-500">新しいコンタクトのリマインド通知</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-900 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="font-medium text-gray-900">誕生日通知</p>
                      <p className="text-sm text-gray-500">コンタクトの誕生日を通知</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer hover:bg-gray-400">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">転職通知</p>
                      <p className="text-sm text-gray-500">コンタクトの転職情報を通知</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer hover:bg-gray-400">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI設定</h3>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="font-medium text-gray-900">フォローアップ提案</p>
                      <p className="text-sm text-gray-500">AIによるメッセージ提案を有効化</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-900 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">自動情報拡充</p>
                      <p className="text-sm text-gray-500">コンタクト情報を自動で収集</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer hover:bg-gray-400">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full bg-gray-50 flex">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Personal CRM</h1>
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
    </div>
  );
};
