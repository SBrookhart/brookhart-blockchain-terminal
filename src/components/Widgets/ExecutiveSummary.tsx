import { useMemo, type ReactNode } from 'react';
import { useStore } from '../../store/useStore';
import { generateExecutiveSummary, type SummaryBullet } from '../../data/reportTemplates';

const SENTIMENT_ACCENT: Record<SummaryBullet['sentiment'], string> = {
  bullish: '#00ff88',   // terminal green
  bearish: '#ff4444',   // red
  neutral: '#7a8496',   // dim gray
  caution: '#FFD700',   // gold / warning
};

/**
 * Map of phrases in the executive summary body text → glossary term IDs.
 * When rendered, these phrases become clickable links to the Learn tab.
 * Longer phrases first so they match before shorter substrings.
 */
const GLOSSARY_LINKS: { phrase: string; termId: string }[] = [
  { phrase: '"BTC dominance"', termId: 'btc-dominance' },
  { phrase: 'BTC dominance', termId: 'btc-dominance' },
  { phrase: 'daily trading volume', termId: 'liquidity' },
  { phrase: 'total deposits', termId: 'tvl' },
  { phrase: 'deposited into its projects', termId: 'tvl' },
  { phrase: 'deposited across its projects', termId: 'tvl' },
  { phrase: 'smart contracts', termId: 'smart-contract' },
  { phrase: 'gas fees', termId: 'gas-fees' },
  { phrase: 'Layer 2', termId: 'layer-2' },
  { phrase: 'staking', termId: 'staking' },
  { phrase: 'blockchains', termId: 'blockchain' },
];

/**
 * Parse body text and replace glossary-linked phrases with clickable elements.
 * Each phrase is only linked once (the first occurrence) to avoid visual clutter.
 */
function renderBodyWithLinks(
  body: string,
  onNavigate: (termId: string) => void,
): ReactNode[] {
  const usedTerms = new Set<string>();
  let remaining = body;
  const parts: ReactNode[] = [];
  let keyIndex = 0;

  while (remaining.length > 0) {
    let earliestMatch: { index: number; phrase: string; termId: string } | null = null;

    for (const link of GLOSSARY_LINKS) {
      if (usedTerms.has(link.termId)) continue;
      const idx = remaining.indexOf(link.phrase);
      if (idx !== -1 && (earliestMatch === null || idx < earliestMatch.index)) {
        earliestMatch = { index: idx, phrase: link.phrase, termId: link.termId };
      }
    }

    if (!earliestMatch) {
      parts.push(remaining);
      break;
    }

    // Text before the match
    if (earliestMatch.index > 0) {
      parts.push(remaining.slice(0, earliestMatch.index));
    }

    // The linked phrase
    const termId = earliestMatch.termId;
    parts.push(
      <button
        key={`gl-${keyIndex++}`}
        onClick={(e) => { e.stopPropagation(); onNavigate(termId); }}
        className="text-terminal-accent hover:underline cursor-pointer"
        title="Learn more →"
      >
        {earliestMatch.phrase}
      </button>
    );
    usedTerms.add(termId);

    remaining = remaining.slice(earliestMatch.index + earliestMatch.phrase.length);
  }

  return parts;
}

/**
 * Executive Summary — the hero section of Current Pulse.
 *
 * Renders 7-8 narrative-style bullets generated from live data.
 * Each bullet: colored accent bar + bold headline + 2-3 sentence explanation.
 * Written for a lay person — educational, story-first, jargon explained inline.
 * Key terms are linked to the Learn tab glossary.
 */
export function ExecutiveSummary() {
  const { globalData, narratives, chains, topTokens, navigateToGlossary } = useStore();

  const bullets = useMemo(
    () => generateExecutiveSummary({ globalData, narratives, chains, topTokens }),
    [globalData, narratives, chains, topTokens],
  );

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-terminal-border">
        <span className="font-display text-[10px] text-terminal-dim tracking-widest uppercase">
          Executive Summary
        </span>
        <span className="text-[9px] text-terminal-dim">
          Underlined terms link to <button onClick={() => navigateToGlossary('blockchain')} className="text-terminal-accent hover:underline">LEARN</button>
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
                {renderBodyWithLinks(bullet.body, navigateToGlossary)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
