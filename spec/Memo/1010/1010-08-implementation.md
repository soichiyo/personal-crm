# メール・Messenger連携による連絡ステップの短縮 - 実装完了

## 実装日
2025-10-10

## 概要
FollowUpModal（お礼の連絡・お祝いメッセージ）に「メールで送る」「Messengerで開く」ボタンを追加し、連絡を取るステップを大幅に短縮しました。

## 現状の問題（AsIs）

### メール送信の場合
1. モーダルでメッセージ編集
2. 「コピー」をタップ
3. モーダルを閉じる
4. ❌ メールクライアントを自分で開く
5. ❌ メールアドレスがどこだっけ？（モーダル内でわからない）
6. ❌ アドレスを入力
7. ❌ 本文を貼り付け
8. 送信

**問題**: 7-8ステップ、メールアドレスがわからない、手作業が多い

### Messenger送信の場合
1. モーダルでメッセージ編集
2. 「コピー」をタップ
3. モーダルを閉じる
4. ❌ この人のFacebook Messengerはどこで開けるんだ？（モーダル内でわからない）
5. ❌ Messengerアプリを開く
6. ❌ 該当の人を探す
7. ❌ 本文を貼り付け
8. 送信

**問題**: 7-8ステップ、相手を探すのが大変、手作業が多い

---

## 改善後（ToBe）

### メール送信の場合
1. モーダルでメッセージ編集
2. ✨ **「メールで送る」ボタンをタップ**
3. ✨ **メールクライアントが開き、宛先と本文が自動入力されている**
4. 送信するだけ

**改善**: 7-8ステップ → **4ステップ**、完全自動入力

### Messenger送信の場合
1. モーダルでメッセージ編集
2. ✨ **「Messengerで開く」ボタンをタップ**
3. ✨ **クリップボードにコピー＆Messengerアプリで該当の人のページが開く**
4. 本文をペーストして送信

**改善**: 7-8ステップ → **4ステップ**、自動でMessenger起動・相手を開く

---

## 実装内容

### 1. ボタンの追加（縦並び配置）

```
┌─────────────────────────────────┐
│ お祝いメッセージ               │
├─────────────────────────────────┤
│ [メッセージ編集エリア]         │
│                                 │
├─────────────────────────────────┤
│ [コピー]                       │  ← 常に表示
│ [📧 メールで送る]              │  ← email存在時のみ
│ [💬 Messengerで開く]           │  ← facebook存在時のみ
│ [✓ 送信済にする]               │  ← 常に表示
└─────────────────────────────────┘
```

### 2. ボタンの表示条件

- **「コピー」**: 常に表示（グレー背景）
- **「メールで送る」**: `contact.email`が存在する場合のみ表示（青背景）
- **「Messengerで開く」**: `contact.social?.facebook`が存在する場合のみ表示（水色背景）
- **「送信済にする」**: 常に表示（黒背景）

### 3. 各ボタンの実装

#### メールで送るボタン

```typescript
const handleSendEmail = () => {
  if (!contact.email) return;

  const subject = encodeURIComponent(
    messageType === "birthday"
      ? `${contact.name}さん、お誕生日おめでとうございます！`
      : "ご連絡"
  );
  const body = encodeURIComponent(draft);
  const mailtoUrl = `mailto:${contact.email}?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;
  // モーダルは開いたまま
};
```

**動作**:
- `mailto:` スキームを使用
- 件名と本文を自動入力
- デフォルトメールクライアントが開く
- モーダルは開いたまま（送信後「送信済にする」を押せる）

#### Messengerで開くボタン

```typescript
const handleOpenMessenger = async () => {
  if (!contact.social?.facebook) return;

  // まずコピー
  try {
    await navigator.clipboard.writeText(draft);
    setShowCopyToast(true);
    setTimeout(() => {
      setShowCopyToast(false);
    }, 1000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }

  // FacebookのURLからMessenger URLを生成
  const getFacebookMessengerUrl = (facebookUrl: string): string => {
    // https://facebook.com/username → https://m.me/username
    const username = facebookUrl.replace(/https?:\/\/(www\.)?facebook\.com\//, "");
    return `https://m.me/${username}`;
  };

  const messengerUrl = getFacebookMessengerUrl(contact.social.facebook);
  window.location.href = messengerUrl;
  // モーダルは開いたまま
};
```

**動作**:
1. メッセージをクリップボードにコピー
2. 「✓ コピーしました」フラッシュ表示
3. FacebookのURLから`m.me/username`形式のURLを生成
4. Messenger Universal LinkでMessengerアプリを開く
5. 該当の人のメッセージページが開く
6. ユーザーは貼り付けて送信するだけ
7. モーダルは開いたまま（送信後「送信済にする」を押せる）

---

## ユーザーフロー

### メールで送る場合

```
[お祝いを送る] タップ
    ↓
┌─────────────────────────┐
│ メッセージ編集          │
│                         │
│ [コピー]               │
│ [📧 メールで送る] ← タップ
│ [送信済にする]         │
└─────────────────────────┘
    ↓
メールクライアント起動
To: hanako.sato@xyz-corp.com
Subject: お誕生日おめでとうございます！
Body: （メッセージ自動入力済み）
    ↓
送信 → アプリに戻る
    ↓
[送信済にする] タップ → 完了✨
```

### Messengerで送る場合

```
[お祝いを送る] タップ
    ↓
┌─────────────────────────┐
│ メッセージ編集          │
│                         │
│ [コピー]               │
│ [💬 Messengerで開く] ← タップ
│ [送信済にする]         │
└─────────────────────────┘
    ↓
✓ コピーしました（フラッシュ）
    ↓
Messengerアプリ起動
佐藤花子さんのページが開く
    ↓
ペースト → 送信 → アプリに戻る
    ↓
[送信済にする] タップ → 完了✨
```

---

## 技術的詳細

### mailto: スキーム
- iOS/Androidの標準サポート
- デフォルトメールクライアント（Mail.app、Gmail等）が開く
- URLエンコードで日本語対応

### Messenger Universal Link (m.me)
- `https://m.me/{username}` 形式
- Messengerアプリがインストール済み → Messengerアプリで開く
- 未インストール → ブラウザでMessenger Webが開く
- FacebookのURLから自動変換

---

## 改善効果

### ステップ削減
- **メール**: 7-8ステップ → 4ステップ（50%削減）
- **Messenger**: 7-8ステップ → 4ステップ（50%削減）

### UX向上
✅ **自動入力**: メールアドレス・件名・本文が自動入力  
✅ **自動起動**: ワンタップでメール/Messengerが開く  
✅ **エラー防止**: メールアドレス入力ミス、相手を探す手間がゼロ  
✅ **柔軟性**: 各送信方法を選べる  
✅ **完全互換**: 既存の「コピー」「送信済」も維持

---

## 変更ファイル
- `src/components/FollowUpModal.tsx` - ボタン追加、ハンドラ実装

## テスト確認項目

- [x] ビルドエラーなし
- [ ] emailがある場合「メールで送る」ボタンが表示される
- [ ] emailがない場合「メールで送る」ボタンが非表示
- [ ] facebookがある場合「Messengerで開く」ボタンが表示される
- [ ] facebookがない場合「Messengerで開く」ボタンが非表示
- [ ] 「メールで送る」をタップするとメールクライアントが開く
- [ ] 件名と本文が自動入力されている
- [ ] 「Messengerで開く」をタップするとコピーされる
- [ ] Messengerアプリが開く
- [ ] モーダルは開いたまま
- [ ] 縦並びのボタン配置が見やすい

## 備考

- モックアップとして最小限の実装
- 実際のFacebook URLフォーマットは多様なため、正規表現での抽出も検討可能
- LINE、Instagram等の他SNSも同様のパターンで実装可能
- 将来的にデフォルトメールクライアント選択機能も追加可能

