# Personal CRM - 実装タスクリスト（プロトタイプ版）

## 🎯 プロトタイプ方針

**目的**: 社内エンジニア・デザイナーとのコミュニケーション用ハリボテプロトタイプ

**実装方針**:
- ✅ **ビジュアル重視**: UIコンポーネントとアニメーションに集中
- ✅ **簡易状態管理**: useStateのみ（各コンポーネント内で完結）
- ✅ **モックデータ**: ハードコーディングされたサンプルデータ
- ✅ **フロントエンドのみ**: バックエンド連携なし
- ❌ **永続化なし**: リロードでリセットOK
- ❌ **複雑なロジックなし**: AI処理・OCR等は後回し

詳細な仕様は以下を参照：
- ハイレベル構成: [`poc_phase1.md`](./poc_phase1.md)
- インタラクション詳細: [`poc_phase1_interactions.md`](./poc_phase1_interactions.md)

---

## 📋 タスク管理ルール

### 優先度
- **P0**: 必須（プロトタイプに必要）
- **P1**: 重要（プロトタイプに含める）
- **P2**: 追加機能（本実装時に検討）

### ステータス
- ⬜ 未着手
- 🟦 進行中
- ✅ 完了
- ⏸️ 保留（プロトタイプでは不要）

---

## Phase 1: 基盤コンポーネント開発

### 1.1 プロジェクト基盤（P0）

- ✅ **型定義の拡張**（プロトタイプ用簡易版）
  - `Contact` 型に以下フィールド追加:
    - `createdDate: Date` - 作成日付
    - `metLocation?: string` - 出会った場所
    - `tags: string[]` - タグ配列
    - `profileEmoji?: string` - プロフィール絵文字
    - `status: 'new' | 'archived' | 'active'` - コンタクトステータス
  - `Reminder` 型を新規作成（シンプル版）:
    - `id: string`
    - `contactId: string`
    - `contactName: string` - 表示用
    - `dueDate: Date`
    - `message: string`
    - `completed: boolean`
  - `Activity` 型を新規作成（シンプル版）:
    - `id: string`
    - `contactName: string`
    - `message: string`
    - `timestamp: Date`
  - `Notification` 型を新規作成（シンプル版）:
    - `id: string`
    - `type: 'general' | 'ai-search'`
    - `title: string`
    - `message: string`
    - `timestamp: Date`
  - ファイル: `src/types/Contact.ts`, `src/types/Reminder.ts`, `src/types/Activity.ts`, `src/types/Notification.ts`
  - 依存: なし
  - **プロトタイプ注**: 最低限の型定義のみ。複雑な関連は省略。

- ⏸️ **状態管理の設計** _(プロトタイプでは不要 - 本実装時に検討)_
  - 各コンポーネントで `useState` を使用
  - グローバル状態管理は導入しない
  - モックデータは `src/data/` にハードコーディング

### 1.2 共通UIコンポーネント（P0）

- ✅ **Modalコンポーネント**
  - Props: `isOpen`, `onClose`, `title`, `children`
  - アニメーション: 下からスライドイン（モバイル）、フェードイン（PC）
  - 背景タップで閉じる、ESCキーで閉じる
  - モバイル横幅調整: px-4パディング + max-w-sm制約（AddModalと統一）
  - ファイル: `src/components/common/Modal.tsx`
  - 依存: なし
  - **プロトタイプ注**: 完全実装済み。Tailwindのアニメーションクラス使用。

- ✅ **Toastコンポーネント**
  - 成功/エラー/情報メッセージを表示
  - 自動でフェードアウト（デフォルト3秒）
  - ファイル: `src/components/common/Toast.tsx`
  - 依存: なし
  - **プロトタイプ注**: react-hot-toastなどのライブラリ使用を検討

- ✅ **Loadingコンポーネント**
  - スピナーアニメーション
  - テキスト表示オプション
  - ファイル: `src/components/common/Loading.tsx`
  - 依存: なし
  - **プロトタイプ注**: シンプルなCSS回転アニメーション

- ✅ **Buttonコンポーネント**
  - バリアント: primary, secondary, danger, ghost
  - サイズ: sm, md, lg
  - アイコン付きオプション
  - ファイル: `src/components/common/Button.tsx`
  - 依存: なし
  - **プロトタイプ注**: Tailwindクラスで実装

### 1.3 Notificationシステム（P1）

- ✅ **Notification Headerアイコン**
  - ベルアイコン（React Icons: `FiBell`）
  - 未読バッジ表示（赤丸 + 件数）
  - タップでモーダルオープン
  - ファイル: `src/components/NotificationIcon.tsx`
  - 依存: 状態管理

- ✅ **Notificationモーダル**
  - 2タブ構成: General / AI検索
  - タブ切り替え機能
  - 各タブにコンテンツエリア
  - ファイル: `src/components/NotificationModal.tsx`
  - 依存: Modalコンポーネント

- ✅ **General通知タブ**
  - 通知カードリスト表示
  - カードタップで該当ページへ遷移
  - スワイプで削除（既読化）
  - 一括既読ボタン
  - ファイル: `src/components/notifications/GeneralTab.tsx`
  - 依存: Notificationモーダル、状態管理

- ✅ **AI検索ステータスタブ**
  - AI検索進捗カードリスト
  - ステータス別アイコン表示（🔍⏳✅⚠️❌）
  - [確認する] / [手動で追加] ボタン
  - ファイル: `src/components/notifications/AISearchTab.tsx`
  - 依存: Notificationモーダル、状態管理

---

## Phase 2: Add Buttonフロー

### 2.1 名刺読み取りUI（P0）

- ✅ **FAB（Floating Action Button）**
  - 右下固定配置
  - プライマリカラー、＋アイコン
  - タップでカメラまたはモーダル起動
  - ファイル: `src/components/MobileView.tsx`（既に実装済み）
  - 依存: なし

- ✅ **名刺スキャンモーダル（モック）**
  - カメラUI風デザイン
  - ガイド枠表示
  - [シャッター] / [キャンセル] ボタン
  - 実際のカメラは後期実装、現在はファイル選択で代替
  - ファイル: `src/components/AddModal/BusinessCardScanner.tsx`
  - 依存: Modalコンポーネント

- ✅ **OCRローディング画面**
  - スピナー + 「名刺を読み取り中...」メッセージ
  - 2-5秒の擬似処理時間（開発中）
  - ファイル: `src/components/AddModal/OCRLoading.tsx`
  - 依存: Loadingコンポーネント

- ✅ **作成完了フィードバック**
  - 「作成されました！」トーストメッセージ
  - チェックマークアニメーション
  - 0.8秒後に自動フェードアウト
  - ファイル: Toast機能を使用
  - 依存: Toastコンポーネント

### 2.2 コンタクト作成/編集画面（P0）

- ✅ **コンタクト編集モーダル**
  - 全画面モーダル（モバイル）
  - [< 戻る] ヘッダーのみ（iOS標準スタイル）
  - 自動保存機能（500msデバウンス）
  - 「変更は自動で保存されます」メッセージ表示
  - スクロール可能なコンテンツエリア
  - ファイル: `src/components/ContactEditModal.tsx`
  - 依存: なし
  - **プロトタイプ注**: 完全実装済み。自動保存とモーダル閉鎖のタイミングを分離（バグ修正済み）

- ✅ **基本情報セクション**
  - プロフィール絵文字表示（役職ベース自動選択ロジック）
  - 名前、会社、役職、メール、電話フィールド
  - 各フィールド編集可能
  - 「[追加する]」リンク（未入力項目）
  - ファイル: `src/components/ContactEditModal/BasicInfo.tsx`
  - 依存: コンタクト編集モーダル

- ✅ **作成日付・出会った場所セクション**
  - 作成日付: 自動記録、タップで変更可能
  - 出会った場所: テキスト入力フィールド
  - ファイル: `src/components/ContactEditModal/MetInfo.tsx`
  - 依存: コンタクト編集モーダル

- ✅ **タグセクション**
  - タグ表示（チップ形式）
  - 自動付与タグ: 「紙名刺読み取り」等
  - [+ タグを追加] ボタン → タグ選択モーダル
  - ファイル: `src/components/ContactEditModal/TagSection.tsx`
  - 依存: コンタクト編集モーダル

- ✅ **メモセクション**
  - 複数行テキストエリア
  - プレースホルダー: 「どんな話をしましたか？印象に残ったことは？」
  - ファイル: `src/components/ContactEditModal/NoteSection.tsx`
  - 依存: コンタクト編集モーダル

- ✅ **フォローアップボタン**
  - [フォローアップ文章を作成] ボタン
  - タップでAIフォローアップ提案モーダルを開く（モック）
  - ファイル: `src/components/ContactEditModal/FollowUpButton.tsx`
  - 依存: コンタクト編集モーダル

### 2.3 名刺読み取りフロー統合（P0）

- ✅ **名刺読み取りフロー全体**
  - FABタップ → スキャンモーダル → ローディング → フィードバック → 編集モーダル → Homeへ戻る
  - OCRモック処理（ランダムな名前・会社を生成）
  - 新規コンタクトを状態管理に追加（`status: 'new'`）
  - ファイル: `src/components/AddModal.tsx`（統合コンポーネント）
  - 依存: 上記すべてのコンポーネント

---

## Phase 3: Home - 新着コンタクトカード

### 3.1 カード表示UI（P0）

- ✅ **新着コンタクトカードセクション**
  - セクションヘッダー: 「新着コンタクト」（絵文字削除済み）
  - 未整理件数表示（例: 「未整理: 7件」）
  - 未整理コンタクトが0件の場合: Empty State表示
  - カードクリックで編集モーダルを開く機能（実装済み）
  - ファイル: `src/components/Home/NewContactsSection.tsx`
  - 依存: なし
  - **プロトタイプ注**: 完全実装済み。カードクリックバグ（自動保存によるモーダル即時閉鎖）も修正済み。

- ⬜ **カードスタック表示**
  - 最大5枚のカードを重ねて表示（奥行き感）
  - 最前面のカードが操作対象
  - CSS Transform で奥行き表現（`translateY`, `scale`）
  - ファイル: `src/components/Home/CardStack.tsx`
  - 依存: 新着コンタクトカードセクション
  - **プロトタイプ注**: 見た目の実装に集中。スタック効果は絶対配置で実現。

- ⬜ **コンタクトカード（表面）**
  - プロフィール絵文字（大きく中央）
  - 名前（目立つフォント）
  - 会社名・役職
  - 作成日、タグ
  - 名刺風デザイン（白背景、角丸、ソフトシャドウ）
  - ファイル: `src/components/Home/ContactCard.tsx`
  - 依存: カードスタック
  - **プロトタイプ注**: Tailwindで `bg-white rounded-2xl shadow-lg` などで実装

### 3.2 カードFlipアニメーション（P1）

- ⬜ **Flip機能実装**
  - カードタップで3D Flip（180度Y軸回転）
  - 所要時間: 0.4秒、イージング: ease-in-out
  - CSS `transform: rotateY(180deg)`, `preserve-3d`, `backface-visibility`
  - ファイル: `src/components/Home/ContactCard.tsx`（Flip機能追加）
  - 依存: コンタクトカード（表面）
  - **プロトタイプ注**: useStateでflip状態を管理。CSSアニメーションのみ実装。

- ⬜ **カード裏面（詳細・編集）**
  - メール、電話、出会った場所、メモの追加リンク
  - 「[Add email address]」等のインラインリンク
  - タグ表示
  - [< 戻る] ボタン
  - ファイル: `src/components/Home/ContactCardBack.tsx`
  - 依存: Flip機能
  - **プロトタイプ注**: リンククリックはconsole.logでOK。見た目の確認が目的。

### 3.3 カードアクション（P0）

- ✅ **アクションボタンエリア**
  - カード下部に3つのボタン配置（左から順に）
  - [⏰ あとで] / [💌 連絡する] / [🗄️ アーカイブ]（日本語化済み、Keepボタンを青色に変更）
  - ファイル: `src/components/Home/CardActions.tsx`
  - 依存: コンタクトカード
  - **プロトタイプ注**: 3つのボタンを横並びで配置

- ✅ **Archiveアクション**
  - ボタンタップでstatusを'archived'に変更（アニメーションは未実装）
  - コンタクト配列から削除（またはstatusを'archived'に変更）
  - ファイル: `src/components/Home/NewContactsSection.tsx`（Archive処理）
  - 依存: アクションボタンエリア
  - **プロトタイプ注**: アニメーションは後回し。状態変更のみ実装済み。

- ✅ **Keep in Touchアクション**
  - ボタンタップでKeep-in-Touch設定モーダルを開く
  - ファイル: `src/components/KeepInTouchModal.tsx` + `MobileView.tsx`（Keep処理）
  - 依存: アクションボタンエリア
  - **プロトタイプ注**: 完全実装済み。Reminder作成機能も含む。

- 🟦 **Laterアクション**
  - ボタンタップでカードをスワイプアウト（上方向アニメーション）
  - カードを配列の最後尾に移動
  - 次のカードを表示
  - ファイル: `src/components/Home/CardActions.tsx`（Later処理）
  - 依存: アクションボタンエリア
  - **プロトタイプ注**: 配列操作（shift + push）で実現

### 3.4 スワイプジェスチャー（P2 - プロトタイプでは後回し）

- ⏸️ **スワイプ検出ライブラリ導入** _(プロトタイプでは不要)_
  - react-swipeable または react-use-gesture
  - **プロトタイプ注**: スワイプはボタン操作で代替。本実装時に追加。

- ⏸️ **左スワイプ → Archive** _(プロトタイプでは不要)_
- ⏸️ **右スワイプ → Keep in Touch** _(プロトタイプでは不要)_
- ⏸️ **上スワイプ → Later** _(プロトタイプでは不要)_

### 3.5 カードアニメーション（P1）

- ⬜ **スワイプアウトアニメーション**
  - 右方向（Keep）: translateX(+100vw), rotate(15deg), フェード
  - 左方向（Archive）: translateX(-100vw), rotate(-15deg), フェード
  - 上方向（Later）: translateY(-100vh), scale(0.8), フェード
  - 所要時間: 0.3-0.4秒
  - ファイル: `src/components/Home/ContactCard.tsx`（アニメーション追加）
  - 依存: カードアクション
  - **プロトタイプ注**: CSS transitionとtransformで実装。Tailwindの`transition-transform`等を活用。

---

## Phase 4: Keep-in-Touch設定とReminder

### 4.1 Keep-in-Touch設定モーダル（P0）

- ✅ **設定モーダルUI**
  - タイトル: 「〇〇さん いつ連絡しますか？」（実装済み）
  - 選択肢リスト: 1週間後 / 3週間後 / 1ヶ月後 / ✨ AIにおまかせ
  - [キャンセル] / [設定する] ボタン
  - ファイル: `src/components/KeepInTouchModal.tsx`
  - 依存: Modalコンポーネント
  - **プロトタイプ注**: 完全実装済み。

- ✅ **固定期間選択**
  - ボタン形式のリスト選択
  - 選択状態の視覚的フィードバック（選択時に青色ハイライト）
  - ファイル: `src/components/KeepInTouchModal.tsx`（統合済み）
  - 依存: 設定モーダル
  - **プロトタイプ注**: useStateで選択状態を管理済み

- ✅ **Reminder作成処理**
  - 選択された期間をもとにReminder生成
  - `dueDate` = 現在日時 + 期間（calculateDueDate関数で実装）
  - Reminderを親コンポーネントのuseStateに追加
  - ファイル: `src/components/MobileView.tsx`（handleKeepInTouchConfirm）
  - 依存: 固定期間選択
  - **プロトタイプ注**: 完全実装済み。新規Reminder作成とContact status変更を含む。

- 🟦 **設定完了フィードバック**
  - 「設定しました！✨」alertメッセージ（アニメーションは未実装）
  - カードstatus変更でリストから削除
  - ファイル: `src/components/MobileView.tsx`
  - 依存: なし
  - **プロトタイプ注**: アニメーションは後回し。alertで代替中。

### 4.2 AI・誕生日オプション（P1）

- ✅ **AIにおまかせオプション**
  - 選択肢に「✨ AIにおまかせ」を追加済み
  - 選択時、固定で2週間後を提案（モック実装済み）
  - 推奨理由を表示（「ビジネス関係の初回フォローアップに最適です」）
  - ファイル: `src/components/KeepInTouchModal.tsx`
  - 依存: 設定モーダル
  - **プロトタイプ注**: 完全実装済み。実際のAIは使わず固定ロジック。

- ✅ **誕生日デモデータ追加**
  - Contact型にbirthday?フィールドを追加
  - 佐藤 花子さんに誕生日データを追加
  - 誕生日Notification（🎂アイコン付き）を追加
  - 誕生日Reminder（type: 'birthday'）を追加
  - ReminderSectionで誕生日を特別表示（🎂アイコン＋「誕生日です！」）
  - 「今日のリマインダー」→「今日のイベント」にリネーム
  - ファイル: `src/types/Contact.ts`, `src/data/sampleContacts.ts`, `src/data/sampleNotifications.ts`, `src/data/sampleReminders.ts`, `src/components/Home/ReminderSection.tsx`
  - 依存: なし
  - **プロトタイプ注**: 完全実装済み。誕生日がNotification + Reminderの両方で表示される。

### 4.3 Reminderセクション（P0）

- ✅ **今日のイベントセクション**
  - セクションタイトル: 「今日のイベント」（「今日のリマインダー」から変更）
  - 期日到来したReminderをリスト表示（フォローアップ、誕生日など）
  - contactIdから名前を取得して表示（「1さん」→「田中 太郎さん」）
  - 誕生日は🎂アイコンと「誕生日です！」メッセージで特別表示
  - 該当なしの場合: Empty State（「今日のイベントはありません いい一日を！」）
  - ファイル: `src/components/Home/ReminderSection.tsx`
  - 依存: なし
  - **プロトタイプ注**: 完全実装済み。Contactsプロパティを受け取り名前を解決。

- ✅ **Reminderカード**
  - コンタクト名表示（contactIdからcontacts配列で検索）
  - メッセージ: 「フォローアップの時期です」
  - [完了] / [延期] ボタン
  - ファイル: `src/components/Home/ReminderSection.tsx`（統合済み）
  - 依存: Reminderセクション
  - **プロトタイプ注**: 完全実装済み。

- ✅ **完了アクション**
  - [完了] ボタンタップでReminderを既読化（`completed: true`）
  - ファイル: `src/components/MobileView.tsx`（handleReminderComplete）
  - 依存: なし
  - **プロトタイプ注**: completedフラグをtrueに設定。アニメーションは省略。

- ⏸️ **延期アクション** _(プロトタイプでは後回し)_
  - ボタンは配置するが、機能は後期実装
  - **プロトタイプ注**: console.logで代替

---

## Phase 5: AIフォローアップ提案

### 5.1 フォローアップ提案モーダル（P1）

- ⬜ **提案モーダルUI**
  - タイトル: 「〇〇さんへのフォローアップ提案」
  - 提案理由セクション（1行、固定テキスト）
  - ドラフト文面セクション（3-5行、textarea で編集可能）
  - [📋 コピー] / [⏰ 後で] / [✅ 送信済にする] ボタン
  - ファイル: `src/components/FollowUpModal.tsx`
  - 依存: Modalコンポーネント
  - **プロトタイプ注**: シンプルなモーダル。編集機能はtextarea要素。

- ⬜ **AI提案生成（モック）**
  - テンプレートベースの固定文章を生成
  - 提案理由: 「名刺交換した直後です。早めの連絡で印象を残しましょう。」（固定）
  - ドラフト: 「{名前}さん\n\n先日はお話いただきありがとうございました。またお会いできれば嬉しいです。」
  - ファイル: `src/utils/aiFollowUpGenerator.ts`
  - 依存: なし
  - **プロトタイプ注**: 実際のAIは使わない。名前を埋め込んだテンプレート文字列。

- ⬜ **コピーアクション**
  - [コピー] ボタンでドラフトをクリップボードにコピー
  - `navigator.clipboard.writeText()` 使用
  - 「コピーしました」トーストメッセージ
  - モーダルを閉じる
  - ファイル: `src/components/FollowUpModal.tsx`（コピー処理）
  - 依存: Toastコンポーネント
  - **プロトタイプ注**: シンプルなクリップボードコピー

- ⏸️ **後でアクション** _(プロトタイプでは後回し)_
  - ボタンは配置するが、機能は後期実装
  - **プロトタイプ注**: console.logで代替

- ⬜ **送信済アクション**
  - [送信済にする] ボタンでActivity配列に追加
  - 「送信済にしました」トーストメッセージ
  - モーダルを閉じる
  - ファイル: `src/components/FollowUpModal.tsx`（送信済処理）
  - 依存: Toastコンポーネント
  - **プロトタイプ注**: Activity配列に{contactName, message, timestamp}を追加

### 5.2 フォローアップ提案トリガー（P1）

- ⏸️ **新規コンタクト作成時の自動提案** _(プロトタイプでは後回し)_
  - 自動表示は後期実装
  - **プロトタイプ注**: 手動でボタンから開けるようにする

- ⬜ **コンタクト詳細画面からの提案**
  - 「フォローアップ文章を作成」ボタン
  - タップで提案モーダルを開く
  - ファイル: `src/components/ContactEditModal/FollowUpButton.tsx`
  - 依存: フォローアップ提案モーダル
  - **プロトタイプ注**: ボタンクリックでモーダル表示フラグをtrue

- ⏸️ **Reminder期日到来時の提案** _(プロトタイプでは後回し)_
  - 後期実装

---

## Phase 6: Recent Activityログ

### 6.1 Activityセクション（P1）

- ✅ **Recent Activityセクション**
  - セクションタイトル: 「最近のアクティビティ」（絵文字削除済み）
  - 直近のActivityを時系列で表示（最大10件）
  - 該当なしの場合: Empty State（「まだアクティビティがありません」）
  - ファイル: `src/components/Home/ActivitySection.tsx`
  - 依存: なし
  - **プロトタイプ注**: 完全実装済み。Activity配列を.slice(0, 10)で表示

- ✅ **Activityカード**
  - アイコン: ✅（固定でOK）
  - メッセージ: 「佐藤さんに連絡しました」
  - タイムスタンプ: 相対時間（例: 「2時間前」）
  - ファイル: `src/components/Home/ActivitySection.tsx`（統合済み）
  - 依存: Activityセクション
  - **プロトタイプ注**: 完全実装済み。タップ遷移は後回し。

- ✅ **Activity自動記録**
  - Reminder完了 → Activity配列に追加（実装済み）
  - Contact編集完了 → Activity配列に追加（実装済み）
  - KeepInTouch設定 → Activity配列に追加（実装済み）
  - Archiveアクション → Activity配列に追加（実装済み）
  - ファイル: `src/components/MobileView.tsx`（addActivity関数）
  - 依存: なし
  - **プロトタイプ注**: 完全実装済み。Activity型に準拠（contactId, type, description, timestamp）

---

## Phase 7: Contacts画面（P2 - プロトタイプでは簡易実装）

### 7.1 基本Contacts画面（P2）

- ⏸️ **Contacts一覧画面** _(プロトタイプでは簡易版)_
  - 全コンタクトをシンプルにリスト表示
  - 検索・ソート機能は後回し
  - ファイル: `src/components/Contacts/ContactsList.tsx`
  - 依存: なし
  - **プロトタイプ注**: モックアップでは優先度低。シンプルなリスト表示のみ。

- ⏸️ **コンタクト詳細画面** _(プロトタイプでは後回し)_
  - 基本的な情報表示のみ
  - **プロトタイプ注**: 編集機能はContactEditModalで代替

### 7.2 AI情報拡充機能（P2）

- ⏸️ **AIで自動収集するボタン** _(プロトタイプでは後回し)_
  - 本実装時に追加

---

## Phase 8: Settings画面（P2 - プロトタイプでは後回し）

### 8.1 Settings画面（P2）

- ⏸️ **Settings画面UI** _(プロトタイプでは後回し)_
  - 見た目だけのプレースホルダーページで十分
  - **プロトタイプ注**: 「設定画面（準備中）」表示で代替

- ⏸️ **外部連携セクション** _(プロトタイプでは後回し)_
- ⏸️ **通知設定セクション** _(プロトタイプでは後回し)_
- ⏸️ **AI設定セクション** _(プロトタイプでは後回し)_

---

## Phase 9: レスポンシブ対応とアニメーション

### 9.1 レスポンシブデザイン（P1）

- ⬜ **ブレークポイント設定**
  - Tailwind設定: Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px)
  - ファイル: `tailwind.config.js`
  - 依存: なし
  - **プロトタイプ注**: Tailwindのデフォルト設定でほぼOK

- ⬜ **モバイル最適化**
  - タッチターゲット最小 44x44px（ボタン・タッチ要素）
  - フォントサイズ調整
  - スペーシング最適化
  - ファイル: 全コンポーネント
  - 依存: なし
  - **プロトタイプ注**: Tailwindのレスポンシブクラス（sm:, md:, lg:）を活用

- ⏸️ **デスクトップ最適化** _(プロトタイプでは後回し)_
  - モバイルファーストで実装、デスクトップは後期最適化

### 9.2 アニメーション実装（P1）

- ⏸️ **ページ遷移アニメーション** _(プロトタイプでは後回し)_
  - 後期実装
  - **プロトタイプ注**: シンプルなCSS transitionで十分

- ⬜ **マイクロインタラクション**
  - ボタンホバー・タップエフェクト（Tailwindの`hover:`, `active:`）
  - カード浮き上がり効果（`hover:shadow-xl hover:scale-105`）
  - ファイル: 各コンポーネント
  - 依存: なし
  - **プロトタイプ注**: TailwindのユーティリティクラスでOK

---

## Phase 10: データ永続化（⏸️ プロトタイプでは不要）

### 10.1 LocalStorage統合（⏸️ 保留）

- ⏸️ **データ保存機能** _(プロトタイプでは不要)_
  - リロードでリセットされてOK
  - 本実装時に追加

- ⏸️ **データ読み込み機能** _(プロトタイプでは不要)_

### 10.2 サンプルデータ（P0）

- ⬜ **初期サンプルデータ作成**
  - 新着コンタクト（`status: 'new'`）を3-5件ハードコーディング
  - Reminderサンプルデータを2-3件ハードコーディング
  - Activityサンプルデータを5件程度ハードコーディング
  - ファイル: `src/data/mockData.ts`（1ファイルにまとめる）
  - 依存: 型定義
  - **プロトタイプ注**: 見栄えの良いサンプルデータを用意。デモしやすい内容に。

---

## Phase 11: テストとデバッグ（⏸️ プロトタイプでは不要）

### 11.1 ユニットテスト（⏸️ 保留）

- ⏸️ **ユーティリティ関数テスト** _(プロトタイプでは不要)_
  - 本実装時に追加

- ⏸️ **コンポーネントテスト** _(プロトタイプでは不要)_

### 11.2 統合テスト（⏸️ 保留）

- ⏸️ **E2Eテスト** _(プロトタイプでは不要)_

### 11.3 パフォーマンス最適化（⏸️ 保留）

- ⏸️ **画像最適化** _(プロトタイプでは不要)_
- ⏸️ **コード分割** _(プロトタイプでは不要)_
- ⏸️ **仮想スクロール** _(プロトタイプでは不要)_

---

## Phase 12: アクセシビリティ（⏸️ プロトタイプでは最小限）

### 12.1 ARIA対応（P2）

- ⏸️ **ARIAロール・ラベル追加** _(プロトタイプでは最小限)_
  - モーダルに `role="dialog"` のみ追加
  - 本格的なARIA対応は後期実装

- ⬜ **基本的なキーボードナビゲーション**
  - Escapeでモーダル閉じる（重要な操作のみ）
  - ファイル: Modalコンポーネント
  - 依存: なし
  - **プロトタイプ注**: ESCキーのみ対応

### 12.2 スクリーンリーダー対応（⏸️ 保留）

- ⏸️ **読み上げテキスト最適化** _(プロトタイプでは不要)_
  - 本実装時に追加

---

## Phase 13: デプロイと本番準備（⏸️ プロトタイプでは不要）

### 13.1 ビルド設定（⏸️ 保留）

- ⏸️ **本番ビルド最適化** _(プロトタイプでは不要)_
  - ローカルで動作確認できればOK

### 13.2 デプロイ（⏸️ 保留）

- ⏸️ **Vercel/Netlifyデプロイ** _(プロトタイプでは不要)_
  - 社内デモはローカル起動またはVercel簡易デプロイ
  - 本格的な設定は後期実装

---

## 📊 進捗管理（プロトタイプ版）

### 完了基準

各タスクは以下の基準を満たした場合に「✅ 完了」とマーク:
- UIが実装され、見た目が確認できる
- 基本的なインタラクションが動作する（ボタンクリック、モーダル開閉等）
- エラーが出ずにローカルで動作する

**プロトタイプ注**: 完璧な実装は不要。デモできる状態になればOK。

### マイルストーン（プロトタイプ版）

- **Milestone 1 (基盤)**: Phase 1完了（型定義 + 共通UI + Notification）
- **Milestone 2 (Add導線)**: Phase 2完了（名刺読み取りフロー全体）
- **Milestone 3 (カード処理)**: Phase 3-4完了（新着カード + Reminder）
- **Milestone 4 (完成)**: Phase 5-6完了（フォローアップ提案 + Activity）

**目標**: Milestone 4でプロトタイプ完成 → 社内デモ実施

---

## 🔗 参考リンク

- [ハイレベル仕様: poc_phase1.md](./poc_phase1.md)
- [詳細インタラクション仕様: poc_phase1_interactions.md](./poc_phase1_interactions.md)
- [ベンチマーク: benchmarks.md](./benchmarks.md)
- [プロジェクト指示: プロジェクトの指示.md](./プロジェクトの指示.md)

---

**最終更新**: 2025-10-08
