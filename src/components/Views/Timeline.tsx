import { useEffect, useCallback, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { formatDate, formatLargeNumber } from '../../utils/format';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import type { EventType } from '../../types';

const TIMELINE_START = new Date('2020-01-01');
const TIMELINE_END = new Date('2025-12-31');
const TOTAL_MS = TIMELINE_END.getTime() - TIMELINE_START.getTime();
const STEP_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const EVENT_COLORS: Record<EventType, string> = {
  cultural: '#FFD700',
  tweet: '#1DA1F2',
  tech: '#00FFB3',
  macro: '#FF8C42',
  hack: '#FF4444',
  launch: '#DC1FFF',
};

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  cultural: 'CULTURAL',
  tweet: 'SOCIAL',
  tech: 'TECHNOLOGY',
  macro: 'MACRO',
  hack: 'HACK',
  launch: 'LAUNCH',
};

const SPEEDS = [
  { value: 0.5, label: '0.5x' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 5, label: '5x' },
];

/**
 * Timeline / Time Machine view.
 * Scrub through 2020-2025 history with narrative events.
 */
export function Timeline() {
  const {
    events,
    currentDate,
    isPlaying,
    playbackSpeed,
    setCurrentDate,
    togglePlay,
    setPlaybackSpeed,
  } = useStore();

  // Progress 0-1
  const progress = Math.max(
    0,
    Math.min(1, (currentDate.getTime() - TIMELINE_START.getTime()) / TOTAL_MS)
  );

  // Auto-advance
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const next = new Date(currentDate.getTime() + STEP_MS * playbackSpeed * 0.05);
      if (next >= TIMELINE_END) {
        setCurrentDate(TIMELINE_END);
        togglePlay();
      } else {
        setCurrentDate(next);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, currentDate, playbackSpeed, setCurrentDate, togglePlay]);

  const stepBack = useCallback(() => {
    const next = new Date(currentDate.getTime() - STEP_MS);
    setCurrentDate(next < TIMELINE_START ? TIMELINE_START : next);
  }, [currentDate, setCurrentDate]);

  const stepForward = useCallback(() => {
    const next = new Date(currentDate.getTime() + STEP_MS);
    setCurrentDate(next > TIMELINE_END ? TIMELINE_END : next);
  }, [currentDate, setCurrentDate]);

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCurrentDate(new Date(TIMELINE_START.getTime() + pct * TOTAL_MS));
  };

  // Events before current date, most recent first
  const pastEvents = useMemo(() => {
    return events
      .filter(e => new Date(e.timestamp) <= currentDate)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [events, currentDate]);

  // Upcoming events
  const upcomingEvents = useMemo(() => {
    return events
      .filter(e => new Date(e.timestamp) > currentDate)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(0, 5);
  }, [events, currentDate]);

  return (
    <div className="p-2 h-full overflow-hidden flex flex-col">
      {/* Timeline scrubber */}
      <div className="bg-terminal-surface border border-terminal-border rounded p-3 mb-2">
        <div className="flex items-center gap-3">
          {/* Transport */}
          <div className="flex items-center gap-1">
            <button onClick={stepBack} className="p-1 text-terminal-dim hover:text-terminal-text">
              <SkipBack size={14} />
            </button>
            <button onClick={togglePlay} className="p-1 text-terminal-accent hover:text-terminal-text">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={stepForward} className="p-1 text-terminal-dim hover:text-terminal-text">
              <SkipForward size={14} />
            </button>
          </div>

          {/* Date */}
          <span className="font-display text-sm text-terminal-text w-32 text-center">
            {formatDate(currentDate)}
          </span>

          {/* Scrubber bar */}
          <div
            className="flex-1 h-3 bg-terminal-bg rounded-full cursor-pointer relative border border-terminal-border"
            onClick={handleScrub}
          >
            {/* Event dots */}
            {events.map(ev => {
              const pct = ((new Date(ev.timestamp).getTime() - TIMELINE_START.getTime()) / TOTAL_MS) * 100;
              return (
                <div
                  key={ev.id}
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    left: `${pct}%`,
                    backgroundColor: EVENT_COLORS[ev.type],
                    opacity: new Date(ev.timestamp) <= currentDate ? 0.8 : 0.2,
                  }}
                />
              );
            })}

            {/* Progress fill */}
            <div
              className="absolute top-0 left-0 h-full bg-terminal-accent/20 rounded-full"
              style={{ width: `${progress * 100}%` }}
            />

            {/* Playhead */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-terminal-accent rounded-full shadow-lg"
              style={{ left: `${progress * 100}%`, transform: `translateX(-50%) translateY(-50%)` }}
            />

            {/* Year labels */}
            {[2020, 2021, 2022, 2023, 2024, 2025].map(year => {
              const pct = ((new Date(`${year}-01-01`).getTime() - TIMELINE_START.getTime()) / TOTAL_MS) * 100;
              return (
                <div
                  key={year}
                  className="absolute top-full mt-1 font-display text-[8px] text-terminal-dim"
                  style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
                >
                  {year}
                </div>
              );
            })}
          </div>

          {/* Speed */}
          <div className="flex items-center gap-1">
            {SPEEDS.map(s => (
              <button
                key={s.value}
                onClick={() => setPlaybackSpeed(s.value)}
                className={`px-1.5 py-0.5 font-display text-[9px] rounded ${
                  playbackSpeed === s.value
                    ? 'bg-terminal-accent/20 text-terminal-accent'
                    : 'text-terminal-dim hover:text-terminal-text'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="grid grid-cols-12 gap-2 flex-1 overflow-hidden">
        {/* Past events (scrollable) */}
        <div className="col-span-8 overflow-y-auto">
          <Panel title={`Events up to ${formatDate(currentDate)}`}>
            <div className="space-y-2">
              {pastEvents.map(event => (
                <div key={event.id} className="bg-terminal-bg rounded border border-terminal-border p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="font-display text-[9px] tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        color: EVENT_COLORS[event.type],
                        backgroundColor: `${EVENT_COLORS[event.type]}15`,
                      }}
                    >
                      {EVENT_TYPE_LABELS[event.type]}
                    </span>
                    <span className="font-display text-[9px] text-terminal-dim">
                      {formatDate(event.timestamp)}
                    </span>
                    <span className="ml-auto font-display text-[9px] text-terminal-dim">
                      weight: {event.weight.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[12px] text-terminal-text font-medium mb-1">
                    {event.title}
                  </div>
                  <p className="text-[11px] text-terminal-dim leading-relaxed">
                    {event.description}
                  </p>
                  {event.impact.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {event.impact.map((imp, i) => (
                        <span key={i} className={`font-display text-[9px] px-1.5 py-0.5 rounded border border-terminal-border ${
                          imp.amount >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {imp.from} {'\u2192'} {imp.to}: {formatLargeNumber(Math.abs(imp.amount) * 1_000_000_000)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {pastEvents.length === 0 && (
                <div className="text-center text-terminal-dim text-[11px] py-8">
                  Advance the timeline to see events
                </div>
              )}
            </div>
          </Panel>
        </div>

        {/* Upcoming events */}
        <div className="col-span-4 overflow-y-auto">
          <Panel title="Coming Up">
            <div className="space-y-2">
              {upcomingEvents.map(event => (
                <div key={event.id} className="py-2 border-b border-terminal-border/30 last:border-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: EVENT_COLORS[event.type] }}
                    />
                    <span className="font-display text-[8px] text-terminal-dim tracking-wider">
                      {formatDate(event.timestamp)}
                    </span>
                  </div>
                  <div className="text-[11px] text-terminal-text leading-tight opacity-60">
                    {event.title}
                  </div>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <div className="text-center text-terminal-dim text-[10px] py-4">
                  No more events ahead
                </div>
              )}
            </div>
          </Panel>

          {/* Stats */}
          <div className="mt-2">
            <Panel title="Era Context">
              <div className="space-y-2 text-[10px]">
                <EraNote date={currentDate} />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Contextual note about what era we're in */
function EraNote({ date }: { date: Date }) {
  const year = date.getFullYear();
  const month = date.getMonth();

  let era = '';
  let sentiment = '';

  if (year === 2020 && month < 6) {
    era = 'Pre-DeFi Summer';
    sentiment = 'Quiet accumulation phase. DeFi TVL under $1B.';
  } else if (year === 2020) {
    era = 'DeFi Summer';
    sentiment = 'Yield farming explosion. COMP, YFI, SUSHI. TVL 10x in months.';
  } else if (year === 2021 && month < 6) {
    era = 'NFT Boom + Alt Season';
    sentiment = 'Beeple, BAYC, memecoins. Peak euphoria. Everything pumps.';
  } else if (year === 2021) {
    era = 'L1 Wars + Peak Bull';
    sentiment = 'SOL, AVAX, LUNA competing for capital. BTC hits ATH.';
  } else if (year === 2022 && month < 5) {
    era = 'Calm Before the Storm';
    sentiment = 'Markets cooling. UST growing ominously.';
  } else if (year === 2022 && month < 11) {
    era = 'Contagion Cascade';
    sentiment = 'Terra, 3AC, Celsius, Voyager. Dominos falling.';
  } else if (year === 2022) {
    era = 'FTX Collapse';
    sentiment = 'Industry trust at all-time low. SOL devastated.';
  } else if (year === 2023 && month < 6) {
    era = 'Rebuilding Phase';
    sentiment = 'Quiet recovery. L2s growing. AI narrative emerging.';
  } else if (year === 2023) {
    era = 'L2 Summer + Base Launch';
    sentiment = 'Arbitrum airdrop, Base goes live. DeFi slowly recovering.';
  } else if (year === 2024 && month < 3) {
    era = 'ETF Era Begins';
    sentiment = 'BTC ETF approved. Institutional capital entering.';
  } else if (year === 2024 && month < 9) {
    era = 'Memecoin Mania v2';
    sentiment = 'WIF, BONK, pump.fun. SOL meme season. ETH ETF approved.';
  } else if (year === 2024) {
    era = 'BTC to $100K';
    sentiment = 'Halving supply shock + ETF demand = new ATH.';
  } else {
    era = 'AI Agent Era';
    sentiment = 'Autonomous agents, Base surpasses Arbitrum, RWA growth.';
  }

  return (
    <div>
      <div className="font-display text-terminal-accent font-bold tracking-wider mb-1">{era}</div>
      <div className="text-terminal-dim leading-relaxed">{sentiment}</div>
    </div>
  );
}
