import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { Sparkline } from '../Widgets/Sparkline';
import { formatLargeNumber, formatPercent, getChangeColor, formatDate } from '../../utils/format';
import type { EventType } from '../../types';

const EVENT_ICONS: Record<EventType, string> = {
  cultural: '\u{1F3AD}',
  tweet: '\u{1F426}',
  tech: '\u26A1',
  macro: '\u{1F4CA}',
  hack: '\u{1F480}',
  launch: '\u{1F680}',
};

/**
 * Overview / Dashboard view — the home screen.
 * Shows market overview, chain leaderboard, top movers, flows, recent events.
 */
export function Overview() {
  const { topTokens, chains, flows, events, setActiveTab, selectChain } = useStore();

  // Top movers by 24h change
  const topMovers = [...chains]
    .filter(c => c.change_1d !== undefined)
    .sort((a, b) => Math.abs(b.change_1d ?? 0) - Math.abs(a.change_1d ?? 0))
    .slice(0, 6);

  // Top flows by amount
  const topFlows = [...flows].sort((a, b) => b.amount - a.amount).slice(0, 6);

  // Recent events
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  return (
    <div className="grid grid-cols-12 gap-2 p-2 h-full overflow-y-auto">
      {/* Left column: Top tokens + movers */}
      <div className="col-span-3 space-y-2">
        {/* Top tokens table */}
        <Panel title="Market Prices">
          <div className="space-y-0">
            {topTokens.slice(0, 8).map((token, i) => (
              <div key={token.id} className="flex items-center gap-2 py-1.5 border-b border-terminal-border/50 last:border-0">
                <span className="font-display text-[9px] text-terminal-dim w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-terminal-text font-medium">{token.symbol.toUpperCase()}</span>
                    <span className="text-[9px] text-terminal-dim truncate">{token.name}</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  {token.sparkline_in_7d && (
                    <Sparkline
                      data={token.sparkline_in_7d.price}
                      width={48}
                      height={16}
                      color={token.price_change_percentage_24h >= 0 ? '#00ff88' : '#ff4444'}
                    />
                  )}
                  <div>
                    <div className="font-display text-[11px] text-terminal-text">
                      ${token.current_price.toLocaleString(undefined, { maximumFractionDigits: token.current_price > 100 ? 0 : 2 })}
                    </div>
                    <div className={`font-display text-[9px] ${getChangeColor(token.price_change_percentage_24h)}`}>
                      {formatPercent(token.price_change_percentage_24h)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Top movers */}
        <Panel title="Top Movers (24h)">
          <div className="space-y-1">
            {topMovers.map(chain => (
              <div
                key={chain.name}
                className="flex items-center justify-between py-1 px-1 rounded hover:bg-terminal-bg cursor-pointer"
                onClick={() => { selectChain(chain.name); setActiveTab('chains'); }}
              >
                <span className="text-[11px] text-terminal-text">{chain.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-display text-[10px] text-terminal-dim">
                    {formatLargeNumber(chain.tvl)}
                  </span>
                  <span className={`font-display text-[10px] w-14 text-right ${getChangeColor(chain.change_1d ?? 0)}`}>
                    {formatPercent(chain.change_1d ?? 0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Center column: Chain leaderboard */}
      <div className="col-span-6">
        <Panel title="Chain Leaderboard" className="h-full">
          <table className="w-full">
            <thead>
              <tr className="text-[9px] text-terminal-dim font-display tracking-wider">
                <th className="text-left pb-2 w-8">#</th>
                <th className="text-left pb-2">CHAIN</th>
                <th className="text-right pb-2">TVL</th>
                <th className="text-right pb-2 w-16">24H</th>
                <th className="text-right pb-2 w-16">7D</th>
                <th className="text-right pb-2">MCAP</th>
              </tr>
            </thead>
            <tbody>
              {chains.slice(0, 15).map((chain, i) => (
                <tr
                  key={chain.name}
                  className="border-t border-terminal-border/30 hover:bg-terminal-bg/50 cursor-pointer transition-colors"
                  onClick={() => { selectChain(chain.name); setActiveTab('chains'); }}
                >
                  <td className="py-1.5 font-display text-[10px] text-terminal-dim">{i + 1}</td>
                  <td className="py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-terminal-text font-medium">{chain.name}</span>
                      <span className="text-[9px] text-terminal-dim">{chain.tokenSymbol}</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-right font-display text-[11px] text-terminal-text">
                    {formatLargeNumber(chain.tvl)}
                  </td>
                  <td className={`py-1.5 text-right font-display text-[10px] ${getChangeColor(chain.change_1d ?? 0)}`}>
                    {chain.change_1d !== undefined ? formatPercent(chain.change_1d) : '--'}
                  </td>
                  <td className={`py-1.5 text-right font-display text-[10px] ${getChangeColor(chain.change_7d ?? 0)}`}>
                    {chain.change_7d !== undefined ? formatPercent(chain.change_7d) : '--'}
                  </td>
                  <td className="py-1.5 text-right font-display text-[10px] text-terminal-dim">
                    {chain.mcap ? formatLargeNumber(chain.mcap) : '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      {/* Right column: Flows + Events */}
      <div className="col-span-3 space-y-2">
        {/* Capital flows */}
        <Panel
          title="Capital Flows"
          action={
            <button
              onClick={() => setActiveTab('flows')}
              className="text-[9px] text-terminal-accent hover:underline"
            >
              VIEW ALL
            </button>
          }
        >
          <div className="space-y-1.5">
            {topFlows.map(flow => (
              <div key={flow.id} className="flex items-center gap-1.5 py-1">
                <span className="text-[10px] text-terminal-text">{flow.from}</span>
                <span className="text-terminal-accent text-[10px]">{'\u2192'}</span>
                <span className="text-[10px] text-terminal-text">{flow.to}</span>
                <span className="ml-auto font-display text-[10px] text-terminal-accent">
                  {formatLargeNumber(flow.amount * 1_000_000_000)}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Recent events */}
        <Panel
          title="Recent Events"
          action={
            <button
              onClick={() => setActiveTab('timeline')}
              className="text-[9px] text-terminal-accent hover:underline"
            >
              VIEW ALL
            </button>
          }
        >
          <div className="space-y-2">
            {recentEvents.map(event => (
              <div key={event.id} className="py-1.5 border-b border-terminal-border/30 last:border-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px]">{EVENT_ICONS[event.type]}</span>
                  <span className="font-display text-[8px] text-terminal-dim tracking-wider">
                    {event.type.toUpperCase()} &bull; {formatDate(event.timestamp)}
                  </span>
                </div>
                <div className="text-[11px] text-terminal-text leading-tight">
                  {event.title}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
