import type { CapitalFlow } from '../types';

/**
 * Current capital flows between sectors.
 * These represent the "live" state of money movement.
 * In live mode, these get updated from API data.
 */
export const FLOWS: CapitalFlow[] = [
  {
    id: 'eth-to-l2s',
    from: 'eth-defi',
    to: 'arbitrum',
    amount: 1.2,
    intensity: 0.7,
    label: 'L2 Migration',
  },
  {
    id: 'eth-to-base',
    from: 'eth-defi',
    to: 'base',
    amount: 1.8,
    intensity: 0.85,
    label: 'Base Growth',
  },
  {
    id: 'eth-to-sol',
    from: 'eth-defi',
    to: 'sol-ecosystem',
    amount: 0.8,
    intensity: 0.5,
    label: 'SOL Rotation',
  },
  {
    id: 'defi-to-memes',
    from: 'sol-ecosystem',
    to: 'sol-memes',
    amount: 2.1,
    intensity: 0.9,
    label: 'Memecoin Mania',
  },
  {
    id: 'defi-to-ai',
    from: 'eth-defi',
    to: 'ai-tokens',
    amount: 1.5,
    intensity: 0.8,
    label: 'AI Narrative',
  },
  {
    id: 'trad-to-btc',
    from: 'rwa',
    to: 'btc-defi',
    amount: 2.5,
    intensity: 0.9,
    label: 'ETF Inflows',
  },
  {
    id: 'trad-to-eth',
    from: 'rwa',
    to: 'eth-defi',
    amount: 1.8,
    intensity: 0.75,
    label: 'ETH ETF',
  },
  {
    id: 'nft-to-memes',
    from: 'eth-nfts',
    to: 'sol-memes',
    amount: 0.6,
    intensity: 0.6,
    label: 'NFT → Meme Rotation',
  },
  {
    id: 'arb-to-base',
    from: 'arbitrum',
    to: 'base',
    amount: 0.4,
    intensity: 0.45,
    label: 'L2 Competition',
  },
  {
    id: 'eth-to-rwa',
    from: 'eth-defi',
    to: 'rwa',
    amount: 1.2,
    intensity: 0.65,
    label: 'Tokenization',
  },
  {
    id: 'btc-to-eth',
    from: 'btc-defi',
    to: 'eth-defi',
    amount: 0.5,
    intensity: 0.4,
    label: 'BTC → ETH DeFi',
  },
  {
    id: 'ai-to-sol',
    from: 'ai-tokens',
    to: 'sol-ecosystem',
    amount: 0.7,
    intensity: 0.55,
    label: 'AI on Solana',
  },
];
