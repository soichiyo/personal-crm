import { Notification } from "../types/Notification";

export const sampleNotifications: Notification[] = [
  {
    id: "3",
    type: "general",
    title: "Personal CRMへようこそ",
    message:
      "まずは名刺をスキャンして始めましょう。プロフィール情報を充実させることで、より効果的なネットワーキングが可能になります。",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
    read: true,
  },
  {
    id: "7",
    type: "general",
    title: "新機能のお知らせ",
    message:
      "プロフィール写真のアップロード機能が追加されました。コンタクト編集画面からご利用いただけます。",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3時間前
    read: false,
  },
  {
    id: "8",
    type: "general",
    title: "メンテナンスのお知らせ",
    message:
      "2024年10月15日 2:00-4:00の間、システムメンテナンスを実施します。この間、一部機能がご利用いただけません。",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12時間前
    read: false,
  },
  {
    id: "4",
    type: "ai-search",
    contactId: "1",
    title: "山田太郎さんのAI検索",
    message: "SNSプロフィール情報の検索が完了しました。",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15分前
    read: false,
    actionUrl: "/contacts/1",
  },
  {
    id: "5",
    type: "ai-search",
    contactId: "3",
    title: "鈴木次郎さんのAI検索",
    message: "情報の検索中です...",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5分前
    read: false,
  },
  {
    id: "6",
    type: "ai-search",
    contactId: "4",
    title: "田中三郎さんのAI検索",
    message: "情報の検索に失敗しました。手動で追加してください。",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1時間前
    read: false,
  },
];
