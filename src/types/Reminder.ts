export interface Reminder {
  id: string;
  contactId: string;
  dueDate: Date;
  type: 'keep-in-touch' | 'birthday' | 'custom';
  interval?: '1week' | '3weeks' | '1month' | 'ai' | 'birthday';
  completed: boolean;
}
