# Brookhart Blockchain Terminal - Setup Guide

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Build for Production

```bash
npm run build
```

Creates an optimized build in the `dist/` directory.

## Deploy to Netlify

### Option A: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Option B: GitHub + Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) -> "Add new site" -> "Import an existing project"
3. Connect to GitHub and select your repository
4. Netlify auto-detects build settings from `netlify.toml`
5. Deploy

## Project Structure

```
src/
├── api/                # CoinGecko + DeFiLlama API clients
├── components/
│   ├── Layout/         # TopBar, TabBar, BottomBar
│   ├── Views/          # Pulse, Narratives, Chains, Timeline, Graveyard
│   └── Widgets/        # Panel, Sparkline
├── data/               # Curated narratives, events, flows, dead projects
├── store/              # Zustand state management
├── types/              # TypeScript definitions
├── utils/              # Formatting helpers
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Tailwind + custom styles
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 1-5 | Switch between tabs (Pulse, Narratives, Chains, Timeline, Graveyard) |
| Space | Play/Pause timeline |

## Customization

### Adding Narratives
Edit `src/data/narratives.ts` — each narrative has a name, status, thesis, related chains/protocols/tokens, risk level, catalysts, and risks.

### Adding Events
Edit `src/data/events.ts` — each event has a timestamp, type, title, description, and capital flow impacts.

### Adding Dead Projects
Edit `src/data/deadProjects.ts` — each project has a name, sector, peak TVL, death date, cause, and amount lost.

## Troubleshooting

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```
