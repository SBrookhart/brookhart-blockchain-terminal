import { useStore } from '../../store/useStore';
import { formatLargeNumber } from '../../utils/format';

/**
 * Bottom status bar with scrolling data and metadata.
 */
export function BottomBar() {
  const { chains } = useStore();

  // Calculate total TVL
  const totalTvl = chains.reduce((sum, c) => sum + c.tvl, 0);

  return (
    <footer className="flex items-center h-6 px-3 bg-terminal-bg border-t border-terminal-border text-[9px] font-display text-terminal-dim">
      <span className="mr-4">
        TOTAL DeFi TVL <span className="text-terminal-text">{formatLargeNumber(totalTvl)}</span>
      </span>
      <span className="mr-4">|</span>
      <span className="mr-4">
        {chains.length} CHAINS TRACKED
      </span>
      <span className="mr-4">|</span>
      <span className="mr-4">
        DATA: DEFILLAMA + COINGECKO
      </span>
      <span className="ml-auto tracking-widest">
        IMM TERMINAL v2.0
      </span>
    </footer>
  );
}
