import React, { useState } from "react";
import { Contact } from "../types/Contact";
import { Modal } from "./common/Modal";
import { Copy, Clock, Check } from "lucide-react";
import { generateFollowUpSuggestion } from "../utils/aiFollowUpGenerator";

interface FollowUpModalProps {
  isOpen: boolean;
  contact: Contact;
  onClose: () => void;
  onMarkAsSent: (message: string) => void;
}

export const FollowUpModal: React.FC<FollowUpModalProps> = ({
  isOpen,
  contact,
  onClose,
  onMarkAsSent,
}) => {
  const suggestion = generateFollowUpSuggestion(contact);
  const [draft, setDraft] = useState(suggestion.draft);
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setShowCopyToast(true);
      setTimeout(() => {
        setShowCopyToast(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("コピーに失敗しました");
    }
  };

  const handleLater = () => {
    // 後で機能は後期実装
    alert("後で確認（張りぼて）");
    onClose();
  };

  const handleMarkAsSent = () => {
    onMarkAsSent(draft);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${contact.name}さんへのフォローアップ提案`}
      bodyClassName="p-0 flex flex-col"
    >
      <div className="flex flex-col">
        {/* 提案理由 */}
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <p className="text-sm text-blue-900">💡 {suggestion.reason}</p>
        </div>

        {/* ドラフト文面 */}
        <div className="px-6 py-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            ドラフト文面
          </label>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="フォローアップメッセージを編集..."
          />
          <p className="text-xs text-gray-500 mt-2">文面は自由に編集できます</p>
        </div>

        {/* アクションボタン */}
        <div className="px-6 py-4 border-t border-gray-200 space-y-2">
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            コピー
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleLater}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Clock className="w-4 h-4" />
              後で
            </button>
            <button
              onClick={handleMarkAsSent}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              送信済にする
            </button>
          </div>
        </div>

        {/* コピー完了Toast */}
        {showCopyToast && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
            ✓ コピーしました
          </div>
        )}
      </div>
    </Modal>
  );
};
