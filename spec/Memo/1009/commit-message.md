# GitHub Commit Message

## タイトル
```
Implement multiple business card scanning, contact detail page, and deep search features
```

## コミットメッセージ本文
```
複数名刺読み取り、コンタクト詳細ページ、Deep Search機能を実装

主な変更点:

1. 複数名刺読み取りフロー実装（MOB-ADD-SCAN）
   - 連続撮影による複数枚の名刺読み取りに対応
   - PhotoPreviewGridコンポーネントを追加し、撮影後の写真プレビュー・選択機能を実装
   - OCRローディング画面の改善
   - 読み取り完了後、ホーム画面の新着コンタクトに複数のコンタクトを"New"タグ付きで表示

2. コンタクト詳細ページ（ContactDetailPage）の新規作成
   - 新着コンタクトタップ時に詳細ページへ遷移（編集画面への直接遷移を廃止）
   - Timeline機能セクションの追加（ノート、SNS更新情報を時系列表示）
   - Activity機能セクションの追加（コンタクト関連のアクティビティのみ表示）
   - 詳細ページから編集画面への遷移ボタンを配置

3. コンタクトデータ構造の拡張
   - BioSection: 一言説明、紹介文フィールドを追加
   - OrganizationInfo: 組織情報（組織名、肩書、電話番号、住所、URL）を追加
   - SocialInfo: 主要SNSプラットフォーム14種類に対応（𝕏、Instagram、LINE、note、Facebook、LinkedIn、Eight、TikTok、YouTube、Sansan、Discord、Telegram、GitHub、WhatsApp、Chatwork、mixi）
   - ContentUrlsInfo: 無制限個数のウェブURLを管理可能に
   - プレーリーカードURLフィールド追加
   - 名前のよみフィールド追加

4. Deep Search（人物検索）機能の実装
   - DeepSearchButtonコンポーネントを編集モーダルに追加
   - 検索開始時のフラッシュ通知機能
   - NotificationIconに未読カウント表示
   - AI検索タブ（AISearchTab）との連携
   - 検索完了時の通知機能

5. フォローアップ機能の改善
   - FollowUpButtonコンポーネント追加
   - FollowUpModalの改善

6. 通知機能の改善
   - Flash通知コンポーネント追加
   - NotificationModalのUI改善
   - 一般通知タブの機能拡張

7. モーダルコンポーネントの改善
   - 共通Modalコンポーネントのスタイル調整
   - 各種モーダルのUX向上

関連spec:
- spec/Memo/1009/1009-01.md: 複数枚読み取り機能
- spec/Memo/1009/1009-02.md: コンタクト情報ページ仕様
- spec/Memo/1009/1009-05.md: 人物検索機能仕様
- spec/Memo/1009/1009-06.md: 新着マーク表示
```

## 参考：変更ファイル一覧
```
Modified:
- CLAUDE.md
- src/components/AddModal.tsx
- src/components/AddModal/BusinessCardScanner.tsx
- src/components/AddModal/OCRLoading.tsx
- src/components/ContactEditModal.tsx
- src/components/ContactEditModal/BasicInfo.tsx
- src/components/FollowUpModal.tsx
- src/components/Home/NewContactsSection.tsx
- src/components/Home/ReminderSection.tsx
- src/components/KeepInTouchModal.tsx
- src/components/MobileView.tsx
- src/components/NotificationIcon.tsx
- src/components/NotificationModal.tsx
- src/components/common/Modal.tsx
- src/data/sampleContacts.ts
- src/data/sampleNotifications.ts
- src/types/Contact.ts

Added:
- src/components/AddModal/PhotoPreviewGrid.tsx
- src/components/ContactDetailPage.tsx
- src/components/ContactEditModal/BioSection.tsx
- src/components/ContactEditModal/ContentUrlsInfo.tsx
- src/components/ContactEditModal/DeepSearchButton.tsx
- src/components/ContactEditModal/OrganizationInfo.tsx
- src/components/ContactEditModal/SocialInfo.tsx
- src/components/common/Flash.tsx

Deleted:
- spec/Old Memo/1008-01.md ~ 1008-04.md
```

