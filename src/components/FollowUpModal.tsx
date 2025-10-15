import React, { useState } from "react";
import { Contact } from "../types/Contact";
import { Modal } from "./common/Modal";
import { Copy, Check, Mail, MessageCircle, Edit3, ChevronRight } from "lucide-react";
import {
  generateFollowUpSuggestion,
  generateBirthdaySuggestion,
  getFollowUpToneOptions,
  getBirthdayToneOptions,
  generateFollowUpByTone,
  generateBirthdayByTone,
  ToneSuggestion,
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

  // トーン選択の状態管理
  const [toneSelectionMode, setToneSelectionMode] = useState(true); // 最初はトーン選択画面
  const [toneSuggestions] = useState<ToneSuggestion[]>(
    messageType === "birthday"
      ? getBirthdayToneOptions()
      : getFollowUpToneOptions()
  );
  const [selectedTone, setSelectedTone] = useState<ToneSuggestion | null>(null);
  const [draft, setDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false); // LLM生成中フラグ
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [showEmailClientModal, setShowEmailClientModal] = useState(false);
  const [showMessengerConfirmModal, setShowMessengerConfirmModal] =
    useState(false);

  // メッセージタイプに応じてタイトルを切り替え
  const modalTitle =
    messageType === "birthday"
      ? `${contact.name}さんへのお祝いメッセージ`
      : `${contact.name}さんへのフォローアップ提案`;

  // トーン選択ハンドラー（非同期生成）
  const handleSelectTone = async (tone: ToneSuggestion) => {
    setSelectedTone(tone);
    setIsGenerating(true);

    // モック: 1.5秒の遅延でLLM生成をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // メッセージタイプに応じて生成関数を切り替え
    const generatedDraft =
      messageType === "birthday"
        ? generateBirthdayByTone(contact, tone.tone)
        : generateFollowUpByTone(contact, tone.tone);

    setDraft(generatedDraft);
    setIsGenerating(false);
    setToneSelectionMode(false); // ドラフト編集画面に切り替え
  };

  // 「自分で書く」選択ハンドラー
  const handleWriteOwn = () => {
    setSelectedTone(null);
    setDraft(""); // 空の文面
    setToneSelectionMode(false); // ドラフト編集画面に切り替え（空白の状態）
  };

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

        {/* トーン選択モード */}
        {toneSelectionMode ? (
          <div className="px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              トーンを選んでください
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              選択後、文面の編集と送信方法を選べます
            </p>
            <div className="space-y-3">
              {toneSuggestions.map((tone) => (
                <button
                  key={tone.tone}
                  onClick={() => handleSelectTone(tone)}
                  className="w-full text-left bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-gray-900 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tone.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {tone.label}
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {tone.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0" />
                  </div>
                </button>
              ))}

              {/* 区切り線 */}
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-xs text-gray-400">または</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* 自分で書くボタン */}
              <button
                onClick={handleWriteOwn}
                className="w-full text-left bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Edit3 className="w-6 h-6 text-gray-600" />
                    <span className="font-semibold text-gray-900">
                      自分で書く
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-9">
                  空白の状態から自由に作成できます
                </p>
              </button>
            </div>
          </div>
        ) : (
          /* ドラフト編集モード */
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-900">
                ドラフト文面
              </label>
              <button
                onClick={() => setToneSelectionMode(true)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                ← トーンを変更
              </button>
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="フォローアップメッセージを編集..."
            />
            <p className="text-xs text-gray-500 mt-2">
              文面は自由に編集できます
            </p>
          </div>
        )}

        {/* アクションボタン（ドラフト編集モードのみ表示） */}
        {!toneSelectionMode && (
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
        )}

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

        {/* ローディングモーダル */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 pt-10">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm animate-in fade-in zoom-in duration-200">
              <div className="flex flex-col items-center">
                {/* ローディングスピナー */}
                <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  メッセージを生成中...
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {selectedTone?.label}トーンで作成しています
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
