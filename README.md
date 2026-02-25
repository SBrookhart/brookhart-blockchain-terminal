# Brookhart Blockchain Terminal

**Narrative-driven crypto intelligence. Track what narrative is driving capital and which chains are capturing it.**

A Bloomberg-style terminal for crypto built with React, TypeScript, and Tailwind CSS. Dense, information-rich panels with live data from CoinGecko and DeFiLlama.

## Views

- **PULSE** — Active narratives ranked by momentum, market prices with sparklines, hottest chains by 7d growth
- **NARRATIVES** — Deep-dive into any narrative: thesis, catalysts vs risks, lifecycle tracker, related chains/protocols/tokens
- **CHAINS** — Chain intelligence table with narrative tags, drill into any chain for protocol breakdown and category analysis
- **TIMELINE** — Time machine scrubber (2020-2025) with playback controls, era context, and curated historical events
- **GRAVEYARD** — Dead narratives, dead projects, and "lessons for the next cycle" risk education

## Data

- **CoinGecko API** — token prices, market caps, sparkline data, global market stats
- **DeFiLlama API** — chain TVL, protocol data, historical TVL
- Mock data fallback for offline/development use

### Curated Content

- 10 narratives (7 active + 3 dead)
- 22 historical events (2020-2025)
- 7 dead projects with cause-of-death analysis

## Tech Stack

- React 18 + TypeScript
- Zustand (state management)
- Framer Motion (animations)
- Tailwind CSS + JetBrains Mono
- Vite (build tool)
- Lucide React (icons)

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

```bash
npm run build    # Production build
npm run preview  # Preview production build
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 1-5 | Switch between tabs |
| Space | Play/Pause timeline |

## License

MIT
