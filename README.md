# 🗺️ Internet Money Map

**Where Did the Internet's Money Go?**

A retro-futuristic data visualization tracking major on-chain capital flows from 2020-2025. Watch money migrate from NFTs → memecoins → AI tokens → L2s → RWAs with particle physics, narrative events, and cultural archaeology.

## Features

- **Particle System**: Thousands of animated particles representing capital flows
- **Historical Mode**: Scrub through 2020-2025 with auto-play
- **Live Mode**: Real-time capital movement (last 24h/7d/30d)
- **Narrative Events**: 50+ major moments with cultural context
- **Smart Money Tracking**: Follow whale addresses
- **Sentiment Analysis**: Social gravity scores per sector
- **Prediction Overlay**: ML-powered capital flow forecasts
- **Influencer Attribution**: Which tweets moved markets
- **Dead Zone**: Memorial for failed projects
- **Regret Calculator**: "What if you held since..."

## Tech Stack

- React 18 + TypeScript
- PixiJS (particle system)
- Framer Motion (UI animations)
- Zustand (state management)
- Tailwind CSS
- Vite (build tool)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Netlify

### Option 1: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Go to Netlify dashboard
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repo
5. Build settings are auto-detected from `netlify.toml`
6. Deploy!

## Project Structure

```
src/
├── components/
│   ├── Canvas/          # PixiJS particle system
│   ├── Timeline/        # Timeline controls & events
│   ├── Panels/          # Info panels & overlays
│   ├── Features/        # Advanced features
│   └── UI/              # Header, modals, tutorial
├── data/                # Sectors, events, flows, whales
├── store/               # Zustand state management
├── types/               # TypeScript definitions
└── utils/               # Helper functions
```

## Key Controls

- **Space**: Play/Pause
- **← →**: Step backward/forward
- **1-5**: Speed control (0.5x to 10x)
- **H**: Toggle historical mode
- **L**: Toggle live mode
- **T**: Show/hide tutorial
- **Click events**: View detailed cards
- **Hover sectors**: See stats panels

## Design Philosophy

"Crypto Archaeology Terminal" - A Bloomberg terminal meets arcade game meets historical documentary. Dark retro-futuristic aesthetic with vibrant sector colors, smooth particle physics, and delightful micro-interactions.

## Data Model

All data is currently stylized/curated for demonstration. Future versions will integrate:
- DeFiLlama for TVL
- Dune Analytics for flows
- Twitter API for sentiment
- GitHub for developer activity
- Nansen/Arkham for whale tracking

## License

MIT

## Credits

Built with ♥ for crypto natives who want to understand where the money went.
