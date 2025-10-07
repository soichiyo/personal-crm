# Personal CRM

「出会いをケアし、まだ出会っていない人とのつながりを導く」Personal CRM アプリケーション

## 概要

Personal CRM は、Prairie が提供する人間関係の新しい UX を探求するプロジェクトです。AI が人間的なつながりを支援し、「デジタルな縁をケアする」ことを理念としています。

## セットアップ

### 必要要件

- Node.js 18+
- npm

### インストール

```bash
npm install
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173/ を開いてください。

### プロダクションビルド

```bash
npm run build
```

ビルド結果は `dist/` ディレクトリに出力されます。

### プレビュー

```bash
npm run preview
```

## プロジェクト構造

- `src/components/` - React コンポーネント
- `src/types/` - TypeScript 型定義
- `src/data/` - サンプルデータ
- `spec/` - プロジェクト仕様書（日本語）

## 技術スタック

- React 19 + TypeScript
- Vite
- Tailwind CSS v3
- lucide-react (アイコン)

## 現在の実装状態

**PoC v1: 出会い → フォローアップ**

- スワイプ可能なコンタクトカードインターフェース（モバイル）
- サイドバーナビゲーション（デスクトップ）
- AI フォローアップ提案の UI モックアップ
- 統合設定のプレースホルダー

## 今後の開発フェーズ

- **PoC v2**: Discover/Search（潜在探索）
- **β版**: チーム共有・紹介依頼自動化
- **商用版**: 個人／エンプラ展開
