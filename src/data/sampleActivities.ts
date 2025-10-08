import { Activity } from '../types/Activity';

export const sampleActivities: Activity[] = [
  {
    id: '1',
    contactId: '2',
    type: 'follow-up-sent',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2時間前
    description: '佐藤 花子さんに連絡しました',
  },
  {
    id: '2',
    contactId: '1',
    type: 'note-added',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5時間前
    description: '田中 太郎さんのメモを追加',
  },
  {
    id: '3',
    contactId: '3',
    type: 'meeting',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1日前
    description: '鈴木 一郎さんとミーティング',
  },
  {
    id: '4',
    contactId: '4',
    type: 'follow-up-sent',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2日前
    description: '高橋 美咲さんに連絡しました',
  },
  {
    id: '5',
    contactId: '5',
    type: 'email-received',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3日前
    description: '渡辺 健太さんからメールを受信',
  },
];
