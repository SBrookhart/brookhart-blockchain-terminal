import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { generateExecutiveSummary, type SummaryBullet } from '../../data/reportTemplates';

const SENTIMENT_ACCENT: Record<SummaryBullet['sentiment'], string> = {
  bullish: '#00ff88',   // terminal green
  bearish: '#ff4444',   // red
  neutral: '#7a8496',   // dim gray
  caution: '#FFD700',   // gold / warning
};

/**
 * Executive Summary — the hero section of Current Pulse.
 *
 * Renders 7-8 narrative-style bullets generated from live data.
 * Each bullet: colored accent bar + bold headline + 2-3 sentence explanation.
 * Written for a lay person — educational, story-first, jargon explained inline.
 */
export function ExecutiveSummary() {
  const { globalData, narratives, chains, topTokens } = useStore();

  const bullets = useMemo(
    () => generateExecutiveSummary({ globalData, narratives, chains, topTokens }),
    [globalData, narratives, chains, topTokens],
  );

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded">
      <div className="px-3 py-1.5 border-b border-terminal-border">
        <span className="font-display text-[10px] text-terminal-dim tracking-widest uppercase">
          Executive Summary
        </span>
      </div>
      <div className="p-4 space-y-4">
        {bullets.map((bullet, i) => (
          <div key={i} className="flex gap-3">
            {/* Colored accent bar — sentiment indicator */}
            <div
              className="w-0.5 rounded-full flex-shrink-0 self-stretch"
              style={{ backgroundColor: SENTIMENT_ACCENT[bullet.sentiment] }}
            />
            <div className="min-w-0">
              <div className="text-[12px] font-bold text-terminal-text mb-0.5">
                {bullet.headline}
              </div>
              <p className="text-[11px] text-terminal-dim leading-relaxed">
                {bullet.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
