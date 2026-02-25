import { useEffect } from 'react';
import { TopBar } from './components/Layout/TopBar';
import { TabBar } from './components/Layout/TabBar';
import { BottomBar } from './components/Layout/BottomBar';
import { Pulse } from './components/Views/Pulse';
import { Narratives } from './components/Views/Narratives';
import { Chains } from './components/Views/Chains';
import { Timeline } from './components/Views/Timeline';
import { Graveyard } from './components/Views/Graveyard';
import { Learn } from './components/Views/Learn';
import { useStore } from './store/useStore';

function App() {
  const { activeTab, setActiveTab, fetchAllData } = useStore();

  // Fetch live data on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Keyboard shortcuts (1-5 switch tabs)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case '1': setActiveTab('pulse'); break;
        case '2': setActiveTab('narratives'); break;
        case '3': setActiveTab('chains'); break;
        case '4': setActiveTab('timeline'); break;
        case '5': setActiveTab('graveyard'); break;
        case '6': setActiveTab('learn'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab]);

  return (
    <div className="flex flex-col h-screen bg-terminal-bg text-terminal-text overflow-hidden">
      <TopBar />
      <TabBar />
      <main className="flex-1 overflow-hidden">
        {activeTab === 'pulse' && <Pulse />}
        {activeTab === 'narratives' && <Narratives />}
        {activeTab === 'chains' && <Chains />}
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'graveyard' && <Graveyard />}
        {activeTab === 'learn' && <Learn />}
      </main>
      <BottomBar />
    </div>
  );
}

export default App;
