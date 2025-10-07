import React, { useState } from "react";
import {
  Heart,
  X,
  Bell,
  User,
  Search,
  Plus,
  Home,
  Compass,
  Settings,
  Link2,
  Camera,
  FileText,
  Edit3,
  Check,
} from "lucide-react";

// サンプルコンタクトデータ
const sampleContacts = [
  {
    id: 1,
    name: "田中 太郎",
    company: "ABC株式会社",
    title: "営業部長",
    source: "LinkedIn",
    metAt: "2024年10月1日 - Tech Conference Tokyo",
    avatar: "👨‍💼",
    priority: "high",
  },
  {
    id: 2,
    name: "佐藤 花子",
    company: "XYZ Corporation",
    title: "Product Manager",
    source: "Prairie Card",
    metAt: "2024年10月3日 - Startup Meetup",
    avatar: "👩‍💼",
    priority: "high",
  },
  {
    id: 3,
    name: "鈴木 一郎",
    company: "DEF Technologies",
    title: "CTO",
    source: "名刺スキャン",
    metAt: "2024年10月5日 - AI Summit",
    avatar: "👨‍💻",
    priority: "medium",
  },
  {
    id: 4,
    name: "高橋 美咲",
    company: "GHI Ventures",
    title: "Investment Manager",
    source: "Facebook",
    metAt: "2024年10月7日 - Networking Event",
    avatar: "👩‍💼",
    priority: "high",
  },
  {
    id: 5,
    name: "渡辺 健太",
    company: "JKL Design Studio",
    title: "Creative Director",
    source: "LinkedIn",
    metAt: "2024年10月8日 - Design Conference",
    avatar: "🎨",
    priority: "medium",
  },
];

const PersonalCRMHome = () => {
  const [viewMode, setViewMode] = useState("mobile"); // 'mobile', 'desktop'
  const [contacts, setContacts] = useState(sampleContacts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedContact, setSelectedContact] = useState(sampleContacts[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");
  const [currentSidebarItem, setCurrentSidebarItem] = useState("home");

  // スワイプ処理
  const handleDragStart = (e) => {
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    setDragStart(clientX);
  };

  const handleDragMove = (e) => {
    if (dragStart === null) return;
    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
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

  const handleAction = (action) => {
    console.log(action, contacts[currentIndex].name);
    if (currentIndex < contacts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // AddModal Component
  const AddModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowAddModal(false)}
    >
      <div
        className="bg-white rounded-3xl p-6 w-80 max-w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          新しいContactを追加
        </h3>

        <button className="w-full bg-blue-50 hover:bg-blue-100 rounded-2xl p-4 mb-3 flex items-center gap-3 transition-colors">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-800">名刺をスキャン</p>
            <p className="text-sm text-gray-600">カメラで撮影</p>
          </div>
        </button>

        <button className="w-full bg-green-50 hover:bg-green-100 rounded-2xl p-4 mb-3 flex items-center gap-3 transition-colors">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-800">Prairie Card読み取り</p>
            <p className="text-sm text-gray-600">デジタル名刺から</p>
          </div>
        </button>

        <button className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 mb-4 flex items-center gap-3 transition-colors">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
            <Edit3 className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-800">手動で入力</p>
            <p className="text-sm text-gray-600">フォームから追加</p>
          </div>
        </button>

        <button
          onClick={() => setShowAddModal(false)}
          className="w-full py-3 text-gray-600 font-medium"
        >
          キャンセル
        </button>
      </div>
    </div>
  );

  // Mobile View
  const MobileView = () => {
    const renderTabContent = () => {
      if (currentTab === "home") {
        return (
          <>
            {/* カウンター */}
            <div className="p-4 text-center">
              <p className="text-sm text-gray-600">
                新しいContact {currentIndex + 1} / {contacts.length}
              </p>
            </div>

            {/* カードスタック */}
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
                          <p className="text-sm text-gray-700">
                            {contact.metAt}
                          </p>
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

            {/* アクションボタン */}
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
      } else if (currentTab === "discover") {
        return (
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Discover (β)
              </h2>
              <p className="text-gray-600 mb-2">潜在的なつながりを探索</p>
              <p className="text-sm text-gray-500">Coming Soon...</p>
            </div>
          </div>
        );
      } else if (currentTab === "more") {
        return (
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">設定</h2>

            <div className="bg-white rounded-2xl shadow-sm mb-4">
              <h3 className="text-sm font-semibold text-gray-700 p-4 border-b">
                Integration
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
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">LinkedIn</p>
                    <p className="text-xs text-gray-500">未接続</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
                  連携
                </button>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Facebook</p>
                    <p className="text-xs text-gray-500">未接続</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
                  連携
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm">
              <button className="w-full p-4 text-left border-b">
                <p className="font-medium text-gray-800">通知設定</p>
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
      <div className="h-full bg-gradient-to-b from-blue-50 to-white flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between bg-white shadow-sm">
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

        {/* Content */}
        {renderTabContent()}

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 flex justify-around items-center px-2 py-3 safe-area-inset-bottom">
          <button
            onClick={() => setCurrentTab("home")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              currentTab === "home" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setCurrentTab("discover")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              currentTab === "discover" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs font-medium">Discover</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex flex-col items-center -mt-6"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700 mt-1">追加</span>
          </button>

          <button
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-gray-400"
            disabled
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </button>

          <button
            onClick={() => setCurrentTab("more")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              currentTab === "more" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>

        {showAddModal && <AddModal />}
      </div>
    );
  };

  // Desktop View
  const DesktopView = () => {
    const renderMainContent = () => {
      if (currentSidebarItem === "home") {
        return (
          <div className="flex-1 flex overflow-hidden">
            {/* Contact List */}
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
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {contact.source}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
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
                    <button className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      Keep & Follow Up
                    </button>
                    <button className="px-6 py-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-semibold transition-colors">
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (currentSidebarItem === "discover") {
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="w-16 h-16 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Discover (β)
              </h2>
              <p className="text-gray-600 mb-2">潜在的なつながりを探索</p>
              <p className="text-sm text-gray-500">Coming Soon in PoC v2...</p>
            </div>
          </div>
        );
      } else if (currentSidebarItem === "integration") {
        return (
          <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Integration
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          Prairie Card
                        </h3>
                        <p className="text-sm text-green-600">接続済み</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    デジタル名刺の読み取り履歴から自動でContactを作成します。
                  </p>
                  <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                    設定を確認
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Link2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">LinkedIn</h3>
                        <p className="text-sm text-gray-500">未接続</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    LinkedInのコネクションを自動インポートできます。
                  </p>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    連携する
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Link2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Facebook</h3>
                        <p className="text-sm text-gray-500">未接続</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Facebookの友達をContactとして管理できます。
                  </p>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
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
                        <h3 className="font-bold text-gray-900">Gmail</h3>
                        <p className="text-sm text-gray-500">未接続</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    メール署名から自動でContactを作成できます。
                  </p>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    連携する
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <div className="h-full bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">Personal CRM</h1>
          </div>

          <nav className="flex-1 p-4">
            <button
              onClick={() => setCurrentSidebarItem("home")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
                currentSidebarItem === "home"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>

            <button
              onClick={() => setCurrentSidebarItem("discover")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
                currentSidebarItem === "discover"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400"
              }`}
              disabled
            >
              <Compass className="w-5 h-5" />
              <span className="font-medium">Discover</span>
              <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                β
              </span>
            </button>

            <button
              onClick={() => setCurrentSidebarItem("integration")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
                currentSidebarItem === "integration"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Link2 className="w-5 h-5" />
              <span className="font-medium">Integration</span>
            </button>

            <div className="border-t border-gray-200 my-4"></div>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50">
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

        {/* Main Content */}
        {renderMainContent()}
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* デバイス切り替えボタン */}
      <div className="bg-gray-800 text-white p-3 flex justify-center gap-3">
        <button
          onClick={() => setViewMode("mobile")}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === "mobile"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          📱 iPhone（4タブ＋中央➕ボタン）
        </button>
        <button
          onClick={() => setViewMode("desktop")}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === "desktop"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          💻 Desktop（サイドバー＋Home/Contact一体）
        </button>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 overflow-hidden flex justify-center items-center bg-gray-900">
        <div
          className="bg-white shadow-2xl overflow-hidden"
          style={{
            width: viewMode === "mobile" ? "393px" : "100%",
            height: viewMode === "mobile" ? "852px" : "100%",
            maxWidth: viewMode === "mobile" ? "393px" : "none",
            maxHeight: viewMode === "mobile" ? "852px" : "none",
          }}
        >
          {viewMode === "mobile" ? <MobileView /> : <DesktopView />}
        </div>
      </div>
    </div>
  );
};

export default PersonalCRMHome;
