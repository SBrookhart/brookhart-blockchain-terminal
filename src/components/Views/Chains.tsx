import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { formatLargeNumber, formatPercent, getChangeColor } from '../../utils/format';
import { ArrowLeft } from 'lucide-react';

/**
 * Chains explorer view.
 * Shows a detailed chain table, and when a chain is selected, shows
 * its protocols, TVL breakdown, etc.
 */
export function Chains() {
  const { chains, protocols, selectedChain, selectChain } = useStore();

  const selectedChainData = chains.find(c => c.name === selectedChain);

  // Protocols filtered to selected chain
  const chainProtocols = useMemo(() => {
    if (!selectedChain) return [];
    return protocols
      .filter(p => p.chains.includes(selectedChain) || p.chain === selectedChain)
      .sort((a, b) => b.tvl - a.tvl);
  }, [protocols, selectedChain]);

  // Category breakdown for selected chain
  const categoryBreakdown = useMemo(() => {
    const cats = new Map<string, number>();
    for (const p of chainProtocols) {
      cats.set(p.category, (cats.get(p.category) || 0) + p.tvl);
    }
    return Array.from(cats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [chainProtocols]);

  if (selectedChain && selectedChainData) {
    return (
      <div className="p-2 h-full overflow-y-auto">
        {/* Back button + chain header */}
        <div className="flex items-center gap-3 mb-3 px-1">
          <button
            onClick={() => selectChain(null)}
            className="flex items-center gap-1 text-terminal-accent text-[10px] font-display hover:underline"
          >
            <ArrowLeft size={12} /> BACK
          </button>
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-terminal-text">
              {selectedChainData.name}
            </span>
            <span className="font-display text-[10px] text-terminal-dim bg-terminal-bg px-2 py-0.5 rounded border border-terminal-border">
              {selectedChainData.tokenSymbol}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2">
          {/* Key stats */}
          <div className="col-span-12 grid grid-cols-4 gap-2 mb-1">
            <StatCard label="TVL" value={formatLargeNumber(selectedChainData.tvl)} />
            <StatCard
              label="24H CHANGE"
              value={formatPercent(selectedChainData.change_1d ?? 0)}
              color={getChangeColor(selectedChainData.change_1d ?? 0)}
            />
            <StatCard
              label="7D CHANGE"
              value={formatPercent(selectedChainData.change_7d ?? 0)}
              color={getChangeColor(selectedChainData.change_7d ?? 0)}
            />
            <StatCard
              label="MARKET CAP"
              value={selectedChainData.mcap ? formatLargeNumber(selectedChainData.mcap) : '--'}
            />
          </div>

          {/* Category breakdown */}
          <div className="col-span-4">
            <Panel title={`Categories on ${selectedChain}`}>
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
                        <div
                          className="h-full bg-terminal-accent rounded-full"
                          style={{ width: `${Math.min(100, pct)}%`, opacity: 0.4 + (pct / 100) * 0.6 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          {/* Protocols table */}
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
                        {p.symbol && (
                          <span className="text-[9px] text-terminal-dim ml-1.5">{p.symbol}</span>
                        )}
                      </td>
                      <td className="py-1.5 text-[10px] text-terminal-dim">{p.category}</td>
                      <td className="py-1.5 text-right font-display text-[11px] text-terminal-text">
                        {formatLargeNumber(p.tvl)}
                      </td>
                      <td className={`py-1.5 text-right font-display text-[10px] ${getChangeColor(p.change_1d)}`}>
                        {formatPercent(p.change_1d)}
                      </td>
                      <td className={`py-1.5 text-right font-display text-[10px] ${getChangeColor(p.change_7d)}`}>
                        {formatPercent(p.change_7d)}
                      </td>
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

  // Chain list view (no chain selected)
  return (
    <div className="p-2 h-full overflow-y-auto">
      <Panel title="All Chains by TVL" className="h-full">
        <table className="w-full">
          <thead>
            <tr className="text-[9px] text-terminal-dim font-display tracking-wider">
              <th className="text-left pb-2 w-8">#</th>
              <th className="text-left pb-2">CHAIN</th>
              <th className="text-left pb-2">TOKEN</th>
              <th className="text-right pb-2">TVL</th>
              <th className="text-right pb-2 w-16">24H</th>
              <th className="text-right pb-2 w-16">7D</th>
              <th className="text-right pb-2">MCAP</th>
              <th className="text-right pb-2">TVL/MCAP</th>
            </tr>
          </thead>
          <tbody>
            {chains.map((chain, i) => {
              const tvlMcapRatio = chain.mcap ? ((chain.tvl / chain.mcap) * 100) : null;
              return (
                <tr
                  key={chain.name}
                  className="border-t border-terminal-border/30 hover:bg-terminal-bg/50 cursor-pointer transition-colors"
                  onClick={() => selectChain(chain.name)}
                >
                  <td className="py-2 font-display text-[10px] text-terminal-dim">{i + 1}</td>
                  <td className="py-2">
                    <span className="text-[11px] text-terminal-text font-medium">{chain.name}</span>
                  </td>
                  <td className="py-2 font-display text-[10px] text-terminal-dim">{chain.tokenSymbol}</td>
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
                  <td className="py-2 text-right font-display text-[10px] text-terminal-dim">
                    {tvlMcapRatio !== null ? `${tvlMcapRatio.toFixed(1)}%` : '--'}
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
