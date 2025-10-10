import { Contact } from "../types/Contact";

export interface FollowUpSuggestion {
  reason: string;
  draft: string;
}

/**
 * AI提案生成（モック実装）
 * 実際のAIは使わず、テンプレートベースの固定文章を生成
 */
export const generateFollowUpSuggestion = (
  contact: Contact
): FollowUpSuggestion => {
  // 提案理由（固定）
  const reason = "名刺交換した直後です。早めの連絡で印象を残しましょう。";

  // ドラフト文面（名前を埋め込む）
  const draft = `${contact.name}さん

先日はお話しいただきありがとうございました。
${contact.company}での取り組みについて、大変興味深く伺いました。

またお会いできる機会があれば嬉しいです。
今後ともよろしくお願いいたします。`;

  return { reason, draft };
};

/**
 * 誕生日お祝いメッセージ生成（モック実装）
 * 実際のAIは使わず、テンプレートベースの固定文章を生成
 */
export const generateBirthdaySuggestion = (
  contact: Contact
): FollowUpSuggestion => {
  // 年齢を計算（birthdayがある場合）
  const age = contact.birthday
    ? new Date().getFullYear() - new Date(contact.birthday).getFullYear()
    : null;

  // 提案理由（固定）
  const reason = "今日は誕生日です。お祝いのメッセージを送りましょう。";

  // ドラフト文面（名前と年齢を埋め込む）
  const draft = `${contact.name}さん

お誕生日おめでとうございます！${age ? `${age}歳` : ""}🎂

いつもお世話になっております。
素敵な一年になりますようお祈りしています。

今後ともよろしくお願いいたします。`;

  return { reason, draft };
};
