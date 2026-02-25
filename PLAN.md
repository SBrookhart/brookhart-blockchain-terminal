# Current Pulse Implementation Plan

## Overview

Replace the current PULSE tab with **Current Pulse** — an hourly-refreshed crypto intelligence briefing inspired by World Monitor's dense, multi-panel approach. The Current Pulse is the first thing users see when they open BBT.

---

## Tab Rename

- PULSE tab becomes **CURRENT PULSE** (id stays `'pulse'`)
- Update label in `TabBar`
- Icon: `Newspaper` from lucide-react (replacing `Activity`)

---

## Current Pulse Layout (top to bottom, single scrollable column)

### 1. Pulse Header
- "CURRENT PULSE" title + generated timestamp ("Feb 25, 2026 14:00 UTC")
- Last updated timestamp + countdown to next auto-refresh ("Next update in 47m")
- Manual refresh button (circular arrow icon)

### 2. Executive Summary (hero section)
- **7-8 narrative-style bullets** that tell the story of "what's happening in crypto right now"
- Story-first arc: Big Picture → Bitcoin's Role → Hottest Narrative → Secondary Momentum → Chain Activity → What's Cooling → Risk Watch → Emerging Frontier
- Each bullet: bold headline + 2-3 sentence mini-paragraph with educational context
- **Tone:** Professional but accessible — a smart friend explaining crypto. Jargon is avoided or explained inline (e.g., "BTC dominance" is defined when first used, TVL is described as "total deposits")
- **Generated dynamically** from live CoinGecko + DeFiLlama data + curated narrative data via `src/data/reportTemplates.ts`
- Each bullet has a sentiment indicator (bullish/bearish/neutral/caution) shown as a colored left accent bar
- Styled as a prominent panel with colored accent bars per bullet
- **Implemented:** `src/data/reportTemplates.ts` (generation logic) + `src/components/Widgets/ExecutiveSummary.tsx` (render component)

### 3. Market Snapshot (grid of stat cards)
- Row of 4-6 key metrics in compact cards:
  - Total Market Cap + 24h change
  - BTC Price + 24h change
  - ETH Price + 24h change
  - BTC Dominance
  - Total 24h Volume
  - Fear & Greed Index (from Alternative.me free API, or mock)
- Each card: label, value, change arrow, mini sparkline where applicable
- Data source: CoinGecko (already integrated)

### 4. Narrative Momentum (horizontal card row)
- Top 3-4 active narratives sorted by momentum (socialScore * tvlChange7d)
- Each card shows: narrative name, status badge (emerging/heating/peak/cooling), TVL, 7d TVL change, risk level dot
- Clickable → navigates to NARRATIVES detail view
- Data source: existing curated narratives + live TVL overlay

### 5. Top Movers (two-column table)
- Left column: "Gainers" — top 5 tokens by 24h % change (green)
- Right column: "Losers" — bottom 5 tokens by 24h % change (red)
- Each row: token symbol, price, 24h %, 7d sparkline
- Data source: CoinGecko top tokens (already fetched)

### 6. Chain Activity (compact table)
- Top 5 chains by 7d TVL growth
- Columns: Chain name, TVL, 7d change %, narrative tag
- Clickable → navigates to CHAINS detail
- Data source: DeFiLlama (already integrated)

### 7. News Feed (scrollable panel)
- Latest 15-20 crypto headlines from CryptoPanic API
- Each headline: source tag, title, timestamp, sentiment badge (bullish/bearish/neutral)
- New API client: `src/api/cryptopanic.ts`
- Free tier: no API key needed for basic public feed (or use mock fallback)
- Filterable by sentiment (all / bullish / bearish)

### 8. Risk Alerts (prominent warning section)
- Red/amber/yellow alert cards at the bottom
- **Auto-generated alerts** from data thresholds:
  - Token price drop > 20% in 24h
  - Chain TVL drop > 10% in 24h
  - Stablecoin depeg > 1% from peg (if we track stablecoins)
- **Curated risk templates** that feel editorial:
  - "Bridge exploit risk remains elevated — $1.2B locked in bridges with <6mo audit"
  - "Governance attack surface: 3 protocols have <$5M in governance token market cap"
  - Stored in `src/data/riskAlerts.ts`, rotated/shuffled to feel fresh
- Each alert: severity icon, title, one-line description, "MONITOR" tag

---

## New Files

| File | Purpose |
|------|---------|
| `src/components/Views/CurrentPulse.tsx` | Main Current Pulse view (replaces Pulse.tsx) |
| `src/api/cryptopanic.ts` | CryptoPanic news API client + mock fallback |
| `src/data/riskAlerts.ts` | Curated risk alert templates |
| `src/data/reportTemplates.ts` | Executive summary sentence templates |

## Modified Files

| File | Change |
|------|--------|
| `src/types/index.ts` | Add `NewsItem`, `RiskAlert` types |
| `src/store/useStore.ts` | Add news, risk alerts state. Add refresh timer logic, `lastUpdated` timestamp |
| `src/components/Layout/TabBar.tsx` | Rename label PULSE → CURRENT PULSE, swap icon |
| `src/App.tsx` | Swap `Pulse` import for `CurrentPulse`, update tab rendering |
| `src/components/Views/Pulse.tsx` | Deleted (replaced by CurrentPulse.tsx) |

## Refresh System

- `useStore` gets: `lastUpdated: Date | null`, `nextRefreshIn: number` (seconds), `refreshReport(): Promise<void>`
- On mount: fetch all data, set `lastUpdated = now`, start 60-minute interval timer
- Countdown timer in the header ticks every second (local state, not store)
- Manual refresh button calls `refreshReport()` which re-fetches all APIs + resets timer
- Header shows "Updated 14m ago" relative timestamp

## API: CryptoPanic

- Endpoint: `https://cryptopanic.com/api/free/v1/posts/?auth_token=free&public=true&kind=news`
- Returns: `{ results: [{ title, url, source: { title }, published_at, votes: { positive, negative } }] }`
- We derive sentiment from vote ratio (positive > negative = bullish, etc.)
- Mock fallback with 15 realistic headlines if API fails or is rate-limited

---

## What We're NOT Doing (yet)

- No AI-generated summaries (would need an LLM API)
- No on-chain metrics (gas, active addresses — would need Etherscan/Alchemy)
- No funding rates or whale tracking (needs paid APIs)
- No map/globe visualization (future iteration)
- No WebSocket real-time streaming (polling is fine for hourly updates)

---

## Implementation Order

1. Types + data files (riskAlerts, reportTemplates)
2. CryptoPanic API client
3. Store updates (news state, refresh logic)
4. CurrentPulse.tsx view component (all 8 sections)
5. Wire up navigation (TabBar label, App.tsx, delete Pulse.tsx)
6. Test build passes
