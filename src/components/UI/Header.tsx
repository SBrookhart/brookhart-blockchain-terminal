import { motion } from 'framer-motion';
import { Activity, Brain, Skull, Wallet, HelpCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { TimeRange, ViewMode } from '../../types';

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: '24h', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
  { value: '1y', label: '1Y' },
];

const MODES: { value: ViewMode; label: string }[] = [
  { value: 'live', label: 'LIVE' },
  { value: 'historical', label: 'HISTORICAL' },
];

/**
 * Bloomberg-style header bar.
 * Contains: logo, mode toggle, time range selector, feature toggles, status.
 */
export function Header() {
  const {
    mode,
    timeRange,
    isLoading,
    error,
    features,
    setMode,
    setTimeRange,
    toggleFeature,
    fetchLiveData,
  } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-terminal-surface/95 backdrop-blur border-b border-terminal-border">
      <div className="flex items-center justify-between h-10 px-4">
        {/* Left: Logo + Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-terminal-accent animate-pulse" />
            <span className="font-display text-xs font-bold text-terminal-accent tracking-widest">
              IMM
            </span>
            <span className="font-display text-xs text-terminal-dim hidden sm:inline">
              INTERNET MONEY MAP
            </span>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-terminal-bg rounded overflow-hidden border border-terminal-border">
            {MODES.map(m => (
              <button
                key={m.value}
                onClick={() => {
                  setMode(m.value);
                  if (m.value === 'live') fetchLiveData();
                }}
                className={`px-3 py-1 font-display text-[10px] tracking-wider transition-colors ${
                  mode === m.value
                    ? 'bg-terminal-accent/20 text-terminal-accent'
                    : 'text-terminal-dim hover:text-terminal-text'
                }`}
              >
                {m.label}
                {m.value === 'live' && mode === 'live' && (
                  <motion.span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 ml-1.5"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Time Range (live mode only) */}
          {mode === 'live' && (
            <div className="flex bg-terminal-bg rounded overflow-hidden border border-terminal-border">
              {TIME_RANGES.map(tr => (
                <button
                  key={tr.value}
                  onClick={() => setTimeRange(tr.value)}
                  className={`px-2 py-1 font-display text-[10px] tracking-wider transition-colors ${
                    timeRange === tr.value
                      ? 'bg-terminal-border text-terminal-text'
                      : 'text-terminal-dim hover:text-terminal-text'
                  }`}
                >
                  {tr.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Feature Toggles + Status */}
        <div className="flex items-center gap-2">
          <FeatureButton
            icon={<Wallet size={14} />}
            label="SMART $"
            active={features.showSmartMoney}
            onClick={() => toggleFeature('showSmartMoney')}
          />
          <FeatureButton
            icon={<Brain size={14} />}
            label="PREDICT"
            active={features.showPredictions}
            onClick={() => toggleFeature('showPredictions')}
          />
          <FeatureButton
            icon={<Skull size={14} />}
            label="DEAD"
            active={features.showDeadZone}
            onClick={() => toggleFeature('showDeadZone')}
          />
          <FeatureButton
            icon={<HelpCircle size={14} />}
            label="HELP"
            active={features.showTutorial}
            onClick={() => toggleFeature('showTutorial')}
          />

          {/* Status indicator */}
          <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-terminal-border">
            {isLoading ? (
              <>
                <Activity size={12} className="text-yellow-400 animate-pulse" />
                <span className="font-display text-[10px] text-yellow-400">LOADING</span>
              </>
            ) : error ? (
              <>
                <Activity size={12} className="text-red-400" />
                <span className="font-display text-[10px] text-red-400">OFFLINE</span>
              </>
            ) : (
              <>
                <Activity size={12} className="text-terminal-accent" />
                <span className="font-display text-[10px] text-terminal-accent">LIVE</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded font-display text-[10px] tracking-wider transition-colors border ${
        active
          ? 'bg-terminal-accent/15 text-terminal-accent border-terminal-accent/30'
          : 'text-terminal-dim border-terminal-border hover:text-terminal-text hover:border-terminal-dim'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}
