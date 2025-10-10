import React, { useState } from "react";
import { Contact } from "../types/Contact";
import { Modal } from "./common/Modal";
import { Copy, Check, Mail, MessageCircle } from "lucide-react";
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
  const [showEmailClientModal, setShowEmailClientModal] = useState(false);
  const [showMessengerConfirmModal, setShowMessengerConfirmModal] =
    useState(false);

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

  const handleSendEmail = () => {
    if (!contact.email) return;
    // メールクライアント選択モーダルを開く
    setShowEmailClientModal(true);
  };

  const handleSelectEmailClient = (_client: string) => {
    const subject = encodeURIComponent(
      messageType === "birthday"
        ? `${contact.name}さん、お誕生日おめでとうございます！`
        : "ご連絡"
    );
    const body = encodeURIComponent(draft);
    const mailtoUrl = `mailto:${contact.email}?subject=${subject}&body=${body}`;

    // クライアントによってURLを調整（モックなのでmailto:で統一）
    window.location.href = mailtoUrl;
    setShowEmailClientModal(false);
    // モーダルは開いたまま
  };

  const handleOpenMessenger = async () => {
    if (!contact.social?.facebook) return;

    // まずコピー
    try {
      await navigator.clipboard.writeText(draft);
      setShowCopyToast(true);
      setTimeout(() => {
        setShowCopyToast(false);
        // コピー後、確認モーダルを表示
        setShowMessengerConfirmModal(true);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleConfirmMessengerSend = () => {
    if (!contact.social?.facebook) return;

    // FacebookのURLからMessenger URLを生成
    const getFacebookMessengerUrl = (facebookUrl: string): string => {
      // https://facebook.com/username → https://m.me/username
      const username = facebookUrl.replace(
        /https?:\/\/(www\.)?facebook\.com\//,
        ""
      );
      return `https://m.me/${username}`;
    };

    const messengerUrl = getFacebookMessengerUrl(contact.social.facebook);
    window.location.href = messengerUrl;
    setShowMessengerConfirmModal(false);
    // モーダルは開いたまま
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
        {/* Screen Identifier */}
        <div className="bg-purple-50 border-b border-purple-200 px-3 py-1 flex items-center justify-center relative z-[9998]">
          <span className="text-xs font-mono font-semibold text-purple-900">
            MOB-FOLLOWUP
          </span>
        </div>

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
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Copy className="w-4 h-4" />
            コピー
          </button>

          {contact.email && (
            <button
              onClick={handleSendEmail}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
              メールで送る
            </button>
          )}

          {contact.social?.facebook && (
            <button
              onClick={handleOpenMessenger}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Messengerで送る
            </button>
          )}

          <button
            onClick={handleMarkAsSent}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Check className="w-4 h-4" />
            送信済にする
          </button>
        </div>

        {/* コピー完了Toast */}
        {showCopyToast && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
            ✓ コピーしました
          </div>
        )}

        {/* メールクライアント選択サブモーダル */}
        {showEmailClientModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 pt-10">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                メールクライアントを選択
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSelectEmailClient("default")}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors text-left"
                >
                  📧 デフォルトメールアプリ
                </button>
                <button
                  onClick={() => handleSelectEmailClient("gmail")}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors text-left"
                >
                  ✉️ Gmail
                </button>
                <button
                  onClick={() => handleSelectEmailClient("outlook")}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors text-left"
                >
                  📨 Outlook
                </button>
                <button
                  onClick={() => setShowEmailClientModal(false)}
                  className="w-full px-4 py-3 bg-white text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors mt-2"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messenger確認サブモーダル */}
        {showMessengerConfirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 pt-10">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                メッセージをコピーしましたか？
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Messengerアプリを開きます。メッセージを貼り付けて送信してください。
              </p>
              <div className="space-y-2">
                <button
                  onClick={handleConfirmMessengerSend}
                  className="w-full px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  はい、Messengerを開く
                </button>
                <button
                  onClick={() => setShowMessengerConfirmModal(false)}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
