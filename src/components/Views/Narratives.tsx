import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { formatLargeNumber, formatPercent, getChangeColor, formatDate } from '../../utils/format';
import { ArrowLeft } from 'lucide-react';
import type { NarrativeStatus } from '../../types';

const STATUS_CONFIG: Record<NarrativeStatus, { label: string; color: string; bg: string }> = {
  emerging: { label: 'EMERGING', color: '#00D4FF', bg: '#00D4FF15' },
  heating: { label: 'HEATING UP', color: '#00FF88', bg: '#00FF8815' },
  peak: { label: 'AT PEAK', color: '#FFD700', bg: '#FFD70015' },
  cooling: { label: 'COOLING', color: '#FF8C42', bg: '#FF8C4215' },
  dead: { label: 'DEAD', color: '#FF4444', bg: '#FF444415' },
};

/**
 * Narratives deep-dive view.
 * Click into any narrative to see full thesis, chains, protocols,
 * catalysts, risks, and related events.
 */
export function Narratives() {
  const {
    narratives, events, chains, selectedNarrative,
    selectNarrative, selectChain, setActiveTab,
  } = useStore();

  const narrative = narratives.find(n => n.id === selectedNarrative);

  // Related events for selected narrative
  const relatedEvents = useMemo(() => {
    if (!narrative) return [];
    const nameWords = narrative.name.toLowerCase().split(/\s+/);
    return events
      .filter(e => {
        const text = `${e.title} ${e.description}`.toLowerCase();
        return nameWords.some(w => w.length > 3 && text.includes(w)) ||
          narrative.protocols.some(p => text.includes(p.toLowerCase())) ||
          narrative.tokens.some(t => text.includes(t.toLowerCase()));
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [narrative, events]);

  // Chains related to this narrative
  const relatedChains = useMemo(() => {
    if (!narrative) return [];
    return chains.filter(c => narrative.chains.includes(c.name));
  }, [narrative, chains]);

  // If no narrative selected, show grid of all narratives
  if (!narrative) {
    const activeNarratives = narratives.filter(n => n.status !== 'dead');
    const deadNarratives = narratives.filter(n => n.status === 'dead');

    return (
      <div className="p-2 h-full overflow-y-auto">
        <Panel title="All Narratives">
          <div className="grid grid-cols-3 gap-2">
            {activeNarratives.map(n => {
              const status = STATUS_CONFIG[n.status];
              return (
                <div
                  key={n.id}
                  className="bg-terminal-bg border border-terminal-border rounded p-3 hover:border-terminal-accent/40 cursor-pointer transition-colors"
                  onClick={() => selectNarrative(n.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[12px] text-terminal-text font-bold">{n.name}</span>
                    <span
                      className="font-display text-[8px] tracking-wider px-1.5 py-0.5 rounded ml-auto"
                      style={{ color: status.color, backgroundColor: status.bg }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-terminal-dim leading-relaxed mb-2 line-clamp-2">
                    {n.thesis}
                  </p>
                  <div className="flex items-center gap-3 text-[9px] font-display">
                    <span className="text-terminal-text">{formatLargeNumber(n.tvlTotal)}</span>
                    <span className={getChangeColor(n.tvlChange7d)}>{formatPercent(n.tvlChange7d)}</span>
                    <span className="text-terminal-accent">{n.socialScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-wrap gap-1">
                      {n.chains.slice(0, 3).map(chain => (
                        <span key={chain} className="text-[8px] text-terminal-dim bg-terminal-surface px-1.5 py-0.5 rounded border border-terminal-border">
                          {chain}
                        </span>
                      ))}
                    </div>
                    {n.sources.length > 0 && (
                      <span className="text-[8px] text-terminal-dim font-display">
                        {n.sources.length} sources
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Dead narratives */}
        <div className="mt-2">
          <Panel title="Dead Narratives">
            <div className="grid grid-cols-3 gap-2">
              {deadNarratives.map(n => (
                <div
                  key={n.id}
                  className="bg-terminal-bg border border-red-900/30 rounded p-3 hover:border-red-900/60 cursor-pointer transition-colors opacity-70 hover:opacity-100"
                  onClick={() => selectNarrative(n.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[12px] text-terminal-text font-bold">{n.name}</span>
                    <span className="font-display text-[8px] tracking-wider px-1.5 py-0.5 rounded ml-auto text-red-400 bg-red-400/10">
                      DEAD
                    </span>
                  </div>
                  <p className="text-[10px] text-terminal-dim leading-relaxed line-clamp-2">
                    {n.thesis}
                  </p>
                  {n.endDate && (
                    <div className="text-[9px] text-terminal-dim mt-2 font-display">
                      {formatDate(n.startDate)} {'\u2192'} {formatDate(n.endDate)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  // Detail view for selected narrative
  const status = STATUS_CONFIG[narrative.status];

  return (
    <div className="p-2 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3 px-1">
        <button
          onClick={() => selectNarrative(null)}
          className="flex items-center gap-1 text-terminal-accent text-[10px] font-display hover:underline"
        >
          <ArrowLeft size={12} /> ALL NARRATIVES
        </button>
      </div>

      <div className="grid grid-cols-12 gap-2">
        {/* Left: Main detail */}
        <div className="col-span-8 space-y-2">
          {/* Title + stats */}
          <div className="bg-terminal-surface border border-terminal-border rounded p-4">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-bold text-terminal-text">{narrative.name}</h2>
              <span
                className="font-display text-[9px] tracking-wider px-2 py-1 rounded"
                style={{ color: status.color, backgroundColor: status.bg }}
              >
                {status.label}
              </span>
            </div>

            <p className="text-[12px] text-terminal-dim leading-relaxed mb-4">
              {narrative.thesis}
            </p>

            {/* Key metrics */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-terminal-bg rounded border border-terminal-border p-2">
                <div className="font-display text-[8px] text-terminal-dim tracking-widest">TVL</div>
                <div className="font-display text-lg text-terminal-text">{formatLargeNumber(narrative.tvlTotal)}</div>
              </div>
              <div className="bg-terminal-bg rounded border border-terminal-border p-2">
                <div className="font-display text-[8px] text-terminal-dim tracking-widest">7D CHANGE</div>
                <div className={`font-display text-lg ${getChangeColor(narrative.tvlChange7d)}`}>
                  {formatPercent(narrative.tvlChange7d)}
                </div>
              </div>
              <div className="bg-terminal-bg rounded border border-terminal-border p-2">
                <div className="font-display text-[8px] text-terminal-dim tracking-widest">SOCIAL BUZZ</div>
                <div className="font-display text-lg text-terminal-accent">{narrative.socialScore}/100</div>
              </div>
              <div className="bg-terminal-bg rounded border border-terminal-border p-2">
                <div className="font-display text-[8px] text-terminal-dim tracking-widest">RISK LEVEL</div>
                <div className={`font-display text-lg ${
                  narrative.riskLevel === 'high' ? 'text-red-400' :
                  narrative.riskLevel === 'medium' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {narrative.riskLevel.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Additional key metrics */}
            {narrative.keyMetrics.length > 0 && (
              <div className="flex gap-4 mt-3 pt-3 border-t border-terminal-border">
                {narrative.keyMetrics.map(m => (
                  <div key={m.label} className="text-[10px]">
                    <span className="text-terminal-dim">{m.label}: </span>
                    <span className="text-terminal-text font-display">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analysis — deep editorial */}
          {narrative.analysis && (
            <Panel title="Analysis — What's Happening Right Now">
              <div className="text-[11px] text-terminal-dim leading-[1.7] whitespace-pre-line">
                {narrative.analysis}
              </div>
            </Panel>
          )}

          {/* Catalysts & Risks side by side */}
          <div className="grid grid-cols-2 gap-2">
            {narrative.catalysts.length > 0 && (
              <Panel title="Catalysts (why it could keep going)">
                <ul className="space-y-2">
                  {narrative.catalysts.map((c, i) => (
                    <li key={i} className="flex gap-2 text-[10px]">
                      <span className="text-green-400 mt-0.5">{'\u25B2'}</span>
                      <span className="text-terminal-dim leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
            {narrative.risks.length > 0 && (
              <Panel title="Risks (why it could unwind)">
                <ul className="space-y-2">
                  {narrative.risks.map((r, i) => (
                    <li key={i} className="flex gap-2 text-[10px]">
                      <span className="text-red-400 mt-0.5">{'\u25BC'}</span>
                      <span className="text-terminal-dim leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </div>

          {/* Sources */}
          {narrative.sources.length > 0 && (
            <Panel title="Sources — Further Reading">
              <div className="flex flex-wrap gap-2">
                {narrative.sources.map((source, i) => (
                  <a
                    key={i}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-terminal-accent hover:underline bg-terminal-bg px-2 py-1.5 rounded border border-terminal-border/50 hover:border-terminal-accent/50 transition-colors"
                  >
                    <span className="text-terminal-dim">{'\u2197'}</span>
                    {source.name}
                    {source.date && (
                      <span className="text-terminal-dim text-[8px]">
                        {new Date(source.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </Panel>
          )}

          {/* Related events */}
          {relatedEvents.length > 0 && (
            <Panel title="Related Events">
              <div className="space-y-2">
                {relatedEvents.slice(0, 5).map(event => (
                  <div key={event.id} className="flex gap-3 py-1.5 border-b border-terminal-border/30 last:border-0">
                    <span className="font-display text-[9px] text-terminal-dim w-20 shrink-0">
                      {formatDate(event.timestamp)}
                    </span>
                    <div>
                      <div className="text-[11px] text-terminal-text font-medium">{event.title}</div>
                      <div className="text-[10px] text-terminal-dim mt-0.5">{event.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          )}
        </div>

        {/* Right sidebar */}
        <div className="col-span-4 space-y-2">
          {/* Chains */}
          <Panel title="Where it's playing out">
            <div className="space-y-1.5">
              {relatedChains.map(chain => (
                <div
                  key={chain.name}
                  className="flex items-center justify-between py-1.5 px-1 rounded hover:bg-terminal-bg cursor-pointer"
                  onClick={() => { selectChain(chain.name); setActiveTab('chains'); }}
                >
                  <div>
                    <span className="text-[11px] text-terminal-text font-medium">{chain.name}</span>
                    <span className="text-[9px] text-terminal-dim ml-1">{chain.tokenSymbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-[10px] text-terminal-text">{formatLargeNumber(chain.tvl)}</div>
                    <div className={`font-display text-[9px] ${getChangeColor(chain.change_7d ?? 0)}`}>
                      {chain.change_7d !== undefined ? formatPercent(chain.change_7d) : '--'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Key protocols */}
          <Panel title="Key Protocols">
            <div className="space-y-1">
              {narrative.protocols.map(protocol => (
                <div key={protocol} className="flex items-center gap-2 py-1 text-[11px] text-terminal-text">
                  <div className="w-1.5 h-1.5 rounded-full bg-terminal-accent/50" />
                  {protocol}
                </div>
              ))}
            </div>
          </Panel>

          {/* Key tokens */}
          {narrative.tokens.length > 0 && (
            <Panel title="Tokens to Watch">
              <div className="flex flex-wrap gap-1.5">
                {narrative.tokens.map(token => (
                  <span key={token} className="font-display text-[10px] text-terminal-accent bg-terminal-accent/10 px-2 py-1 rounded border border-terminal-accent/20">
                    ${token}
                  </span>
                ))}
              </div>
            </Panel>
          )}

          {/* Lifecycle */}
          <Panel title="Narrative Lifecycle">
            <div className="space-y-1.5">
              {(['emerging', 'heating', 'peak', 'cooling', 'dead'] as NarrativeStatus[]).map(s => {
                const cfg = STATUS_CONFIG[s];
                const isActive = s === narrative.status;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 ${isActive ? '' : 'opacity-30'}`}
                      style={{ borderColor: cfg.color, backgroundColor: isActive ? cfg.color : 'transparent' }}
                    />
                    <span className={`font-display text-[9px] tracking-wider ${isActive ? 'text-terminal-text' : 'text-terminal-dim'}`}>
                      {cfg.label}
                    </span>
                    {isActive && (
                      <span className="text-[8px] text-terminal-dim font-display ml-auto">
                        {'\u25C0'} YOU ARE HERE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-2 border-t border-terminal-border text-[9px] text-terminal-dim">
              Started {formatDate(narrative.startDate)}
              {narrative.endDate && <> &bull; Ended {formatDate(narrative.endDate)}</>}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
