import { useState } from "react";
import { sampleContacts } from "../data/sampleContacts";
import { MobileView } from "./MobileView";
import { DesktopView } from "./DesktopView";

export const PersonalCRMHome = () => {
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="bg-gray-800 text-white p-3 flex justify-center gap-3 shrink-0">
        <button
          onClick={() => setViewMode("mobile")}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === "mobile"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          📱 iPhone（3タブ＋右下FAB）
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
            <MobileView contacts={sampleContacts} />
          ) : (
            <DesktopView contacts={sampleContacts} />
          )}
        </div>
      </div>
    </div>
  );
};
