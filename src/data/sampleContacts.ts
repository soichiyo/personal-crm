import { Contact } from "../types/Contact";

export const sampleContacts: Contact[] = [
  {
    id: 1,
    name: "田中 太郎",
    company: "ABC株式会社",
    title: "営業部長",
    source: "紙名刺",
    metAt: "2024年10月1日 - Tech Conference Tokyo",
    avatar: "👨‍💼",
    priority: "high",
    createdDate: new Date("2024-10-01"),
    metLocation: "東京ビッグサイト",
    tags: ["ビジネス", "営業"],
    profileEmoji: "👨‍💼",
    status: "active",
    aiSearchStatus: "completed",
    birthday: (() => {
      // デモ用：常に今日を誕生日として設定
      const today = new Date();
      return new Date(1985, today.getMonth(), today.getDate());
    })(),
    nameReading: "たなか たろう",
    phone: "090-1111-2222",
    email: "taro.tanaka@abc-corp.co.jp",

    organization: {
      name: "ABC株式会社",
      department: "営業本部",
      jobTitle: "部長",
      phone: "03-1234-5678",
      address: "東京都千代田区丸の内1-1-1 ABCビル8F",
      url: "https://abc-corp.co.jp",
    },

    social: {
      linkedin: "https://linkedin.com/in/taro-tanaka-abc",
    },

    contentUrls: [
      "https://abc-corp.co.jp/news/2024/sales-strategy",
      "https://linkedin.com/in/taro-tanaka-abc",
      "https://note.com/taro-tanaka/sales-tips",
    ],
  },
  {
    id: 2,
    name: "佐藤 花子",
    company: "XYZ Corporation",
    title: "Product Manager",
    source: "紙名刺",
    metAt: "2024年10月3日 - Startup Meetup",
    avatar: "👩‍💼",
    priority: "high",
    createdDate: new Date("2024-10-03"),
    metLocation: "渋谷ヒカリエ",
    tags: ["スタートアップ", "プロダクト"],
    profileEmoji: "👩‍💼",
    status: "active",
    birthday: new Date("1990-10-10"), // 10月10日生まれ（明後日）

    // 1009-02拡張フィールド（プレーリーカードからインポート）
    prairieCardUrl: "https://prairie.cards/satoh-hanako",
    nameReading: "さとう はなこ",
    tagline: "テクノロジーで世界を変える",
    bio: "XYZ Corporationでプロダクトマネージャーとして、スタートアップエコシステムの活性化に取り組んでいます。元エンジニアの経験を活かし、ユーザー中心のプロダクト開発を推進。テック業界で10年以上の経験があり、特にSaaS領域に精通しています。",
    phone: "090-1234-5678",
    email: "hanako.sato@xyz-corp.com",

    organization: {
      name: "XYZ Corporation",
      department: "プロダクト開発部",
      jobTitle: "マネージャー",
      phone: "03-5555-1234",
      address: "東京都渋谷区道玄坂1-2-3 渋谷ビル10F",
      url: "https://xyz-corp.com",
    },

    social: {
      twitter: "https://twitter.com/hanako_sato",
      instagram: "https://instagram.com/hanako.sato",
      line: "https://line.me/ti/p/hanako-sato",
      note: "https://note.com/hanako_sato",
      facebook: "https://facebook.com/hanako.sato",
      linkedin: "https://linkedin.com/in/hanako-sato",
      github: "https://github.com/hanako-sato",
    },

    contentUrls: [
      "https://xyz-corp.com/blog/product-strategy-2024",
      "https://note.com/hanako_sato/n/startup-mindset",
      "https://techcrunch.com/interview/hanako-sato",
      "https://github.com/hanako-sato/portfolio",
      "https://speakerdeck.com/hanako-sato/product-management",
    ],
  },
  {
    id: 3,
    name: "鈴木 一郎",
    company: "DEF Technologies",
    title: "CTO",
    source: "紙名刺",
    metAt: "2024年10月5日 - AI Summit",
    avatar: "👨‍💻",
    priority: "medium",
    createdDate: new Date("2024-10-05"),
    metLocation: "六本木ヒルズ",
    tags: ["AI", "技術"],
    profileEmoji: "👨‍💻",
    status: "new",
    aiSearchStatus: "processing",
    birthday: new Date("1988-11-15"), // 11月15日生まれ
    nameReading: "すずき いちろう",
    phone: "090-3333-4444",

    organization: {
      name: "DEF Technologies株式会社",
      department: "技術開発本部",
      jobTitle: "最高技術責任者 (CTO)",
      phone: "03-5555-6666",
      address: "東京都港区六本木6-10-1 六本木ヒルズ森タワー",
      url: "https://def-tech.com",
    },

    social: {
      facebook: "https://facebook.com/ichiro.suzuki",
      github: "https://github.com/ichiro-suzuki",
    },

    contentUrls: [
      "https://def-tech.com/blog/ai-innovation-2024",
      "https://qiita.com/ichiro-suzuki/ai-research",
      "https://connpass.com/event/ai-summit-2024",
    ],
  },
  {
    id: 4,
    name: "高橋 美咲",
    company: "GHI Ventures",
    title: "Investment Manager",
    source: "紙名刺",
    metAt: "2024年10月7日 - Networking Event",
    avatar: "👩‍💼",
    priority: "high",
    createdDate: new Date("2024-10-07"),
    metLocation: "丸の内",
    tags: ["投資", "VC"],
    profileEmoji: "👩‍💼",
    status: "new",
    aiSearchStatus: "failed",
    nameReading: "たかはし みさき",
    phone: "090-5555-6666",
    email: "misaki.takahashi@ghi-ventures.jp",

    organization: {
      name: "GHI Ventures株式会社",
      department: "投資部",
      jobTitle: "インベストメントマネージャー",
      phone: "03-6666-7777",
      address: "東京都千代田区丸の内2-4-1 丸の内ビルディング20F",
      url: "https://ghi-ventures.com",
    },

    social: {
      linkedin: "https://linkedin.com/in/misaki-takahashi",
      twitter: "https://twitter.com/misaki_vc",
    },

    contentUrls: [
      "https://ghi-ventures.com/insights/startup-investment-trends",
      "https://forbes.com/profile/misaki-takahashi",
      "https://crunchbase.com/person/misaki-takahashi",
    ],
  },
  {
    id: 5,
    name: "渡辺 健太",
    company: "JKL Design Studio",
    title: "Creative Director",
    source: "紙名刺",
    metAt: "2024年10月8日 - Design Conference",
    avatar: "🎨",
    priority: "medium",
    createdDate: new Date("2024-10-08"),
    metLocation: "表参道",
    tags: ["デザイン", "クリエイティブ"],
    profileEmoji: "🎨",
    status: "active",
    aiSearchStatus: "pending",
    nameReading: "わたなべ けんた",
    phone: "090-7777-8888",
    email: "kenta.watanabe@jkl-design.studio",

    organization: {
      name: "JKL Design Studio株式会社",
      department: "クリエイティブ部",
      jobTitle: "クリエイティブディレクター",
      phone: "03-7777-8888",
      address: "東京都渋谷区神宮前5-1-1 表参道ビル3F",
      url: "https://jkl-design.studio",
    },

    social: {
      twitter: "https://twitter.com/kenta_design",
      instagram: "https://instagram.com/kenta.design",
    },

    contentUrls: [
      "https://jkl-design.studio/portfolio/creative-director",
      "https://dribbble.com/kenta-watanabe",
      "https://behance.net/kenta-watanabe",
    ],
  },
];
