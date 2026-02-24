import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Layers } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatBillions, formatPercent, getChangeColor } from '../../utils/format';

/**
 * Detail panel shown when a sector is selected.
 * Bloomberg-style data card with TVL, protocols, flows.
 */
export function SectorPanel() {
  const { sectors, flows, selectedSector, selectSector } = useStore();

  const sector = sectors.find(s => s.id === selectedSector);

  return (
    <AnimatePresence>
      {sector && (
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
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: sector.color }}
                />
                <span className="font-display text-sm font-bold" style={{ color: sector.color }}>
                  {sector.name}
                </span>
              </div>
              <button
                onClick={() => selectSector(null)}
                className="text-terminal-dim hover:text-terminal-text"
              >
                <X size={14} />
              </button>
            </div>

            {/* TVL Card */}
            <div className="bg-terminal-bg rounded border border-terminal-border p-3 mb-3">
              <div className="font-display text-[10px] text-terminal-dim tracking-widest mb-1">
                TOTAL VALUE LOCKED
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-terminal-text">
                  {formatBillions(sector.tvl)}
                </span>
                <span className={`font-display text-sm ${getChangeColor(sector.change24h)}`}>
                  {sector.change24h > 0 ? (
                    <TrendingUp size={14} className="inline mr-1" />
                  ) : (
                    <TrendingDown size={14} className="inline mr-1" />
                  )}
                  {formatPercent(sector.change24h)}
                </span>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <DataCell label="CHAIN" value={sector.chain} />
              <DataCell label="CATEGORY" value={sector.category} />
              <DataCell label="RING" value={`${sector.ring === 0 ? 'Core' : sector.ring === 1 ? 'Mid' : 'Outer'}`} />
              <DataCell label="PROTOCOLS" value={`${sector.protocols.length}`} />
            </div>

            {/* Top Protocols */}
            <div className="mb-4">
              <div className="font-display text-[10px] text-terminal-dim tracking-widest mb-2 flex items-center gap-1">
                <Layers size={10} />
                TOP PROTOCOLS
              </div>
              <div className="space-y-1">
                {sector.protocols.map((protocol, i) => (
                  <div
                    key={protocol}
                    className="flex items-center gap-2 py-1 px-2 bg-terminal-bg rounded border border-terminal-border"
                  >
                    <span className="font-display text-[10px] text-terminal-dim w-4">
                      {i + 1}.
                    </span>
                    <span className="text-xs text-terminal-text">{protocol}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Capital Flows */}
            <div>
              <div className="font-display text-[10px] text-terminal-dim tracking-widest mb-2">
                CAPITAL FLOWS
              </div>
              <div className="space-y-1.5">
                {flows
                  .filter(f => f.from === sector.id || f.to === sector.id)
                  .map(flow => {
                    const isInflow = flow.to === sector.id;
                    const otherSector = sectors.find(
                      s => s.id === (isInflow ? flow.from : flow.to)
                    );
                    return (
                      <div
                        key={flow.id}
                        className="flex items-center justify-between py-1.5 px-2 bg-terminal-bg rounded border border-terminal-border"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-display text-[10px] ${
                              isInflow ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            {isInflow ? '← IN' : '→ OUT'}
                          </span>
                          <span className="text-xs text-terminal-text">
                            {otherSector?.shortName || '?'}
                          </span>
                        </div>
                        <span className="font-display text-xs text-terminal-text">
                          {formatBillions(flow.amount)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DataCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-terminal-bg rounded border border-terminal-border p-2">
      <div className="font-display text-[9px] text-terminal-dim tracking-widest">{label}</div>
      <div className="font-display text-xs text-terminal-text mt-0.5">{value}</div>
    </div>
  );
}
