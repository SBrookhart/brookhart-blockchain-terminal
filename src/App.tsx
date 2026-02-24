import { useEffect } from 'react';
import { TopBar } from './components/Layout/TopBar';
import { TabBar } from './components/Layout/TabBar';
import { BottomBar } from './components/Layout/BottomBar';
import { Overview } from './components/Views/Overview';
import { Chains } from './components/Views/Chains';
import { Flows } from './components/Views/Flows';
import { Timeline } from './components/Views/Timeline';
import { Risk } from './components/Views/Risk';
import { useStore } from './store/useStore';

function App() {
  const { activeTab, setActiveTab, fetchAllData } = useStore();

  // Fetch live data on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case '1': setActiveTab('overview'); break;
        case '2': setActiveTab('chains'); break;
        case '3': setActiveTab('flows'); break;
        case '4': setActiveTab('timeline'); break;
        case '5': setActiveTab('risk'); break;
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
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'chains' && <Chains />}
        {activeTab === 'flows' && <Flows />}
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'risk' && <Risk />}
      </main>
      <BottomBar />
    </div>
  );
}

export default App;
