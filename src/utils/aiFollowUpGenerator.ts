import { Contact } from '../types/Contact';

export interface FollowUpSuggestion {
  reason: string;
  draft: string;
}

/**
 * AI提案生成（モック実装）
 * 実際のAIは使わず、テンプレートベースの固定文章を生成
 */
export const generateFollowUpSuggestion = (contact: Contact): FollowUpSuggestion => {
  // 提案理由（固定）
  const reason = '名刺交換した直後です。早めの連絡で印象を残しましょう。';

  // ドラフト文面（名前を埋め込む）
  const draft = `${contact.name}さん

先日はお話しいただきありがとうございました。
${contact.company}での取り組みについて、大変興味深く伺いました。

またお会いできる機会があれば嬉しいです。
今後ともよろしくお願いいたします。`;

  return { reason, draft };
};
