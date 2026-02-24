import type { WhaleAddress } from '../types';

/**
 * Curated whale/smart money addresses.
 * Labels are illustrative — these represent archetypes of smart money behavior.
 */
export const WHALES: WhaleAddress[] = [
  {
    address: '0x1234...abcd',
    label: 'DeFi OG Whale',
    netWorth: 450,
    winRate: 0.78,
    activeSectors: ['eth-defi', 'arbitrum', 'base'],
    trades: [
      { date: '2024-12-01', action: 'buy', asset: 'ETH', amount: 12_000_000, sector: 'eth-defi', pnl: 2_400_000 },
      { date: '2024-11-15', action: 'bridge', asset: 'USDC', amount: 5_000_000, sector: 'base' },
      { date: '2024-10-20', action: 'buy', asset: 'AERO', amount: 3_000_000, sector: 'base', pnl: 900_000 },
      { date: '2024-09-05', action: 'sell', asset: 'ARB', amount: 2_000_000, sector: 'arbitrum', pnl: -200_000 },
    ],
  },
  {
    address: '0x5678...efgh',
    label: 'Memecoin Degen',
    netWorth: 85,
    winRate: 0.62,
    activeSectors: ['sol-memes', 'sol-ecosystem'],
    trades: [
      { date: '2024-12-10', action: 'buy', asset: 'WIF', amount: 500_000, sector: 'sol-memes', pnl: 1_200_000 },
      { date: '2024-11-20', action: 'buy', asset: 'BONK', amount: 200_000, sector: 'sol-memes', pnl: 350_000 },
      { date: '2024-10-01', action: 'sell', asset: 'POPCAT', amount: 800_000, sector: 'sol-memes', pnl: 600_000 },
      { date: '2024-08-15', action: 'buy', asset: 'BOME', amount: 100_000, sector: 'sol-memes', pnl: -80_000 },
    ],
  },
  {
    address: '0x9abc...ijkl',
    label: 'AI Narrative Trader',
    netWorth: 220,
    winRate: 0.71,
    activeSectors: ['ai-tokens', 'eth-defi', 'sol-ecosystem'],
    trades: [
      { date: '2025-01-05', action: 'buy', asset: 'FET', amount: 4_000_000, sector: 'ai-tokens', pnl: 1_600_000 },
      { date: '2024-12-20', action: 'buy', asset: 'RENDER', amount: 3_000_000, sector: 'ai-tokens', pnl: 900_000 },
      { date: '2024-11-01', action: 'buy', asset: 'TAO', amount: 2_500_000, sector: 'ai-tokens', pnl: 750_000 },
      { date: '2024-09-15', action: 'sell', asset: 'RNDR', amount: 1_500_000, sector: 'ai-tokens', pnl: 400_000 },
    ],
  },
  {
    address: '0xdef0...mnop',
    label: 'Institutional Player',
    netWorth: 1200,
    winRate: 0.82,
    activeSectors: ['btc-defi', 'eth-defi', 'rwa'],
    trades: [
      { date: '2025-01-15', action: 'buy', asset: 'BTC', amount: 25_000_000, sector: 'btc-defi', pnl: 5_000_000 },
      { date: '2024-12-01', action: 'buy', asset: 'ONDO', amount: 8_000_000, sector: 'rwa', pnl: 2_400_000 },
      { date: '2024-10-15', action: 'buy', asset: 'stETH', amount: 15_000_000, sector: 'eth-defi', pnl: 3_000_000 },
      { date: '2024-06-01', action: 'sell', asset: 'ETH', amount: 10_000_000, sector: 'eth-defi', pnl: 1_500_000 },
    ],
  },
];
