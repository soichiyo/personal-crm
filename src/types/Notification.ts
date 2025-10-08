export interface Notification {
  id: string;
  type: 'general' | 'ai-search';
  contactId?: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}
