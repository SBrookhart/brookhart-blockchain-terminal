import { useEffect } from 'react';
import { OrbitalMap } from './components/Orbital/OrbitalMap';
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
  const { togglePlay, setPlaybackSpeed, setMode, toggleFeature, fetchLiveData } = useStore();

  // Fetch live data on mount
  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

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
  }, [togglePlay, setPlaybackSpeed, setMode, toggleFeature]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-terminal-bg">
      {/* Orbital Visualization (center) */}
      <div className="absolute inset-0 flex items-center justify-center pt-10">
        <OrbitalMap />
      </div>

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

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 text-terminal-dim text-[10px] font-display pointer-events-none z-10">
        INTERNET MONEY MAP • DATA VIA DEFILLAMA
      </div>
    </div>
  );
}

export default App;
