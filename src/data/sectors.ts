import type { Sector } from '../types';

/**
 * Sector definitions for the orbital visualization.
 * Angles are in radians, distributed around the circle.
 * Ring 0 = inner (largest TVL), Ring 1 = mid, Ring 2 = outer
 */
export const SECTORS: Sector[] = [
  {
    id: 'eth-defi',
    name: 'Ethereum DeFi',
    shortName: 'ETH DeFi',
    chain: 'Ethereum',
    category: 'DeFi',
    color: '#00D4FF',
    angle: 0,
    ring: 0,
    tvl: 48.2,
    change24h: 1.2,
    protocols: ['Lido', 'Aave', 'Maker', 'Uniswap', 'Eigenlayer'],
    llamaChainSlug: 'Ethereum',
  },
  {
    id: 'eth-nfts',
    name: 'Ethereum NFTs',
    shortName: 'ETH NFTs',
    chain: 'Ethereum',
    category: 'NFTs',
    color: '#FF6B9D',
    angle: (2 * Math.PI) / 9,
    ring: 1,
    tvl: 1.8,
    change24h: -3.5,
    protocols: ['OpenSea', 'Blur', 'BAYC', 'Pudgy Penguins'],
  },
  {
    id: 'sol-ecosystem',
    name: 'Solana Ecosystem',
    shortName: 'Solana',
    chain: 'Solana',
    category: 'DeFi',
    color: '#DC1FFF',
    angle: (2 * Math.PI * 2) / 9,
    ring: 0,
    tvl: 8.1,
    change24h: 2.8,
    protocols: ['Jito', 'Marinade', 'Raydium', 'Jupiter', 'Drift'],
    llamaChainSlug: 'Solana',
  },
  {
    id: 'sol-memes',
    name: 'Solana Memecoins',
    shortName: 'SOL Memes',
    chain: 'Solana',
    category: 'Memes',
    color: '#FFD700',
    angle: (2 * Math.PI * 3) / 9,
    ring: 2,
    tvl: 4.2,
    change24h: 12.5,
    protocols: ['BONK', 'WIF', 'POPCAT', 'MEW', 'BOME'],
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    shortName: 'Arbitrum',
    chain: 'Arbitrum',
    category: 'L2',
    color: '#28A0F0',
    angle: (2 * Math.PI * 4) / 9,
    ring: 1,
    tvl: 3.1,
    change24h: 0.8,
    protocols: ['GMX', 'Radiant', 'Camelot', 'Pendle'],
    llamaChainSlug: 'Arbitrum',
  },
  {
    id: 'base',
    name: 'Base',
    shortName: 'Base',
    chain: 'Base',
    category: 'L2',
    color: '#0052FF',
    angle: (2 * Math.PI * 5) / 9,
    ring: 1,
    tvl: 2.8,
    change24h: 5.2,
    protocols: ['Aerodrome', 'Moonwell', 'Extra Finance'],
    llamaChainSlug: 'Base',
  },
  {
    id: 'ai-tokens',
    name: 'AI Tokens',
    shortName: 'AI',
    chain: 'Multi',
    category: 'AI',
    color: '#00FFB3',
    angle: (2 * Math.PI * 6) / 9,
    ring: 1,
    tvl: 6.5,
    change24h: 8.1,
    protocols: ['FET', 'RENDER', 'TAO', 'NEAR AI', 'AKT'],
  },
  {
    id: 'rwa',
    name: 'Real World Assets',
    shortName: 'RWA',
    chain: 'Multi',
    category: 'RWA',
    color: '#FF8C42',
    angle: (2 * Math.PI * 7) / 9,
    ring: 2,
    tvl: 3.8,
    change24h: 2.1,
    protocols: ['Ondo', 'Centrifuge', 'Maple', 'Goldfinch'],
  },
  {
    id: 'btc-defi',
    name: 'Bitcoin DeFi',
    shortName: 'BTC DeFi',
    chain: 'Bitcoin',
    category: 'DeFi',
    color: '#F7931A',
    angle: (2 * Math.PI * 8) / 9,
    ring: 1,
    tvl: 5.2,
    change24h: 3.4,
    protocols: ['Babylon', 'Lightning', 'Stacks', 'WBTC'],
    llamaChainSlug: 'Bitcoin',
  },
];

/** Get sector by ID */
export function getSector(id: string): Sector | undefined {
  return SECTORS.find(s => s.id === id);
}

/** Total TVL across all sectors */
export function getTotalTvl(sectors: Sector[]): number {
  return sectors.reduce((sum, s) => sum + s.tvl, 0);
}
