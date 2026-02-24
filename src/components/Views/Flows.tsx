import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { formatLargeNumber } from '../../utils/format';

// Chain colors for the flow visualization
const CHAIN_COLORS: Record<string, string> = {
  'eth-defi': '#00D4FF',
  'eth-nfts': '#FF6B9D',
  'sol-ecosystem': '#DC1FFF',
  'sol-memes': '#FFD700',
  'arbitrum': '#28A0F0',
  'base': '#0052FF',
  'ai-tokens': '#00FFB3',
  'rwa': '#FF8C42',
  'btc-defi': '#F7931A',
};

const SECTOR_LABELS: Record<string, string> = {
  'eth-defi': 'ETH DeFi',
  'eth-nfts': 'ETH NFTs',
  'sol-ecosystem': 'Solana',
  'sol-memes': 'SOL Memes',
  'arbitrum': 'Arbitrum',
  'base': 'Base',
  'ai-tokens': 'AI Tokens',
  'rwa': 'RWA',
  'btc-defi': 'BTC DeFi',
};

/**
 * Capital Flows view — shows where money is moving between sectors.
 * Uses a simple but clear table + visual bar representation.
 */
export function Flows() {
  const { flows } = useStore();

  const sortedFlows = useMemo(
    () => [...flows].sort((a, b) => b.amount - a.amount),
    [flows]
  );

  const maxAmount = sortedFlows[0]?.amount ?? 1;

  // Build net flow per sector
  const netFlows = useMemo(() => {
    const map = new Map<string, number>();
    for (const flow of flows) {
      map.set(flow.from, (map.get(flow.from) || 0) - flow.amount);
      map.set(flow.to, (map.get(flow.to) || 0) + flow.amount);
    }
    return Array.from(map.entries())
      .map(([id, net]) => ({ id, label: SECTOR_LABELS[id] || id, net, color: CHAIN_COLORS[id] || '#7a8496' }))
      .sort((a, b) => b.net - a.net);
  }, [flows]);

  const maxNet = Math.max(...netFlows.map(f => Math.abs(f.net)));

  return (
    <div className="grid grid-cols-12 gap-2 p-2 h-full overflow-y-auto">
      {/* Flow table */}
      <div className="col-span-7">
        <Panel title="Capital Flows (Current)">
          <table className="w-full">
            <thead>
              <tr className="text-[9px] text-terminal-dim font-display tracking-wider">
                <th className="text-left pb-2">FROM</th>
                <th className="text-center pb-2 w-8"></th>
                <th className="text-left pb-2">TO</th>
                <th className="text-right pb-2">AMOUNT</th>
                <th className="text-left pb-2 pl-3 w-40">MAGNITUDE</th>
              </tr>
            </thead>
            <tbody>
              {sortedFlows.map(flow => {
                const fromColor = CHAIN_COLORS[flow.from] || '#7a8496';
                const toColor = CHAIN_COLORS[flow.to] || '#7a8496';
                const barWidth = (flow.amount / maxAmount) * 100;

                return (
                  <tr key={flow.id} className="border-t border-terminal-border/30 hover:bg-terminal-bg/50">
                    <td className="py-2">
                      <span className="text-[11px] font-medium" style={{ color: fromColor }}>
                        {SECTOR_LABELS[flow.from] || flow.from}
                      </span>
                    </td>
                    <td className="py-2 text-center text-terminal-dim text-[10px]">{'\u2192'}</td>
                    <td className="py-2">
                      <span className="text-[11px] font-medium" style={{ color: toColor }}>
                        {SECTOR_LABELS[flow.to] || flow.to}
                      </span>
                    </td>
                    <td className="py-2 text-right font-display text-[11px] text-terminal-text">
                      {formatLargeNumber(flow.amount * 1_000_000_000)}
                    </td>
                    <td className="py-2 pl-3">
                      <div className="h-2 bg-terminal-border/30 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: toColor,
                            opacity: 0.6,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {flows.length > 0 && (
            <div className="mt-3 pt-2 border-t border-terminal-border text-center">
              <span className="font-display text-[9px] text-terminal-dim tracking-wider">
                FLOWS ARE CURATED ESTIMATES BASED ON ON-CHAIN DATA
              </span>
            </div>
          )}
        </Panel>
      </div>

      {/* Net flow by sector */}
      <div className="col-span-5">
        <Panel title="Net Flow by Sector">
          <div className="space-y-3">
            {netFlows.map(({ id, label, net, color }) => {
              const barWidth = (Math.abs(net) / maxNet) * 100;
              const isPositive = net >= 0;

              return (
                <div key={id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium" style={{ color }}>{label}</span>
                    <span className={`font-display text-[10px] ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{formatLargeNumber(net * 1_000_000_000)}
                    </span>
                  </div>
                  <div className="flex items-center h-2">
                    {/* Negative bar (left) */}
                    <div className="flex-1 flex justify-end">
                      {!isPositive && (
                        <div
                          className="h-full rounded-l-full bg-red-400"
                          style={{ width: `${barWidth}%`, opacity: 0.5 }}
                        />
                      )}
                    </div>
                    {/* Center line */}
                    <div className="w-px h-3 bg-terminal-dim mx-0.5" />
                    {/* Positive bar (right) */}
                    <div className="flex-1">
                      {isPositive && (
                        <div
                          className="h-full rounded-r-full bg-green-400"
                          style={{ width: `${barWidth}%`, opacity: 0.5 }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-terminal-border">
            <div className="flex items-center justify-between text-[9px] font-display text-terminal-dim">
              <span>{'\u2190'} NET OUTFLOW</span>
              <span>NET INFLOW {'\u2192'}</span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
