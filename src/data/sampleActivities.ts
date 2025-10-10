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
  {
    id: '6',
    contactId: '1',
    type: 'birthday',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4日前
    description: '🎂 田中 太郎さんの誕生日',
  },
  {
    id: '7',
    contactId: '2',
    type: 'promotion',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5日前
    description: '🎉 佐藤 花子さんが部長に昇進',
  },
  {
    id: '8',
    contactId: '3',
    type: 'job-change',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6日前
    description: '💼 鈴木 一郎さんがABC株式会社に転職',
  },
  {
    id: '9',
    contactId: '4',
    type: 'marriage',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7日前
    description: '💒 高橋 美咲さんが結婚',
  },
  {
    id: '10',
    contactId: '5',
    type: 'new-product',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8日前
    description: '🚀 渡辺 健太さんの会社が新商品を発表',
  },
];
