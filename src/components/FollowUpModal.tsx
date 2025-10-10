import React, { useState } from "react";
import { Contact } from "../types/Contact";
import { Modal } from "./common/Modal";
import { Copy, Check } from "lucide-react";
import {
  generateFollowUpSuggestion,
  generateBirthdaySuggestion,
} from "../utils/aiFollowUpGenerator";

interface FollowUpModalProps {
  isOpen: boolean;
  contact: Contact;
  onClose: () => void;
  onMarkAsSent: (message: string) => void;
  messageType?: "thank-you" | "birthday";
}

export const FollowUpModal: React.FC<FollowUpModalProps> = ({
  isOpen,
  contact,
  onClose,
  onMarkAsSent,
  messageType = "thank-you",
}) => {
  // メッセージタイプに応じて生成関数を切り替え
  const suggestion =
    messageType === "birthday"
      ? generateBirthdaySuggestion(contact)
      : generateFollowUpSuggestion(contact);
  const [draft, setDraft] = useState(suggestion.draft);
  const [showCopyToast, setShowCopyToast] = useState(false);

  // メッセージタイプに応じてタイトルを切り替え
  const modalTitle =
    messageType === "birthday"
      ? `${contact.name}さんへのお祝いメッセージ`
      : `${contact.name}さんへのフォローアップ提案`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setShowCopyToast(true);
      setTimeout(() => {
        setShowCopyToast(false);
        // モーダルは開いたまま、何度でもコピー・編集可能
      }, 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("コピーに失敗しました");
    }
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
      title={modalTitle}
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
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Copy className="w-4 h-4" />
              コピー
            </button>
            <button
              onClick={handleMarkAsSent}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
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
