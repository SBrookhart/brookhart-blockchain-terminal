import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatDate, formatBillions } from '../../utils/format';
import type { EventType } from '../../types';

const EVENT_TYPE_LABELS: Record<EventType, { label: string; color: string }> = {
  cultural: { label: 'CULTURAL', color: '#FFD700' },
  tweet: { label: 'SOCIAL', color: '#1DA1F2' },
  tech: { label: 'TECHNOLOGY', color: '#00FFB3' },
  macro: { label: 'MACRO', color: '#FF8C42' },
  hack: { label: 'HACK / COLLAPSE', color: '#FF4444' },
  launch: { label: 'LAUNCH', color: '#DC1FFF' },
};

/**
 * Detailed event card shown when an event is selected.
 * Shows narrative description, capital flow impacts, and sentiment.
 */
export function EventCard() {
  const { events, sectors, selectedEvent, selectEvent } = useStore();

  const event = events.find(e => e.id === selectedEvent);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 w-[480px] max-w-[calc(100vw-2rem)] bg-terminal-surface/95 backdrop-blur border border-terminal-border rounded-lg overflow-hidden"
        >
          {/* Color accent bar */}
          <div
            className="h-1"
            style={{ backgroundColor: EVENT_TYPE_LABELS[event.type].color }}
          />

          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-display text-[9px] tracking-widest px-1.5 py-0.5 rounded"
                    style={{
                      color: EVENT_TYPE_LABELS[event.type].color,
                      backgroundColor: `${EVENT_TYPE_LABELS[event.type].color}15`,
                    }}
                  >
                    {EVENT_TYPE_LABELS[event.type].label}
                  </span>
                  <span className="font-display text-[10px] text-terminal-dim">
                    {formatDate(event.timestamp)}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-terminal-text">
                  {event.title}
                </h3>
              </div>
              <button
                onClick={() => selectEvent(null)}
                className="text-terminal-dim hover:text-terminal-text mt-1"
              >
                <X size={14} />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-terminal-dim leading-relaxed mb-4">
              {event.description}
            </p>

            {/* Impact flows */}
            {event.impact.length > 0 && (
              <div className="mb-3">
                <div className="font-display text-[9px] text-terminal-dim tracking-widest mb-2">
                  CAPITAL IMPACT
                </div>
                <div className="space-y-1.5">
                  {event.impact.map((impact, i) => {
                    const fromSector = sectors.find(s => s.id === impact.from);
                    const toSector = sectors.find(s => s.id === impact.to);
                    const isNegative = impact.amount < 0;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 py-1.5 px-2 bg-terminal-bg rounded border border-terminal-border"
                      >
                        <span
                          className="text-xs font-medium"
                          style={{ color: fromSector?.color }}
                        >
                          {fromSector?.shortName || impact.from}
                        </span>
                        <ArrowRight size={12} className="text-terminal-dim" />
                        <span
                          className="text-xs font-medium"
                          style={{ color: toSector?.color }}
                        >
                          {toSector?.shortName || impact.to}
                        </span>
                        <span className="ml-auto flex items-center gap-1">
                          {isNegative ? (
                            <TrendingDown size={10} className="text-red-400" />
                          ) : (
                            <TrendingUp size={10} className="text-green-400" />
                          )}
                          <span
                            className={`font-display text-xs ${
                              isNegative ? 'text-red-400' : 'text-green-400'
                            }`}
                          >
                            {formatBillions(Math.abs(impact.amount))}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sentiment & Social */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-terminal-bg rounded border border-terminal-border p-2">
                <div className="font-display text-[9px] text-terminal-dim tracking-widest">
                  SENTIMENT
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-terminal-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${((event.sentiment + 1) / 2) * 100}%`,
                        backgroundColor:
                          event.sentiment > 0 ? '#00ff88' : event.sentiment < 0 ? '#ff4444' : '#7a8496',
                      }}
                    />
                  </div>
                  <span className="font-display text-[10px] text-terminal-text">
                    {event.sentiment > 0 ? '+' : ''}{(event.sentiment * 100).toFixed(0)}
                  </span>
                </div>
              </div>
              <div className="bg-terminal-bg rounded border border-terminal-border p-2">
                <div className="font-display text-[9px] text-terminal-dim tracking-widest">
                  SOCIAL GRAVITY
                </div>
                <div className="font-display text-sm text-terminal-text mt-1">
                  {event.socialGravity}/100
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
