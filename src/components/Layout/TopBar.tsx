import { useStore } from '../../store/useStore';
import { formatLargeNumber, formatPercent } from '../../utils/format';

/**
 * Top ticker bar — always visible.
 * Shows BTC, ETH prices, total market cap, BTC dominance.
 */
export function TopBar() {
  const { topTokens, globalData, isLoading } = useStore();

  const btc = topTokens.find(t => t.symbol === 'btc');
  const eth = topTokens.find(t => t.symbol === 'eth');
  const sol = topTokens.find(t => t.symbol === 'sol');

  return (
    <header className="flex items-center h-8 px-3 bg-terminal-bg border-b border-terminal-border text-[11px] font-display">
      {/* Logo */}
      <div className="flex items-center gap-1.5 mr-4 pr-4 border-r border-terminal-border">
        <div className="w-1.5 h-1.5 rounded-full bg-terminal-accent animate-pulse" />
        <span className="text-terminal-accent font-bold tracking-widest text-[10px]">
          BBT
        </span>
      </div>

      {/* Price tickers */}
      <div className="flex items-center gap-4 mr-4 pr-4 border-r border-terminal-border">
        {btc && <Ticker label="BTC" price={btc.current_price} change={btc.price_change_percentage_24h} />}
        {eth && <Ticker label="ETH" price={eth.current_price} change={eth.price_change_percentage_24h} />}
        {sol && <Ticker label="SOL" price={sol.current_price} change={sol.price_change_percentage_24h} />}
      </div>

      {/* Global stats */}
      <div className="flex items-center gap-4 mr-4">
        <Stat label="MCAP" value={formatLargeNumber(globalData.total_market_cap)} />
        <Stat label="24H VOL" value={formatLargeNumber(globalData.total_volume)} />
        <Stat label="BTC.D" value={`${globalData.btc_dominance.toFixed(1)}%`} />
      </div>

      {/* Status */}
      <div className="ml-auto flex items-center gap-1.5">
        {isLoading ? (
          <span className="text-yellow-400 text-[9px] tracking-wider">LOADING...</span>
        ) : (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-terminal-dim text-[9px] tracking-wider">LIVE</span>
          </>
        )}
      </div>
    </header>
  );
}

function Ticker({ label, price, change }: { label: string; price: number; change: number }) {
  const color = change >= 0 ? 'text-green-400' : 'text-red-400';
  const arrow = change >= 0 ? '\u25B2' : '\u25BC';
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-terminal-dim">{label}</span>
      <span className="text-terminal-text">${price.toLocaleString(undefined, { maximumFractionDigits: price > 100 ? 0 : 2 })}</span>
      <span className={color}>
        {arrow}{formatPercent(Math.abs(change))}
      </span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-terminal-dim text-[9px]">{label}</span>
      <span className="text-terminal-text">{value}</span>
    </div>
  );
}
