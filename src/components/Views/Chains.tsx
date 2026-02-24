import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { formatLargeNumber, formatPercent, getChangeColor } from '../../utils/format';
import { ArrowLeft } from 'lucide-react';
import type { NarrativeStatus } from '../../types';

const STATUS_COLORS: Record<NarrativeStatus, string> = {
  emerging: '#00D4FF',
  heating: '#00FF88',
  peak: '#FFD700',
  cooling: '#FF8C42',
  dead: '#FF4444',
};

/**
 * Chain Intelligence view.
 * "Which chain is winning, and which narratives are driving it?"
 *
 * Chain list shows narratives each chain participates in.
 * Chain detail shows protocol breakdown + narrative overlay.
 */
export function Chains() {
  const { chains, protocols, narratives, selectedChain, selectChain, selectNarrative, setActiveTab } = useStore();

  const selectedChainData = chains.find(c => c.name === selectedChain);

  // Narratives per chain (for list view)
  const chainNarratives = useMemo(() => {
    const map = new Map<string, typeof narratives>();
    for (const chain of chains) {
      map.set(chain.name, narratives.filter(n => n.status !== 'dead' && n.chains.includes(chain.name)));
    }
    return map;
  }, [chains, narratives]);

  // Protocols filtered to selected chain
  const chainProtocols = useMemo(() => {
    if (!selectedChain) return [];
    return protocols
      .filter(p => p.chains.includes(selectedChain) || p.chain === selectedChain)
      .sort((a, b) => b.tvl - a.tvl);
  }, [protocols, selectedChain]);

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const cats = new Map<string, number>();
    for (const p of chainProtocols) {
      cats.set(p.category, (cats.get(p.category) || 0) + p.tvl);
    }
    return Array.from(cats.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [chainProtocols]);

  // Narratives for selected chain
  const selectedNarratives = useMemo(() => {
    if (!selectedChain) return [];
    return narratives.filter(n => n.chains.includes(selectedChain));
  }, [narratives, selectedChain]);

  if (selectedChain && selectedChainData) {
    return (
      <div className="p-2 h-full overflow-y-auto">
        <div className="flex items-center gap-3 mb-3 px-1">
          <button
            onClick={() => selectChain(null)}
            className="flex items-center gap-1 text-terminal-accent text-[10px] font-display hover:underline"
          >
            <ArrowLeft size={12} /> ALL CHAINS
          </button>
          <span className="font-display text-lg font-bold text-terminal-text">
            {selectedChainData.name}
          </span>
          <span className="font-display text-[10px] text-terminal-dim bg-terminal-bg px-2 py-0.5 rounded border border-terminal-border">
            {selectedChainData.tokenSymbol}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-2">
          {/* Stats row */}
          <div className="col-span-12 grid grid-cols-5 gap-2 mb-1">
            <StatCard label="TVL" value={formatLargeNumber(selectedChainData.tvl)} />
            <StatCard label="24H" value={formatPercent(selectedChainData.change_1d ?? 0)} color={getChangeColor(selectedChainData.change_1d ?? 0)} />
            <StatCard label="7D" value={formatPercent(selectedChainData.change_7d ?? 0)} color={getChangeColor(selectedChainData.change_7d ?? 0)} />
            <StatCard label="MCAP" value={selectedChainData.mcap ? formatLargeNumber(selectedChainData.mcap) : '--'} />
            <StatCard label="TVL/MCAP" value={selectedChainData.mcap ? `${((selectedChainData.tvl / selectedChainData.mcap) * 100).toFixed(1)}%` : '--'} />
          </div>

          {/* Left: narratives + categories */}
          <div className="col-span-4 space-y-2">
            {/* Narratives driving this chain */}
            <Panel title="Active Narratives">
              {selectedNarratives.length > 0 ? (
                <div className="space-y-2">
                  {selectedNarratives.map(n => (
                    <div
                      key={n.id}
                      className="bg-terminal-bg rounded border border-terminal-border p-2 hover:border-terminal-accent/40 cursor-pointer transition-colors"
                      onClick={() => { selectNarrative(n.id); setActiveTab('narratives'); }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[n.status] }} />
                        <span className="text-[11px] text-terminal-text font-medium">{n.name}</span>
                        <span className={`ml-auto font-display text-[9px] ${getChangeColor(n.tvlChange7d)}`}>
                          {formatPercent(n.tvlChange7d)}
                        </span>
                      </div>
                      <p className="text-[9px] text-terminal-dim leading-relaxed line-clamp-2">{n.thesis}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[10px] text-terminal-dim text-center py-4">
                  No major narratives tracked for this chain
                </div>
              )}
            </Panel>

            {/* Category breakdown */}
            <Panel title="DeFi Categories">
              <div className="space-y-2">
                {categoryBreakdown.map(([cat, tvl]) => {
                  const pct = (tvl / selectedChainData.tvl) * 100;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-terminal-text">{cat}</span>
                        <span className="font-display text-[10px] text-terminal-dim">{formatLargeNumber(tvl)}</span>
                      </div>
                      <div className="h-1 bg-terminal-border rounded-full overflow-hidden">
                        <div className="h-full bg-terminal-accent rounded-full" style={{ width: `${Math.min(100, pct)}%`, opacity: 0.4 + (pct / 100) * 0.6 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          {/* Right: protocol table */}
          <div className="col-span-8">
            <Panel title={`Top Protocols on ${selectedChain}`}>
              <table className="w-full">
                <thead>
                  <tr className="text-[9px] text-terminal-dim font-display tracking-wider">
                    <th className="text-left pb-2 w-6">#</th>
                    <th className="text-left pb-2">PROTOCOL</th>
                    <th className="text-left pb-2">CATEGORY</th>
                    <th className="text-right pb-2">TVL</th>
                    <th className="text-right pb-2 w-16">24H</th>
                    <th className="text-right pb-2 w-16">7D</th>
                  </tr>
                </thead>
                <tbody>
                  {chainProtocols.slice(0, 20).map((p, i) => (
                    <tr key={p.id} className="border-t border-terminal-border/30 hover:bg-terminal-bg/50">
                      <td className="py-1.5 font-display text-[10px] text-terminal-dim">{i + 1}</td>
                      <td className="py-1.5">
                        <span className="text-[11px] text-terminal-text font-medium">{p.name}</span>
                        {p.symbol && <span className="text-[9px] text-terminal-dim ml-1.5">{p.symbol}</span>}
                      </td>
                      <td className="py-1.5 text-[10px] text-terminal-dim">{p.category}</td>
                      <td className="py-1.5 text-right font-display text-[11px] text-terminal-text">{formatLargeNumber(p.tvl)}</td>
                      <td className={`py-1.5 text-right font-display text-[10px] ${getChangeColor(p.change_1d)}`}>{formatPercent(p.change_1d)}</td>
                      <td className={`py-1.5 text-right font-display text-[10px] ${getChangeColor(p.change_7d)}`}>{formatPercent(p.change_7d)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
          </div>
        </div>
      </div>
    );
  }

  // Chain list view with narrative overlay
  return (
    <div className="p-2 h-full overflow-y-auto">
      <Panel title="Chain Intelligence — click any chain to drill in">
        <table className="w-full">
          <thead>
            <tr className="text-[9px] text-terminal-dim font-display tracking-wider">
              <th className="text-left pb-2 w-8">#</th>
              <th className="text-left pb-2">CHAIN</th>
              <th className="text-right pb-2">TVL</th>
              <th className="text-right pb-2 w-16">24H</th>
              <th className="text-right pb-2 w-16">7D</th>
              <th className="text-right pb-2">MCAP</th>
              <th className="text-left pb-2 pl-3">NARRATIVES</th>
            </tr>
          </thead>
          <tbody>
            {chains.map((chain, i) => {
              const narrs = chainNarratives.get(chain.name) || [];
              return (
                <tr
                  key={chain.name}
                  className="border-t border-terminal-border/30 hover:bg-terminal-bg/50 cursor-pointer transition-colors"
                  onClick={() => selectChain(chain.name)}
                >
                  <td className="py-2 font-display text-[10px] text-terminal-dim">{i + 1}</td>
                  <td className="py-2">
                    <span className="text-[11px] text-terminal-text font-medium">{chain.name}</span>
                    <span className="text-[9px] text-terminal-dim ml-1.5">{chain.tokenSymbol}</span>
                  </td>
                  <td className="py-2 text-right font-display text-[11px] text-terminal-text">
                    {formatLargeNumber(chain.tvl)}
                  </td>
                  <td className={`py-2 text-right font-display text-[10px] ${getChangeColor(chain.change_1d ?? 0)}`}>
                    {chain.change_1d !== undefined ? formatPercent(chain.change_1d) : '--'}
                  </td>
                  <td className={`py-2 text-right font-display text-[10px] ${getChangeColor(chain.change_7d ?? 0)}`}>
                    {chain.change_7d !== undefined ? formatPercent(chain.change_7d) : '--'}
                  </td>
                  <td className="py-2 text-right font-display text-[10px] text-terminal-dim">
                    {chain.mcap ? formatLargeNumber(chain.mcap) : '--'}
                  </td>
                  <td className="py-2 pl-3">
                    <div className="flex flex-wrap gap-1">
                      {narrs.map(n => (
                        <span
                          key={n.id}
                          className="text-[8px] font-display tracking-wider px-1.5 py-0.5 rounded"
                          style={{ color: STATUS_COLORS[n.status], backgroundColor: `${STATUS_COLORS[n.status]}15` }}
                        >
                          {n.name}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-terminal-surface border border-terminal-border rounded p-3">
      <div className="font-display text-[9px] text-terminal-dim tracking-widest mb-1">{label}</div>
      <div className={`font-display text-lg font-bold ${color || 'text-terminal-text'}`}>{value}</div>
    </div>
  );
}
