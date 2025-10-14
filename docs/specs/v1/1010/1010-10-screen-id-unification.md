# 画面ID統一と階層整理 - 実装完了

## 実装日

2025-10-10

## 概要

全ての画面・モーダルに一貫した画面ID表示を実装し、`MOB-001`を最上位レイヤー（z-[9999]）に統一しました。

## 実装内容

### 階層構造の整理

#### Before（問題点）

- PersonalCRMHome: `MOB-001 | モバイル（3タブ）`（黄色）
- MobileView: `MOB-HOME`など（黄色）
- 各モーダル: バラバラの色・スタイル
- FollowUpModal等: 画面IDなし
- z-indexが曖昧

#### After（統一後）

```
z-[9999]: MOB-001バー（黄色、最上位、常に表示、fixed）
    ↓
z-[9998]: 各画面・モーダルの画面IDバー（紫色）
    ↓
z-[70]: サブモーダル本体
z-[60]: Toast
z-[50]: メインモーダル本体
```

---

## 変更内容

### 1. PersonalCRMHome.tsx - 最上位レイヤー化

**変更前**:
```tsx
<div className="bg-yellow-100 border-b ... shrink-0">
  画面ID: MOB-001 | モバイル（3タブ）
</div>
```

**変更後**:
```tsx
<div className="fixed top-0 left-0 right-0 bg-yellow-100 border-b ... z-[9999]">
  画面ID: MOB-001 | モバイル（3タブ）
</div>
<div className="h-10 shrink-0"></div>  {/* スペーサー */}
```

**効果**:
- 常に画面最上部に表示
- 全てのモーダル・画面の上に表示される
- スクロールしても固定

---

### 2. MobileView.tsx - スタイル統一

**変更前**:
```tsx
<div className="bg-yellow-50 border-b ...">
  {getScreenId()}  // MOB-HOME など
</div>
```

**変更後**:
```tsx
<div className="bg-purple-50 border-b border-purple-200 ... z-[9998]">
  <span className="text-xs font-mono font-semibold text-purple-900">
    {getScreenId()}
  </span>
</div>
```

**効果**:
- 紫色で最上位（黄色）と区別
- z-[9998]で階層明確化
- フォントスタイル統一

---

### 3. 全コンポーネントのスタイル統一

#### 統一スタイル（紫色バー）

```tsx
<div className="bg-purple-50 border-b border-purple-200 px-3 py-1 flex items-center justify-center relative z-[9998]">
  <span className="text-xs font-mono font-semibold text-purple-900">
    {SCREEN_ID}
  </span>
</div>
```

#### 適用コンポーネント

**既存コンポーネント（スタイル統一）**:
- `ContactDetailPage.tsx` - `MOB-CONTACT-DETAIL`
- `ContactEditModal.tsx` - `MOB-CONTACT-EDIT`（ID変更: MOB-ADD-EDIT → MOB-CONTACT-EDIT）
- `AddModal.tsx` - `MOB-ADD-MENU`
- `BusinessCardScanner.tsx` - `MOB-ADD-SCAN`
- `PhotoPreviewGrid.tsx` - `MOB-ADD-PREVIEW`
- `OCRLoading.tsx` - `MOB-ADD-OCR`
- `NotificationModal.tsx` - `MOB-NOTIF-GEN` / `MOB-NOTIF-AI`

**新規追加（画面ID追加）**:
- `FollowUpModal.tsx` - `MOB-FOLLOWUP`★
- `KeepInTouchModal.tsx` - `MOB-KEEPINTOUCH`★

---

## 画面ID一覧（完全版）

### ルート
- **`MOB-001`** - モバイル（3タブ）- 最上位、黄色、固定表示

### メインタブ
- **`MOB-HOME`** - ホームタブ
- **`MOB-CONTACTS`** - コンタクトタブ
- **`MOB-SETTINGS`** - 設定タブ

### コンタクト関連
- **`MOB-CONTACT-DETAIL`** - コンタクト詳細画面
- **`MOB-CONTACT-EDIT`** - コンタクト編集画面

### 追加フロー
- **`MOB-ADD-MENU`** - 追加メニューモーダル
- **`MOB-ADD-SCAN`** - 名刺スキャン画面
- **`MOB-ADD-PREVIEW`** - プレビュー画面
- **`MOB-ADD-OCR`** - OCR処理画面

### 通知
- **`MOB-NOTIF-GEN`** - 一般通知タブ
- **`MOB-NOTIF-AI`** - AI検索通知タブ

### モーダル
- **`MOB-FOLLOWUP`** - フォローアップ/お祝いモーダル
- **`MOB-KEEPINTOUCH`** - Keep in Touchモーダル

---

## UIスタイル詳細

### 最上位バー（MOB-001）

```tsx
className="fixed top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-300 px-4 py-2 flex items-center justify-center gap-2 z-[9999]"

テキスト: text-xs font-mono font-semibold text-yellow-900
```

**特徴**:
- 黄色背景
- 固定表示（fixed）
- 最上位（z-[9999]）
- 常に表示

### 各画面・モーダルバー

```tsx
className="bg-purple-50 border-b border-purple-200 px-3 py-1 flex items-center justify-center relative z-[9998]"

テキスト: text-xs font-mono font-semibold text-purple-900
```

**特徴**:
- 紫色背景
- 相対配置（relative）
- 第2階層（z-[9998]）
- 各画面・モーダルに表示

---

## 実装後のUI階層

### 通常画面

```
┌───────────────────────────────┐
│ 画面ID: MOB-001 | モバイル（3タブ）│ ← 黄色、z-[9999]、fixed
├───────────────────────────────┤
│ MOB-HOME                      │ ← 紫色、z-[9998]
├───────────────────────────────┤
│ Personal CRM        🔔(5)     │ ← Header
├───────────────────────────────┤
│                               │
│ [コンテンツ]                 │
│                               │
└───────────────────────────────┘
```

### モーダル表示時

```
┌───────────────────────────────┐
│ 画面ID: MOB-001 | モバイル（3タブ）│ ← 黄色、z-[9999]、最上位
├───────────────────────────────┤
│ MOB-FOLLOWUP                  │ ← 紫色、z-[9998]
├───────────────────────────────┤
│ お祝いメッセージ             │
│                               │
│ [モーダルコンテンツ]         │
│                               │
│ [コピー] [メールで送る]     │
└───────────────────────────────┘
```

### サブモーダル表示時

```
┌───────────────────────────────┐
│ 画面ID: MOB-001 | モバイル（3タブ）│ ← 黄色、z-[9999]、最上位
├───────────────────────────────┤
│ MOB-FOLLOWUP                  │ ← 紫色、z-[9998]
├───────────────────────────────┤
│    ┌─────────────────────┐   │
│    │ メールクライアント選択│   │ ← z-[70]、サブモーダル
│    │ ・デフォルト        │   │
│    │ ・Gmail             │   │
│    └─────────────────────┘   │
└───────────────────────────────┘
```

---

## 変更ファイル一覧

1. `src/components/PersonalCRMHome.tsx` - 最上位化
2. `src/components/MobileView.tsx` - スタイル統一
3. `src/components/ContactDetailPage.tsx` - スタイル統一
4. `src/components/ContactEditModal.tsx` - スタイル統一、ID変更
5. `src/components/AddModal.tsx` - スタイル統一
6. `src/components/AddModal/BusinessCardScanner.tsx` - スタイル統一
7. `src/components/AddModal/PhotoPreviewGrid.tsx` - スタイル統一
8. `src/components/AddModal/OCRLoading.tsx` - スタイル統一
9. `src/components/NotificationModal.tsx` - スタイル統一
10. `src/components/FollowUpModal.tsx` - 画面ID追加★
11. `src/components/KeepInTouchModal.tsx` - 画面ID追加★

---

## 改善効果

### Before（統一前）
❌ 画面IDが2階層で混乱  
❌ z-indexが曖昧  
❌ 色・スタイルがバラバラ  
❌ モーダルに画面IDなし  
❌ どの画面を見ているかわかりにくい

### After（統一後）
✅ **明確な階層**: MOB-001が常に最上位  
✅ **z-index整理**: 9999 → 9998 → 70 → 60 → 50  
✅ **スタイル統一**: 黄色（最上位）、紫色（各画面）  
✅ **全画面カバー**: 全てのモーダルに画面ID  
✅ **可視性向上**: どの画面/モーダルにいるか一目でわかる

---

## テスト確認項目

- [x] ビルドエラーなし
- [ ] MOB-001バーが常に最上位に表示される
- [ ] MOB-001バーがスクロールしても固定
- [ ] 各タブで正しい画面IDが表示される
- [ ] モーダル開いた時も正しい画面IDが表示される
- [ ] サブモーダル開いた時もMOB-001が見える
- [ ] 色分けが正しい（黄色/紫色）
- [ ] 全ての画面に画面IDがある

---

## 備考

- MOB-ADD-EDIT → MOB-CONTACT-EDITに変更（より明確な命名）
- 最上位バーの高さ分のスペーサー（h-10）を追加
- z-indexを明確に定義（9999 > 9998 > 70 > 60 > 50）
- 将来的にサブモーダルにも画面ID追加可能（MOB-EMAIL-CLIENT等）

