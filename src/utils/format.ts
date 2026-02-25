/**
 * Formatting utilities for the Brookhart Blockchain Terminal.
 */

/** Format a large number with appropriate suffix ($1.2T, $48.2B, $350M, $12.5K) */
export function formatLargeNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(1)}T`;
  }
  if (Math.abs(value) >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/** Format a number as billions (e.g., 48.2 → "$48.2B") */
export function formatBillions(value: number): string {
  if (Math.abs(value) >= 1) {
    return `$${value.toFixed(1)}B`;
  }
  return `$${(value * 1000).toFixed(0)}M`;
}

/** Format a number as millions */
export function formatMillions(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/** Format a percentage with sign and color class */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

/** Format a date for display */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Format a date as compact (e.g., "Jan '24") */
export function formatDateCompact(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const year = d.getFullYear().toString().slice(2);
  return `${month} '${year}`;
}

/** Format a win rate as percentage */
export function formatWinRate(rate: number): string {
  return `${(rate * 100).toFixed(0)}%`;
}

/** Abbreviate an address */
export function shortenAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/** Get color class for positive/negative values */
export function getChangeColor(value: number): string {
  if (value > 0) return 'text-green-400';
  if (value < 0) return 'text-red-400';
  return 'text-terminal-dim';
}
