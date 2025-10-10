# モーダルUI改善（メールクライアント選択・Messenger確認） - 実装完了

## 実装日
2025-10-10

## 概要
1. 全てのコンタクトに仮想のEmail Addressを追加
2. 「メールで送る」ボタンでメールクライアント選択サブモーダルを表示
3. 「Messengerで送る」ボタンでコピー確認サブモーダルを表示

## 実装内容

### 1. 全コンタクトにEmailアドレスを追加

**ファイル**: `src/data/sampleContacts.ts`

全5件のコンタクトに仮想のemailアドレスを追加：
- id: 1（田中太郎）: `taro.tanaka@abc-corp.co.jp`
- id: 2（佐藤花子）: `hanako.sato@xyz-corp.com` （既存）
- id: 3（鈴木一郎）: `ichiro.suzuki@def-tech.com`
- id: 4（高橋美咲）: `misaki.takahashi@ghi-ventures.jp`
- id: 5（渡辺健太）: `kenta.watanabe@jkl-design.studio`

**効果**: 全てのコンタクトで「メールで送る」ボタンが表示されるようになる

---

### 2. メールクライアント選択サブモーダル

#### UI（ボトムシート形式）

```
┌─────────────────────────────────┐
│ メールクライアントを選択       │
├─────────────────────────────────┤
│ 📧 デフォルトメールアプリ      │
│ ✉️ Gmail                        │
│ 📨 Outlook                      │
│                                 │
│ [キャンセル]                   │
└─────────────────────────────────┘
```

#### 動作フロー

1. 「メールで送る」ボタンをタップ
2. ✨ **メールクライアント選択サブモーダルが開く**
3. クライアントを選択（デフォルト/Gmail/Outlook）
4. 選択したメールクライアントが開く（モックではmailto:で統一）
5. 宛先・件名・本文が自動入力されている
6. サブモーダル閉じる、メインモーダルは開いたまま

#### 技術実装

```typescript
const [showEmailClientModal, setShowEmailClientModal] = useState(false);

const handleSendEmail = () => {
  if (!contact.email) return;
  setShowEmailClientModal(true);
};

const handleSelectEmailClient = (_client: string) => {
  const subject = encodeURIComponent(
    messageType === "birthday"
      ? `${contact.name}さん、お誕生日おめでとうございます！`
      : "ご連絡"
  );
  const body = encodeURIComponent(draft);
  const mailtoUrl = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  
  window.location.href = mailtoUrl;
  setShowEmailClientModal(false);
};
```

**z-index**: `z-[70]`（メインモーダルより上）

---

### 3. Messenger確認サブモーダル

#### ボタン名変更

「Messengerで開く」→ **「Messengerで送る」**

#### UI（センターモーダル形式）

```
┌───────────────────────────────┐
│ メッセージをコピーしましたか？│
├───────────────────────────────┤
│ Messengerアプリを開きます。   │
│ メッセージを貼り付けて送信して│
│ ください。                     │
│                               │
│ [はい、Messengerを開く]      │
│ [キャンセル]                 │
└───────────────────────────────┘
```

#### 動作フロー

1. 「Messengerで送る」ボタンをタップ
2. メッセージを自動コピー
3. 「✓ コピーしました」フラッシュ表示
4. ✨ **確認モーダルが開く**
5. 「はい、Messengerを開く」をタップ
6. Messengerアプリが開く（該当の人のページ）
7. ユーザーは貼り付けて送信
8. サブモーダル閉じる、メインモーダルは開いたまま

#### 技術実装

```typescript
const [showMessengerConfirmModal, setShowMessengerConfirmModal] = useState(false);

const handleOpenMessenger = async () => {
  if (!contact.social?.facebook) return;
  
  // まずコピー
  try {
    await navigator.clipboard.writeText(draft);
    setShowCopyToast(true);
    setTimeout(() => {
      setShowCopyToast(false);
      setShowMessengerConfirmModal(true);
    }, 1000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

const handleConfirmMessengerSend = () => {
  if (!contact.social?.facebook) return;
  
  const getFacebookMessengerUrl = (facebookUrl: string): string => {
    const username = facebookUrl.replace(/https?:\/\/(www\.)?facebook\.com\//, "");
    return `https://m.me/${username}`;
  };
  
  const messengerUrl = getFacebookMessengerUrl(contact.social.facebook);
  window.location.href = messengerUrl;
  setShowMessengerConfirmModal(false);
};
```

**z-index**: `z-[70]`（メインモーダルより上）

---

## UXフロー全体

### メール送信

```
[お祝いを送る] タップ
    ↓
メインモーダル開く
    ↓
[メールで送る] タップ
    ↓
┌─────────────────────┐
│ メールクライアント選択│  ← サブモーダル
│ ・デフォルト        │
│ ・Gmail             │
│ ・Outlook           │
└─────────────────────┘
    ↓ 選択
メールアプリ起動（宛先・本文入力済み）
    ↓
送信 → アプリに戻る
    ↓
[送信済にする] → 完了✨
```

### Messenger送信

```
[お祝いを送る] タップ
    ↓
メインモーダル開く
    ↓
[Messengerで送る] タップ
    ↓
✓ コピーしました
    ↓
┌─────────────────────────┐
│ メッセージをコピーしましたか？│  ← サブモーダル
│                         │
│ [はい、Messengerを開く] │
│ [キャンセル]           │
└─────────────────────────┘
    ↓ はいをタップ
Messengerアプリ起動
    ↓
貼り付け → 送信 → アプリに戻る
    ↓
[送信済にする] → 完了✨
```

---

## UI/UX改善ポイント

### メールクライアント選択モーダル

✅ **明示的な選択**: どのアプリで開くか選べる  
✅ **ボトムシート**: モバイルUIの定番パターン  
✅ **スムーズなアニメーション**: `slide-in-from-bottom`  
✅ **キャンセル可能**: 間違えても戻れる

### Messenger確認モーダル

✅ **確認プロセス**: コピーしたことを意識させる  
✅ **説明文**: 何をすればいいかわかりやすい  
✅ **センターモーダル**: 重要な確認には適したスタイル  
✅ **2段階アクション**: 誤タップ防止

---

## 技術的詳細

### モーダルの階層構造

```
z-[50]: メインモーダル（FollowUpModal）
z-[60]: コピー完了Toast
z-[70]: サブモーダル（EmailClient選択 / Messenger確認）
```

### アニメーション

- **メールクライアント選択**: ボトムから上にスライド
- **Messenger確認**: フェード＋ズームイン
- **共通**: `duration-200`で高速レスポンス

### モックの想定

- メールクライアント選択: 選択肢があるが、全て`mailto:`で統一
- 実装時: Gmail用URL、Outlook用URLなどに対応可能

---

## 変更ファイル

- `src/data/sampleContacts.ts` - 全コンタクトにemail追加
- `src/components/FollowUpModal.tsx` - サブモーダル2つ追加

## テスト確認項目

- [x] ビルドエラーなし
- [ ] 全コンタクトで「メールで送る」ボタンが表示される
- [ ] 「メールで送る」タップでメールクライアント選択モーダルが開く
- [ ] クライアント選択でメールアプリが開く
- [ ] 「Messengerで送る」表示になっている
- [ ] 「Messengerで送る」タップでコピーされる
- [ ] コピー後、確認モーダルが開く
- [ ] 「はい、Messengerを開く」でMessengerアプリが開く
- [ ] サブモーダルのキャンセルが機能する
- [ ] メインモーダルは開いたまま

## 備考

- モックアップ実装のため、メールクライアント選択は全て`mailto:`で統一
- 実際の実装では、Gmail用URL（`googlegmail://`）等に対応可能
- Messenger確認モーダルにより、ユーザーが「コピーした」ことを意識しやすくなる
- ボトムシートとセンターモーダルの使い分けで、UIに変化を付ける

