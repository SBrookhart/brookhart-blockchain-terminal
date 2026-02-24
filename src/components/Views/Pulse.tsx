import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { Sparkline } from '../Widgets/Sparkline';
import { formatLargeNumber, formatPercent, getChangeColor } from '../../utils/format';
import type { NarrativeStatus } from '../../types';

const STATUS_CONFIG: Record<NarrativeStatus, { label: string; color: string; bg: string }> = {
  emerging: { label: 'EMERGING', color: '#00D4FF', bg: '#00D4FF15' },
  heating: { label: 'HEATING UP', color: '#00FF88', bg: '#00FF8815' },
  peak: { label: 'AT PEAK', color: '#FFD700', bg: '#FFD70015' },
  cooling: { label: 'COOLING', color: '#FF8C42', bg: '#FF8C4215' },
  dead: { label: 'DEAD', color: '#FF4444', bg: '#FF444415' },
};

/**
 * Pulse — the home dashboard.
 * "What narrative is driving capital right now?"
 *
 * Shows active narratives ranked by momentum, top chains benefiting,
 * and market context.
 */
export function Pulse() {
  const {
    narratives, topTokens, chains, events,
    setActiveTab, selectNarrative, selectChain,
  } = useStore();

  const activeNarratives = useMemo(
    () => narratives.filter(n => n.status !== 'dead').sort((a, b) => b.socialScore - a.socialScore),
    [narratives]
  );

  // Chains sorted by 7d change (momentum)
  const hotChains = useMemo(
    () => [...chains].sort((a, b) => (b.change_7d ?? 0) - (a.change_7d ?? 0)).slice(0, 8),
    [chains]
  );

  // Recent events
  const recentEvents = useMemo(
    () => [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5),
    [events]
  );

  return (
    <div className="grid grid-cols-12 gap-2 p-2 h-full overflow-y-auto">
      {/* Left: Narrative rankings */}
      <div className="col-span-7 space-y-2">
        <Panel title="Active Narratives — ranked by momentum">
          <div className="space-y-1">
            {activeNarratives.map((narrative, i) => {
              const status = STATUS_CONFIG[narrative.status];
              return (
                <div
                  key={narrative.id}
                  className="flex items-start gap-3 p-2.5 rounded border border-transparent hover:border-terminal-border hover:bg-terminal-bg cursor-pointer transition-all"
                  onClick={() => { selectNarrative(narrative.id); setActiveTab('narratives'); }}
                >
                  {/* Rank */}
                  <div className="font-display text-lg text-terminal-dim w-6 text-right pt-0.5">
                    {i + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] text-terminal-text font-bold">{narrative.name}</span>
                      <span
                        className="font-display text-[8px] tracking-wider px-1.5 py-0.5 rounded"
                        style={{ color: status.color, backgroundColor: status.bg }}
                      >
                        {status.label}
                      </span>
                      <span className={`ml-auto font-display text-[11px] ${getChangeColor(narrative.tvlChange7d)}`}>
                        {formatPercent(narrative.tvlChange7d)} 7d
                      </span>
                    </div>
                    <p className="text-[10px] text-terminal-dim leading-relaxed mb-1.5 line-clamp-2">
                      {narrative.thesis}
                    </p>
                    <div className="flex items-center gap-3 text-[9px] font-display">
                      <span className="text-terminal-dim">
                        TVL <span className="text-terminal-text">{formatLargeNumber(narrative.tvlTotal)}</span>
                      </span>
                      <span className="text-terminal-dim">
                        BUZZ <span className="text-terminal-accent">{narrative.socialScore}/100</span>
                      </span>
                      <span className="text-terminal-dim">
                        RISK{' '}
                        <span className={
                          narrative.riskLevel === 'high' ? 'text-red-400' :
                          narrative.riskLevel === 'medium' ? 'text-yellow-400' : 'text-green-400'
                        }>
                          {narrative.riskLevel.toUpperCase()}
                        </span>
                      </span>
                      <span className="text-terminal-dim">
                        {narrative.chains.slice(0, 3).join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Social score bar */}
                  <div className="w-16 pt-1.5">
                    <div className="h-1.5 bg-terminal-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${narrative.socialScore}%`,
                          backgroundColor: status.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      {/* Right column */}
      <div className="col-span-5 space-y-2">
        {/* Market prices */}
        <Panel title="Market">
          <div className="space-y-0">
            {topTokens.slice(0, 6).map(token => (
              <div key={token.id} className="flex items-center gap-2 py-1.5 border-b border-terminal-border/30 last:border-0">
                <span className="text-[11px] text-terminal-text font-medium w-10">{token.symbol.toUpperCase()}</span>
                <span className="text-[11px] text-terminal-text font-display">
                  ${token.current_price.toLocaleString(undefined, { maximumFractionDigits: token.current_price > 100 ? 0 : 2 })}
                </span>
                {token.sparkline_in_7d && (
                  <Sparkline
                    data={token.sparkline_in_7d.price}
                    width={48}
                    height={14}
                    color={token.price_change_percentage_24h >= 0 ? '#00ff88' : '#ff4444'}
                  />
                )}
                <span className={`ml-auto font-display text-[10px] ${getChangeColor(token.price_change_percentage_24h)}`}>
                  {formatPercent(token.price_change_percentage_24h)}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Hottest chains */}
        <Panel
          title="Hottest Chains (7d)"
          action={
            <button onClick={() => setActiveTab('chains')} className="text-[9px] text-terminal-accent hover:underline">
              VIEW ALL
            </button>
          }
        >
          <div className="space-y-0">
            {hotChains.map(chain => (
              <div
                key={chain.name}
                className="flex items-center justify-between py-1.5 border-b border-terminal-border/30 last:border-0 hover:bg-terminal-bg cursor-pointer rounded px-1"
                onClick={() => { selectChain(chain.name); setActiveTab('chains'); }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-terminal-text font-medium">{chain.name}</span>
                  <span className="text-[9px] text-terminal-dim font-display">{formatLargeNumber(chain.tvl)}</span>
                </div>
                <span className={`font-display text-[10px] ${getChangeColor(chain.change_7d ?? 0)}`}>
                  {chain.change_7d !== undefined ? formatPercent(chain.change_7d) : '--'}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Recent events */}
        <Panel
          title="Recent Catalysts"
          action={
            <button onClick={() => setActiveTab('timeline')} className="text-[9px] text-terminal-accent hover:underline">
              TIMELINE
            </button>
          }
        >
          <div className="space-y-1.5">
            {recentEvents.map(event => (
              <div key={event.id} className="py-1 border-b border-terminal-border/20 last:border-0">
                <div className="text-[11px] text-terminal-text leading-tight">{event.title}</div>
                <div className="text-[9px] text-terminal-dim mt-0.5">{event.timestamp}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
