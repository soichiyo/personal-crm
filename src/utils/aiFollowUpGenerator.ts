import { Contact } from "../types/Contact";

export interface FollowUpSuggestion {
  reason: string;
  draft: string;
}

export type ToneType = "casual" | "neutral" | "formal";

export interface ToneSuggestion {
  tone: ToneType;
  label: string;
  icon: string;
  description: string; // トーンの説明文（誰向けか）
  draft?: string; // ドラフト文面（生成後に追加）
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
 * お礼メッセージのトーン選択肢を取得（説明文のみ）
 */
export const getFollowUpToneOptions = (): ToneSuggestion[] => {
  return [
    {
      tone: "casual",
      label: "カジュアル",
      icon: "📝",
      description: "親しい友人や同僚向け",
    },
    {
      tone: "neutral",
      label: "ニュートラル",
      icon: "📄",
      description: "ビジネスシーンで使いやすい",
    },
    {
      tone: "formal",
      label: "フォーマル",
      icon: "🎩",
      description: "初対面や目上の方向け",
    },
  ];
};

/**
 * 選択されたトーンでお礼メッセージを生成（モック実装）
 * 実際のLLM統合時はここでAPI呼び出し
 */
export const generateFollowUpByTone = (
  contact: Contact,
  tone: ToneType
): string => {
  switch (tone) {
    case "casual":
      return `${contact.name}さん

先日はありがとうございました！
${contact.company}でのお話、とても興味深かったです。

また会えたら嬉しいです。
今後ともよろしくお願いします。`;

    case "neutral":
      return `${contact.name}さん

先日はお話しいただきありがとうございました。
${contact.company}での取り組みについて、大変興味深く伺いました。

またお会いできる機会があれば嬉しいです。
今後ともよろしくお願いいたします。`;

    case "formal":
      return `${contact.name}様

先日は貴重なお時間をいただき、誠にありがとうございました。
${contact.company}様でのお取り組みについて、大変勉強になりました。

今後とも何かご協力できることがございましたら、
お気軽にお声がけいただければ幸いです。

引き続きよろしくお願い申し上げます。`;
  }
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

/**
 * 誕生日お祝いメッセージのトーン選択肢を取得（説明文のみ）
 */
export const getBirthdayToneOptions = (): ToneSuggestion[] => {
  return [
    {
      tone: "casual",
      label: "カジュアル",
      icon: "📝",
      description: "友達や親しい仲間向け",
    },
    {
      tone: "neutral",
      label: "ニュートラル",
      icon: "📄",
      description: "職場の同僚向け",
    },
    {
      tone: "formal",
      label: "フォーマル",
      icon: "🎩",
      description: "取引先や上司向け",
    },
  ];
};

/**
 * 選択されたトーンで誕生日メッセージを生成（モック実装）
 * 実際のLLM統合時はここでAPI呼び出し
 */
export const generateBirthdayByTone = (
  contact: Contact,
  tone: ToneType
): string => {
  const age = contact.birthday
    ? new Date().getFullYear() - new Date(contact.birthday).getFullYear()
    : null;

  switch (tone) {
    case "casual":
      return `${contact.name}さん

お誕生日おめでとうございます！${age ? `${age}歳` : ""}🎂🎉

素敵な一年になりますように！
またお会いできるのを楽しみにしています。`;

    case "neutral":
      return `${contact.name}さん

お誕生日おめでとうございます！${age ? `${age}歳` : ""}🎂

いつもお世話になっております。
素敵な一年になりますようお祈りしています。

今後ともよろしくお願いいたします。`;

    case "formal":
      return `${contact.name}様

お誕生日おめでとうございます。${age ? `${age}歳` : ""}

日頃よりお世話になっており、心より感謝申し上げます。
${contact.name}様のご健康とご多幸を心よりお祈り申し上げます。

今後とも何卒よろしくお願い申し上げます。`;
  }
};
