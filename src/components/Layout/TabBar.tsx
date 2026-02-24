import { useStore } from '../../store/useStore';
import type { TabId } from '../../types';
import { Activity, TrendingUp, Link2, Clock, Skull } from 'lucide-react';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'pulse', label: 'PULSE', icon: <Activity size={12} /> },
  { id: 'narratives', label: 'NARRATIVES', icon: <TrendingUp size={12} /> },
  { id: 'chains', label: 'CHAINS', icon: <Link2 size={12} /> },
  { id: 'timeline', label: 'TIMELINE', icon: <Clock size={12} /> },
  { id: 'graveyard', label: 'GRAVEYARD', icon: <Skull size={12} /> },
];

/**
 * Tab navigation bar below the top ticker.
 */
export function TabBar() {
  const { activeTab, setActiveTab } = useStore();

  return (
    <nav className="flex items-center h-8 px-3 bg-terminal-surface border-b border-terminal-border">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-1.5 px-3 h-full font-display text-[10px] tracking-wider border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'text-terminal-accent border-terminal-accent'
              : 'text-terminal-dim border-transparent hover:text-terminal-text hover:border-terminal-dim'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
