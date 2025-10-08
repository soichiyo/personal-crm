import { Reminder } from '../types/Reminder';

export const sampleReminders: Reminder[] = [
  {
    id: '0',
    contactId: '2',
    dueDate: new Date(), // 今日 - 佐藤花子さんの誕生日
    type: 'birthday',
    interval: 'birthday',
    completed: false,
  },
  {
    id: '1',
    contactId: '1',
    dueDate: new Date(), // 今日
    type: 'keep-in-touch',
    interval: '1week',
    completed: false,
  },
  {
    id: '2',
    contactId: '2',
    dueDate: new Date(), // 今日
    type: 'keep-in-touch',
    interval: '3weeks',
    completed: false,
  },
  {
    id: '3',
    contactId: '3',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1週間後
    type: 'keep-in-touch',
    interval: '1week',
    completed: false,
  },
];
