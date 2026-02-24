import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatBillions } from '../../utils/format';

/** Mock predictions for capital flow forecasts */
const PREDICTIONS = [
  {
    id: 'pred-1',
    title: 'AI Token Surge',
    description: 'Capital expected to flow from DeFi blue chips into AI narrative tokens as autonomous agent adoption accelerates.',
    from: 'eth-defi',
    to: 'ai-tokens',
    amount: 3.5,
    confidence: 0.72,
    timeframe: '90 days',
  },
  {
    id: 'pred-2',
    title: 'Base L2 Growth',
    description: 'Coinbase distribution advantage continues to drive capital onto Base. Expected to capture significant ETH mainnet DeFi activity.',
    from: 'eth-defi',
    to: 'base',
    amount: 2.1,
    confidence: 0.68,
    timeframe: '60 days',
  },
  {
    id: 'pred-3',
    title: 'RWA Expansion',
    description: 'Tokenized treasury and private credit products continue institutional adoption trajectory.',
    from: 'rwa',
    to: 'eth-defi',
    amount: 4.0,
    confidence: 0.81,
    timeframe: '180 days',
  },
  {
    id: 'pred-4',
    title: 'Memecoin Rotation',
    description: 'Solana memecoin capital expected to partially rotate into utility tokens as narrative fatigue sets in.',
    from: 'sol-memes',
    to: 'sol-ecosystem',
    amount: 1.8,
    confidence: 0.55,
    timeframe: '30 days',
  },
];

/**
 * Predictions panel — ML-powered (mocked) capital flow forecasts.
 */
export function PredictionsPanel() {
  const { features, sectors, toggleFeature } = useStore();

  if (!features.showPredictions) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-12 left-1/2 -translate-x-1/2 z-50 w-[520px] max-w-[calc(100vw-2rem)] bg-terminal-surface/95 backdrop-blur border border-terminal-border rounded-lg overflow-hidden"
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-purple-400" />
              <span className="font-display text-sm font-bold text-purple-400 tracking-wider">
                FLOW PREDICTIONS
              </span>
              <span className="font-display text-[9px] text-terminal-dim bg-terminal-bg px-1.5 py-0.5 rounded">
                EXPERIMENTAL
              </span>
            </div>
            <button
              onClick={() => toggleFeature('showPredictions')}
              className="text-terminal-dim hover:text-terminal-text"
            >
              <X size={14} />
            </button>
          </div>

          {/* Predictions grid */}
          <div className="grid grid-cols-2 gap-3">
            {PREDICTIONS.map((pred, i) => {
              const fromSector = sectors.find(s => s.id === pred.from);
              const toSector = sectors.find(s => s.id === pred.to);

              return (
                <motion.div
                  key={pred.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-terminal-bg rounded border border-terminal-border p-3"
                >
                  <div className="font-display text-xs font-bold text-terminal-text mb-1">
                    {pred.title}
                  </div>

                  {/* Flow direction */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px]" style={{ color: fromSector?.color }}>
                      {fromSector?.shortName}
                    </span>
                    <ArrowRight size={10} className="text-terminal-dim" />
                    <span className="text-[10px]" style={{ color: toSector?.color }}>
                      {toSector?.shortName}
                    </span>
                    <span className="ml-auto font-display text-[10px] text-terminal-text">
                      {formatBillions(pred.amount)}
                    </span>
                  </div>

                  <p className="text-[10px] text-terminal-dim leading-relaxed mb-2">
                    {pred.description}
                  </p>

                  {/* Confidence bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-terminal-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-purple-400"
                        style={{ width: `${pred.confidence * 100}%` }}
                      />
                    </div>
                    <span className="font-display text-[9px] text-purple-400">
                      {(pred.confidence * 100).toFixed(0)}%
                    </span>
                    <span className="font-display text-[8px] text-terminal-dim">
                      {pred.timeframe}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-3 text-center">
            <p className="font-display text-[9px] text-terminal-dim tracking-wider">
              PREDICTIONS ARE EXPERIMENTAL AND NOT FINANCIAL ADVICE
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
