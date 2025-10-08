export interface Activity {
  id: string;
  contactId: string;
  type: 'follow-up-sent' | 'email-received' | 'meeting' | 'note-added';
  timestamp: Date;
  description: string;
}
