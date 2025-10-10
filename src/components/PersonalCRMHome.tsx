import { useState } from "react";
import { sampleContacts } from "../data/sampleContacts";
import { sampleNotifications } from "../data/sampleNotifications";
import { sampleReminders } from "../data/sampleReminders";
import { sampleActivities } from "../data/sampleActivities";
import { MobileView } from "./MobileView";
import { DesktopView } from "./DesktopView";

export const PersonalCRMHome = () => {
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* View Mode Switcher */}
      <div className="bg-gray-800 text-white p-3 flex justify-center gap-3 shrink-0">
        <button
          onClick={() => setViewMode("mobile")}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === "mobile"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          📱 iPhone
        </button>
        <button
          onClick={() => setViewMode("desktop")}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === "desktop"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          💻 Desktop
        </button>
      </div>

      {/* Screen Identifier for Testing - 最上位固定バー */}
      <div className="fixed top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-300 px-4 py-2 flex items-center justify-center gap-2 z-[9999]">
        <span className="text-xs font-mono font-semibold text-yellow-900">
          画面ID: {viewMode === "mobile" ? "MOB-001" : "DSK-001"}
        </span>
        <span className="text-xs text-yellow-700">|</span>
        <span className="text-xs text-yellow-800">
          {viewMode === "mobile"
            ? "モバイル（3タブ）"
            : "デスクトップ（サイドバー）"}
        </span>
      </div>

      {/* スペーサー: 固定バーの高さ分 */}
      <div className="h-10 shrink-0"></div>

      <div className="flex-1 overflow-hidden flex justify-center items-center bg-gray-900 p-4">
        <div
          className="bg-white shadow-2xl overflow-hidden"
          style={{
            width: viewMode === "mobile" ? "393px" : "100%",
            height: viewMode === "mobile" ? "min(852px, 100%)" : "100%",
            maxWidth: viewMode === "mobile" ? "393px" : "100%",
            maxHeight: "100%",
          }}
        >
          {viewMode === "mobile" ? (
            <MobileView
              contacts={sampleContacts}
              notifications={sampleNotifications}
              reminders={sampleReminders}
              activities={sampleActivities}
            />
          ) : (
            <DesktopView
              contacts={sampleContacts}
              notifications={sampleNotifications}
            />
          )}
        </div>
      </div>
    </div>
  );
};
