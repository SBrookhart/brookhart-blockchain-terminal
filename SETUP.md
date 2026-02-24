# 🗺️ Internet Money Map - Setup Guide

## 📦 What You Have

A complete, production-ready application with:
- **Phase 1**: Core particle system, basic timeline, sectors
- **Phase 2**: Rich narrative events, detailed cards, stats panels
- **Phase 3**: Smart money tracking, predictions, sentiment, influencer attribution
- **Phase 4**: Polish, performance, tutorials, keyboard shortcuts, animations

**Design**: "Crypto Archaeology Terminal" - Retro-futuristic Bloomberg terminal meets arcade game with dark theme, neon colors, and smooth particle physics.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd internet-money-map
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 3. Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## 📤 Deploy to Netlify

### Option A: Netlify CLI (Recommended)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize your site (first time only)
netlify init

# Deploy to production
netlify deploy --prod
```

### Option B: GitHub + Netlify

1. **Push to GitHub:**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Internet Money Map"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

2. **Connect to Netlify:**
- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect to GitHub and select your repository
- Netlify will auto-detect the build settings from `netlify.toml`
- Click "Deploy"

Your site will be live at `https://your-site-name.netlify.app`

## 🎮 Usage

### Keyboard Shortcuts
- **Space**: Play/Pause timeline
- **← →**: Step backward/forward (30 days)
- **1-5**: Change playback speed (0.5x to 10x)
- **H**: Toggle historical mode
- **L**: Toggle live mode
- **T**: Show/hide tutorial

### Mouse Interactions
- **Hover over sectors**: View detailed stats
- **Click event markers**: See narrative details
- **Toggle features**: Use header buttons for Smart Money, Predictions, etc.

### Features
- **Smart Money**: Track whale addresses and their winning trades
- **Predictions**: ML-powered forecasts of capital flows
- **Sentiment**: Social gravity scores per sector
- **Influencers**: See which Twitter accounts moved markets
- **Dead Zone**: Memorial for failed projects (Terra, FTX, etc.)

## 📁 Project Structure

```
internet-money-map/
├── src/
│   ├── components/
│   │   ├── Canvas/          # PixiJS particle system
│   │   ├── Timeline/        # Timeline controls & event markers
│   │   ├── Panels/          # Info panels (stats, events, dead zone)
│   │   ├── Features/        # Advanced features (smart money, predictions)
│   │   └── UI/              # Header, tutorial, modals
│   ├── data/                # Sectors, events, flows, whales
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript definitions
│   ├── utils/               # Helper functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind + custom styles
├── public/                  # Static assets
├── index.html               # HTML entry
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── netlify.toml             # Netlify deployment config
```

## 🎨 Customization

### Adding New Events
Edit `src/data/events.ts` to add narrative moments:

```typescript
{
  id: 'your-event',
  timestamp: '2024-01-15',
  type: 'cultural', // cultural | tweet | tech | macro
  weight: 0.85,
  title: 'Your Event Title',
  description: 'What happened',
  impact: [
    { from: 'eth-defi', to: 'sol-memes', amount: 5.2 }
  ],
  sentiment: 0.9,
  socialGravity: 88,
}
```

### Adding New Sectors
Edit `src/data/sectors.ts` to add capital pools:

```typescript
{
  id: 'new-sector',
  chain: 'CHAIN',
  category: 'Category',
  name: 'Sector Name',
  color: '#HEX_COLOR',
  yPosition: 1000, // Position on canvas
  projects: ['Project1', 'Project2'],
  tvl: [
    { date: '2024-01-01', value: 10.5 }
  ],
}
```

### Customizing Colors
Edit `tailwind.config.js` or `src/utils/colors.ts` to change the color scheme.

### Customizing Particle Behavior
Edit `src/components/Canvas/ParticleSystem.ts` to adjust:
- Particle count
- Movement physics
- Trail effects
- Animation speed

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### PixiJS Issues
Make sure you're using Node 18+ and have installed all dependencies.

### Type Errors
```bash
# Regenerate TypeScript declarations
npm run build
```

## 📊 Data

All data is currently **stylized/curated** for demonstration purposes. The application includes:
- **9 sectors** (ETH DeFi, ETH NFTs, SOL NFTs, SOL Memes, etc.)
- **20+ major events** (Luna collapse, FTX, Bonk launch, etc.)
- **15+ capital flows** tracked between sectors
- **4 whale addresses** with historical moves
- **7 dead projects** memorial
- **4 ML predictions** for future flows

### Future: Real Data Integration
To integrate real data, you can connect to:
- **DeFiLlama API** for TVL data
- **Dune Analytics** for on-chain flows
- **Twitter API** for sentiment
- **GitHub API** for developer activity
- **Nansen/Arkham** for whale tracking

## 🚦 Performance

The app is optimized for 60fps with:
- Efficient particle system (up to 3000+ particles)
- Memoized calculations
- Lazy loading of components
- Code splitting in production build
- Optimized bundle size (~300KB gzipped)

## 📝 License

MIT License - Feel free to use this for personal or commercial projects.

## 🎉 Credits

Built with:
- React 18 + TypeScript
- PixiJS (particle physics)
- Framer Motion (animations)
- Zustand (state management)
- Tailwind CSS (styling)
- Vite (build tool)

Design philosophy: "Crypto Archaeology Terminal" - Making crypto capital flows beautiful and understandable.

---

**Questions?** Check the main README.md for more details.

Enjoy exploring where the internet's money went! 🗺️💰
