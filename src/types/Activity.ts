export type ActivityType =
  | 'follow-up-sent'
  | 'email-received'
  | 'meeting'
  | 'note-added'
  | 'birthday'
  | 'promotion'
  | 'marriage'
  | 'childbirth'
  | 'job-change'
  | 'new-product';

export interface Activity {
  id: string;
  contactId: string;
  type: ActivityType;
  timestamp: Date;
  description: string;
}
