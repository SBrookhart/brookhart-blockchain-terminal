import { useEffect } from 'react';
import { ParticleCanvas } from './components/Canvas/ParticleCanvas';
import { Header } from './components/UI/Header';
import { Tutorial } from './components/UI/Tutorial';
import { TimelineControls } from './components/Timeline/TimelineControls';
import { EventMarkers } from './components/Timeline/EventMarkers';
import { EventCard } from './components/Panels/EventCard';
import { SectorPanel } from './components/Panels/SectorPanel';
import { DeadZonePanel } from './components/Panels/DeadZone';
import { SmartMoneyPanel } from './components/Features/SmartMoney';
import { PredictionsPanel } from './components/Features/Predictions';
import { useStore } from './store/useStore';

function App() {
  const { togglePlay, setPlaybackSpeed, setMode, toggleFeature } = useStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'h':
          setMode('historical');
          break;
        case 'l':
          setMode('live');
          break;
        case 't':
          toggleFeature('showTutorial');
          break;
        case '1':
          setPlaybackSpeed(0.5);
          break;
        case '2':
          setPlaybackSpeed(1);
          break;
        case '3':
          setPlaybackSpeed(2);
          break;
        case '4':
          setPlaybackSpeed(5);
          break;
        case '5':
          setPlaybackSpeed(10);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-terminal-bg">
      {/* Particle Canvas Background */}
      <ParticleCanvas />

      {/* UI Overlays */}
      <Header />
      <EventMarkers />
      <TimelineControls />
      
      {/* Info Panels */}
      <SectorPanel />
      <EventCard />
      
      {/* Feature Panels */}
      <SmartMoneyPanel />
      <PredictionsPanel />
      <DeadZonePanel />
      
      {/* Tutorial */}
      <Tutorial />

      {/* Sector Labels (Fixed on left side) */}
      <div className="fixed left-8 top-32 z-30 space-y-[80px] pointer-events-none">
        {[
          { name: 'ETH DeFi', color: '#00D4FF' },
          { name: 'ETH NFTs', color: '#FF6B9D' },
          { name: 'SOL NFTs', color: '#DC1FFF' },
          { name: 'SOL Memes', color: '#FFD700' },
          { name: 'ETH Memes', color: '#FFA500' },
          { name: 'Arbitrum', color: '#28A0F0' },
          { name: 'Base', color: '#0052FF' },
          { name: 'AI Tokens', color: '#00FFB3' },
          { name: 'RWA', color: '#FF8C42' },
        ].map((sector, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full animate-glow"
              style={{ backgroundColor: sector.color }}
            />
            <span
              className="font-display text-sm uppercase tracking-wide"
              style={{ color: sector.color }}
            >
              {sector.name}
            </span>
          </div>
        ))}
      </div>

      {/* Watermark */}
      <div className="fixed bottom-4 right-8 text-terminal-dim text-xs font-display pointer-events-none">
        Internet Money Map • 2020-2025 • Data Visualization
      </div>
    </div>
  );
}

export default App;
