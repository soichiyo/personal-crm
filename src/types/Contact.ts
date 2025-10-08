export interface Contact {
  id: number;
  name: string;
  company: string;
  title: string;
  source: string;
  metAt: string;
  avatar: string;
  priority: "high" | "medium" | "low";

  // Phase 1.1 拡張フィールド
  createdDate: Date;
  metLocation?: string;
  tags: string[];
  profileEmoji?: string;
  status: 'new' | 'archived' | 'active';
  aiSearchStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  birthday?: Date; // 誕生日
}
