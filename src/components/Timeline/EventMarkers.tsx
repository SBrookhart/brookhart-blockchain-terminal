import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import type { NarrativeEvent, EventType } from '../../types';

const TIMELINE_START = new Date('2020-01-01').getTime();
const TIMELINE_END = new Date('2025-12-31').getTime();
const TOTAL_MS = TIMELINE_END - TIMELINE_START;

const EVENT_COLORS: Record<EventType, string> = {
  cultural: '#FFD700',
  tweet: '#1DA1F2',
  tech: '#00FFB3',
  macro: '#FF8C42',
  hack: '#FF4444',
  launch: '#DC1FFF',
};

const EVENT_ICONS: Record<EventType, string> = {
  cultural: '\u{1F3AD}',
  tweet: '\u{1F426}',
  tech: '\u26A1',
  macro: '\u{1F4CA}',
  hack: '\u{1F480}',
  launch: '\u{1F680}',
};

/**
 * Event markers displayed along the bottom timeline (historical mode)
 * or as a vertical sidebar list (live mode).
 */
export function EventMarkers() {
  const { mode, events, currentDate, selectedEvent, selectEvent } = useStore();

  // In historical mode, show events near the current date
  const visibleEvents = useMemo(() => {
    if (mode === 'historical') {
      const windowMs = 90 * 24 * 60 * 60 * 1000; // 90-day window
      return events.filter(e => {
        const d = new Date(e.timestamp).getTime();
        const cur = currentDate.getTime();
        return Math.abs(d - cur) < windowMs;
      });
    }
    // In live mode, show the most recent 8 events
    return [...events]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8);
  }, [mode, events, currentDate]);

  if (mode === 'historical') {
    return <HistoricalMarkers events={visibleEvents} selectedEvent={selectedEvent} onSelect={selectEvent} />;
  }

  return <LiveEventList events={visibleEvents} selectedEvent={selectedEvent} onSelect={selectEvent} />;
}

/** Markers on the timeline scrubber (historical mode) */
function HistoricalMarkers({
  events,
  selectedEvent,
  onSelect,
}: {
  events: NarrativeEvent[];
  selectedEvent: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="fixed bottom-14 left-0 right-0 z-30 px-4 pointer-events-none">
      <div className="relative h-6">
        {events.map(event => {
          const pct =
            ((new Date(event.timestamp).getTime() - TIMELINE_START) / TOTAL_MS) * 100;
          const isSelected = selectedEvent === event.id;
          const color = EVENT_COLORS[event.type];

          return (
            <motion.button
              key={event.id}
              className="absolute -translate-x-1/2 pointer-events-auto"
              style={{ left: `${pct}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.3 }}
              onClick={() => onSelect(isSelected ? null : event.id)}
              title={event.title}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] ${
                  isSelected ? 'ring-2 ring-offset-1 ring-offset-terminal-bg' : ''
                }`}
                style={{
                  borderColor: color,
                  backgroundColor: isSelected ? color : 'transparent',
                  boxShadow: `0 0 8px ${color}40`,
                  // ring-color is set via the Tailwind ring class on the className
                }}
              >
                {event.weight > 0.8 && (
                  <span style={{ filter: isSelected ? 'brightness(0)' : 'none' }}>
                    {EVENT_ICONS[event.type]}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/** Sidebar event list (live mode) */
function LiveEventList({
  events,
  selectedEvent,
  onSelect,
}: {
  events: NarrativeEvent[];
  selectedEvent: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="fixed right-0 top-12 bottom-0 w-64 z-30 bg-terminal-surface/80 backdrop-blur border-l border-terminal-border overflow-y-auto">
      <div className="p-3">
        <div className="font-display text-[10px] text-terminal-dim tracking-widest mb-3">
          RECENT EVENTS
        </div>
        <div className="space-y-2">
          {events.map(event => {
            const isSelected = selectedEvent === event.id;
            const color = EVENT_COLORS[event.type];
            return (
              <motion.button
                key={event.id}
                className={`w-full text-left p-2 rounded border transition-colors ${
                  isSelected
                    ? 'border-terminal-accent bg-terminal-accent/10'
                    : 'border-terminal-border hover:border-terminal-dim bg-terminal-bg/50'
                }`}
                onClick={() => onSelect(isSelected ? null : event.id)}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-display text-[9px] text-terminal-dim tracking-wider">
                    {event.type.toUpperCase()} &bull; {new Date(event.timestamp).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="text-xs text-terminal-text font-medium leading-tight">
                  {event.title}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
