import { Notification } from '../types/Notification';

export const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'general',
    contactId: '2',
    title: '🎂 誕生日のお知らせ',
    message: '佐藤 花子さんの誕生日です！お祝いメッセージを送りましょう',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10分前
    read: false,
    actionUrl: '/contacts/2',
  },
  {
    id: '1-1',
    type: 'general',
    contactId: '1',
    title: '新しいコンタクトが追加されました',
    message: '山田太郎さんの情報が追加されました。フォローアップを検討してください。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分前
    read: false,
    actionUrl: '/contacts/1',
  },
  {
    id: '2',
    type: 'general',
    contactId: '2',
    title: 'リマインダー期日到来',
    message: '佐藤花子さんへのフォローアップの時期です。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
    read: false,
    actionUrl: '/contacts/2',
  },
  {
    id: '3',
    type: 'general',
    title: 'システム通知',
    message: 'Personal CRMへようこそ！まずは名刺をスキャンして始めましょう。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
    read: true,
  },
  {
    id: '4',
    type: 'ai-search',
    contactId: '1',
    title: '山田太郎さんのAI検索',
    message: 'SNSプロフィール情報の検索が完了しました。',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15分前
    read: false,
    actionUrl: '/contacts/1',
  },
  {
    id: '5',
    type: 'ai-search',
    contactId: '3',
    title: '鈴木次郎さんのAI検索',
    message: '情報の検索中です...',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5分前
    read: false,
  },
  {
    id: '6',
    type: 'ai-search',
    contactId: '4',
    title: '田中三郎さんのAI検索',
    message: '情報の検索に失敗しました。手動で追加してください。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1時間前
    read: false,
  },
];
