import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatMillions, formatWinRate, formatDate, shortenAddress } from '../../utils/format';

/**
 * Smart Money panel — whale tracking with trades and performance.
 */
export function SmartMoneyPanel() {
  const { features, whales, sectors, toggleFeature } = useStore();

  if (!features.showSmartMoney) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -320, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed left-0 top-12 bottom-0 w-80 z-40 bg-terminal-surface/95 backdrop-blur border-r border-terminal-border overflow-y-auto"
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-terminal-accent" />
              <span className="font-display text-sm font-bold text-terminal-accent tracking-wider">
                SMART MONEY
              </span>
            </div>
            <button
              onClick={() => toggleFeature('showSmartMoney')}
              className="text-terminal-dim hover:text-terminal-text"
            >
              <X size={14} />
            </button>
          </div>

          {/* Whale cards */}
          <div className="space-y-4">
            {whales.map((whale, i) => (
              <motion.div
                key={whale.address}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-terminal-bg rounded border border-terminal-border"
              >
                {/* Whale header */}
                <div className="p-3 border-b border-terminal-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-xs font-bold text-terminal-text">
                      {whale.label}
                    </span>
                    <span className="font-display text-[9px] text-terminal-dim">
                      {shortenAddress(whale.address)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="font-display text-[8px] text-terminal-dim tracking-widest">
                        NET WORTH
                      </div>
                      <div className="font-display text-xs text-terminal-text">
                        {formatMillions(whale.netWorth * 1_000_000)}
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-[8px] text-terminal-dim tracking-widest">
                        WIN RATE
                      </div>
                      <div className="font-display text-xs text-green-400">
                        {formatWinRate(whale.winRate)}
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-[8px] text-terminal-dim tracking-widest">
                        SECTORS
                      </div>
                      <div className="flex gap-1 mt-0.5">
                        {whale.activeSectors.slice(0, 3).map(sid => {
                          const s = sectors.find(sec => sec.id === sid);
                          return (
                            <div
                              key={sid}
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: s?.color || '#7a8496' }}
                              title={s?.shortName}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent trades */}
                <div className="p-2">
                  <div className="font-display text-[8px] text-terminal-dim tracking-widest mb-1.5 px-1">
                    RECENT TRADES
                  </div>
                  {whale.trades.slice(0, 3).map((trade, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 py-1.5 px-1 border-b border-terminal-border/50 last:border-0"
                    >
                      {/* Action icon */}
                      <div className={`flex-shrink-0 ${
                        trade.action === 'buy' ? 'text-green-400' :
                        trade.action === 'sell' ? 'text-red-400' :
                        'text-blue-400'
                      }`}>
                        {trade.action === 'buy' ? <TrendingUp size={10} /> :
                         trade.action === 'sell' ? <TrendingDown size={10} /> :
                         <ArrowRightLeft size={10} />}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-display text-[10px] text-terminal-text">
                            {trade.action.toUpperCase()} {trade.asset}
                          </span>
                        </div>
                        <span className="font-display text-[8px] text-terminal-dim">
                          {formatDate(trade.date)}
                        </span>
                      </div>

                      {/* Amount & PnL */}
                      <div className="text-right">
                        <div className="font-display text-[10px] text-terminal-text">
                          {formatMillions(trade.amount)}
                        </div>
                        {trade.pnl !== undefined && (
                          <div className={`font-display text-[9px] ${
                            trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {trade.pnl >= 0 ? '+' : ''}{formatMillions(trade.pnl)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
