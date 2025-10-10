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
  status: "new" | "archived" | "active";
  aiSearchStatus?: "pending" | "processing" | "completed" | "failed";
  birthday?: Date; // 誕生日
  birthdayMessageSent?: boolean; // 誕生日メッセージ送信済みフラグ

  // 1009-02 拡張フィールド
  prairieCardUrl?: string; // プレーリーカードURL
  photoUrl?: string; // プロフィール写真URL
  nameReading?: string; // 名前のよみ
  tagline?: string; // 一言説明（肩書や意気込み）
  bio?: string; // 紹介文（数百文字）
  phone?: string; // 電話番号
  email?: string; // メールアドレス

  // 組織情報
  organization?: {
    name: string; // 組織名
    title: string; // 肩書
    phone?: string; // 電話番号
    address?: string; // 住所
    url?: string; // URL
  };

  // SNSリンク
  social?: {
    twitter?: string; // 𝕏
    instagram?: string;
    line?: string;
    note?: string;
    facebook?: string;
    linkedin?: string;
    eight?: string;
    tiktok?: string;
    youtube?: string;
    sansan?: string;
    discord?: string;
    telegram?: string;
    github?: string;
    whatsapp?: string;
    chatwork?: string;
    mixi?: string;
  };

  // コンテンツURL（自己紹介記事、noteなど）
  contentUrls?: string[];
}
