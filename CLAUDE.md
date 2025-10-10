# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal CRM is a relationship management application that focuses on "caring for digital connections." The project explores new UX for human relationships through AI-assisted networking.

**Mission**: "Care for encounters and guide connections with people you haven't met yet."

## Core Philosophy

- AI is a "quiet supporter," not a replacement for human relationships
- Don't over-automate; maintain transparency and undo capability
- Design around human motivations like "want to meet" and "interested in"

## Development Phases

1. **PoC v1** (Current): Meeting → Follow-up
   - Auto-generate contacts from business cards/SNS
   - AI-generated follow-up message drafts

2. **PoC v2** (Planned): Discover/Search
   - Purpose-driven search and connection path suggestions

3. **β version**: Team sharing and introduction automation
   - Slack integration, shared network

4. **Commercial**: Individual/Enterprise deployment

## Core Data Objects

- **Contact**: Record of encounters (business card, SNS, manual)
- **Profile**: Multi-faceted information about others or self
- **Keyword**: Network tag axis
- **Interaction**: Action records (follow-ups, etc.)
- **Reminder**: Action reminders
- **Group**: Community, profession, keyword-based
- **Purpose**: Discovery exploration purpose
- **Introduction**: Introduction requests and progress tracking
- **Connector**: External integrations (Prairie/Gmail/Slack)
- **Discovery/Search**: Potential connection exploration and search engine

## Project Structure

```
personal-crm/
├── src/
│   ├── components/
│   │   ├── PersonalCRMHome.tsx  # Main container component
│   │   ├── MobileView.tsx       # Mobile interface (swipeable cards)
│   │   ├── DesktopView.tsx      # Desktop interface (sidebar + preview)
│   │   └── AddModal.tsx         # Contact addition modal
│   ├── types/
│   │   └── Contact.ts           # Contact type definition
│   ├── data/
│   │   └── sampleContacts.ts    # Sample contact data
│   ├── App.tsx                  # Application root
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles (Tailwind)
├── spec/                        # Specification documents (Japanese)
├── hoge.tsx                     # Original prototype (legacy)
└── ...config files
```

## Development Commands

- **Start dev server**: `npm run dev` - Runs on http://localhost:5173/
- **Build for production**: `npm run build` - Outputs to `dist/`
- **Preview production build**: `npm run preview`

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Icons**: lucide-react

## Current Implementation

The application implements a dual-view interface:

**Mobile View** (`MobileView.tsx`):
- Swipeable contact card interface (Tinder-style)
- Bottom navigation with tabs: Home, Discover, Add, Search, More
- Drag-to-keep/skip interaction pattern

**Desktop View** (`DesktopView.tsx`):
- Sidebar navigation
- Contact list + detail preview layout
- Integration settings

**Core Features**:
- Contact card display with meeting context
- AI follow-up suggestions (UI mockup)
- Integration placeholders (Prairie Card, LinkedIn, Facebook, Gmail)
- Discover feature placeholder (β)

## Success Metrics

- **UX**: 1 session completion rate 60%+
- **Technical**: Connector success rate 90%+
- **Retention**: Usage intent 70%+
- **Business**: 3+ PoC companies
- additional tasks

- Loading後のフラッシュモーダルが、iPhoneの画面を飛び越えています。また遷移先はHomeで（今はContacts二遷移しています）
- 1001-01.md のファイルを実装してみて