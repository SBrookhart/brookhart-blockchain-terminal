import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, FastForward } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatDate } from '../../utils/format';

const TIMELINE_START = new Date('2020-01-01');
const TIMELINE_END = new Date('2025-12-31');
const TOTAL_MS = TIMELINE_END.getTime() - TIMELINE_START.getTime();
const STEP_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const TICK_MS = 50; // Animation tick interval

const SPEEDS = [
  { value: 0.5, label: '0.5x' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 5, label: '5x' },
  { value: 10, label: '10x' },
];

/**
 * Timeline controls for historical mode.
 * Play/pause, scrubber, speed controls, date display.
 */
export function TimelineControls() {
  const {
    mode,
    currentDate,
    isPlaying,
    playbackSpeed,
    setCurrentDate,
    togglePlay,
    setPlaybackSpeed,
  } = useStore();

  // Only show in historical mode
  if (mode !== 'historical') return null;

  // Calculate scrubber position (0-1)
  const progress = Math.max(
    0,
    Math.min(1, (currentDate.getTime() - TIMELINE_START.getTime()) / TOTAL_MS)
  );

  // Auto-advance timeline when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const next = new Date(
        currentDate.getTime() + STEP_MS * playbackSpeed * (TICK_MS / 1000)
      );
      if (next >= TIMELINE_END) {
        setCurrentDate(TIMELINE_END);
        togglePlay();
      } else {
        setCurrentDate(next);
      }
    }, TICK_MS);
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

  // Handle scrubber click
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const newDate = new Date(TIMELINE_START.getTime() + pct * TOTAL_MS);
    setCurrentDate(newDate);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-terminal-surface/95 backdrop-blur border-t border-terminal-border"
    >
      <div className="flex items-center gap-3 h-12 px-4">
        {/* Transport controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={stepBack}
            className="p-1.5 text-terminal-dim hover:text-terminal-text"
            title="Step back 30 days"
          >
            <SkipBack size={14} />
          </button>
          <button
            onClick={togglePlay}
            className="p-1.5 text-terminal-accent hover:text-terminal-text"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={stepForward}
            className="p-1.5 text-terminal-dim hover:text-terminal-text"
            title="Step forward 30 days"
          >
            <SkipForward size={14} />
          </button>
        </div>

        {/* Current date */}
        <div className="font-display text-xs text-terminal-text w-24 text-center">
          {formatDate(currentDate)}
        </div>

        {/* Scrubber */}
        <div
          className="flex-1 h-2 bg-terminal-bg rounded-full cursor-pointer relative border border-terminal-border"
          onClick={handleScrubberClick}
        >
          {/* Year markers */}
          {[2020, 2021, 2022, 2023, 2024, 2025].map(year => {
            const yearPct =
              ((new Date(`${year}-01-01`).getTime() - TIMELINE_START.getTime()) / TOTAL_MS) * 100;
            return (
              <div
                key={year}
                className="absolute top-full mt-1 font-display text-[8px] text-terminal-dim"
                style={{ left: `${yearPct}%`, transform: 'translateX(-50%)' }}
              >
                {year}
              </div>
            );
          })}

          {/* Progress bar */}
          <div
            className="absolute top-0 left-0 h-full bg-terminal-accent/30 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Playhead */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-terminal-accent rounded-full shadow-lg"
            style={{ left: `${progress * 100}%`, transform: `translateX(-50%) translateY(-50%)` }}
            whileHover={{ scale: 1.3 }}
          />
        </div>

        {/* Speed controls */}
        <div className="flex items-center gap-1 ml-2">
          <FastForward size={12} className="text-terminal-dim" />
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
    </motion.div>
  );
}
