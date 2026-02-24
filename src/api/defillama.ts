import type { ChainData, ProtocolData, TvlDataPoint } from '../types';

const BASE_URL = 'https://api.llama.fi';

/**
 * DeFiLlama free API client.
 * No auth required. Docs: https://defillama.com/docs/api
 */

export async function fetchChains(): Promise<ChainData[]> {
  const res = await fetch(`${BASE_URL}/chains`);
  if (!res.ok) throw new Error(`DeFiLlama /chains: ${res.status}`);
  return res.json();
}

export async function fetchProtocols(): Promise<ProtocolData[]> {
  const res = await fetch(`${BASE_URL}/protocols`);
  if (!res.ok) throw new Error(`DeFiLlama /protocols: ${res.status}`);
  const data = await res.json();
  return data.slice(0, 100).map((p: Record<string, unknown>) => ({
    id: p.slug as string,
    name: p.name as string,
    chain: (p.chain as string) || 'Multi',
    chains: (p.chains as string[]) || [],
    tvl: (p.tvl as number) || 0,
    change_1d: (p.change_1d as number) || 0,
    change_7d: (p.change_7d as number) || 0,
    category: (p.category as string) || 'Other',
    symbol: (p.symbol as string) || '',
    logo: p.logo as string | undefined,
    url: p.url as string | undefined,
  }));
}

export async function fetchChainTvl(chain: string): Promise<TvlDataPoint[]> {
  const res = await fetch(`${BASE_URL}/v2/historicalChainTvl/${chain}`);
  if (!res.ok) throw new Error(`DeFiLlama TVL/${chain}: ${res.status}`);
  return res.json();
}

// ---- Mock data (fallback) ----

export const MOCK_CHAINS: ChainData[] = [
  { name: 'Ethereum', tvl: 48_200_000_000, tokenSymbol: 'ETH', change_1d: 1.2, change_7d: 3.0, mcap: 411_000_000_000 },
  { name: 'Tron', tvl: 8_500_000_000, tokenSymbol: 'TRX', change_1d: 0.2, change_7d: -0.5, mcap: 18_000_000_000 },
  { name: 'Solana', tvl: 8_100_000_000, tokenSymbol: 'SOL', change_1d: 2.8, change_7d: 5.0, mcap: 68_000_000_000 },
  { name: 'BSC', tvl: 5_800_000_000, tokenSymbol: 'BNB', change_1d: 0.4, change_7d: -1.0, mcap: 95_000_000_000 },
  { name: 'Bitcoin', tvl: 5_200_000_000, tokenSymbol: 'BTC', change_1d: 3.4, change_7d: 4.0, mcap: 1_920_000_000_000 },
  { name: 'Arbitrum', tvl: 3_100_000_000, tokenSymbol: 'ARB', change_1d: 0.8, change_7d: 2.0, mcap: 2_800_000_000 },
  { name: 'Base', tvl: 2_800_000_000, tokenSymbol: 'ETH', change_1d: 5.2, change_7d: 12.0 },
  { name: 'Polygon', tvl: 1_800_000_000, tokenSymbol: 'POL', change_1d: -0.3, change_7d: -2.0, mcap: 8_100_000_000 },
  { name: 'Avalanche', tvl: 1_500_000_000, tokenSymbol: 'AVAX', change_1d: 1.1, change_7d: 0.5, mcap: 12_000_000_000 },
  { name: 'Optimism', tvl: 1_200_000_000, tokenSymbol: 'OP', change_1d: -0.5, change_7d: 1.8, mcap: 3_500_000_000 },
  { name: 'Sui', tvl: 980_000_000, tokenSymbol: 'SUI', change_1d: 4.2, change_7d: 15.0, mcap: 5_200_000_000 },
  { name: 'Mantle', tvl: 650_000_000, tokenSymbol: 'MNT', change_1d: 2.1, change_7d: 8.0, mcap: 2_100_000_000 },
];

export const MOCK_PROTOCOLS: ProtocolData[] = [
  { id: 'lido', name: 'Lido', chain: 'Ethereum', chains: ['Ethereum'], tvl: 14_200_000_000, change_1d: 0.5, change_7d: 1.2, category: 'Liquid Staking', symbol: 'LDO' },
  { id: 'aave-v3', name: 'Aave V3', chain: 'Multi', chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'], tvl: 12_800_000_000, change_1d: 1.1, change_7d: 2.5, category: 'Lending', symbol: 'AAVE' },
  { id: 'eigenlayer', name: 'EigenLayer', chain: 'Ethereum', chains: ['Ethereum'], tvl: 11_500_000_000, change_1d: 0.3, change_7d: -0.8, category: 'Restaking', symbol: 'EIGEN' },
  { id: 'maker', name: 'Maker (Sky)', chain: 'Ethereum', chains: ['Ethereum'], tvl: 8_900_000_000, change_1d: 0.2, change_7d: 0.5, category: 'CDP', symbol: 'MKR' },
  { id: 'uniswap-v3', name: 'Uniswap V3', chain: 'Multi', chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base', 'BSC'], tvl: 5_400_000_000, change_1d: -0.3, change_7d: 1.0, category: 'DEX', symbol: 'UNI' },
  { id: 'jito', name: 'Jito', chain: 'Solana', chains: ['Solana'], tvl: 2_800_000_000, change_1d: 3.2, change_7d: 8.0, category: 'Liquid Staking', symbol: 'JTO' },
  { id: 'rocket-pool', name: 'Rocket Pool', chain: 'Ethereum', chains: ['Ethereum'], tvl: 2_600_000_000, change_1d: 0.1, change_7d: 0.3, category: 'Liquid Staking', symbol: 'RPL' },
  { id: 'pendle', name: 'Pendle', chain: 'Multi', chains: ['Ethereum', 'Arbitrum'], tvl: 2_200_000_000, change_1d: 2.5, change_7d: 5.0, category: 'Yield', symbol: 'PENDLE' },
  { id: 'aerodrome', name: 'Aerodrome', chain: 'Base', chains: ['Base'], tvl: 1_800_000_000, change_1d: 4.1, change_7d: 10.0, category: 'DEX', symbol: 'AERO' },
  { id: 'gmx', name: 'GMX', chain: 'Arbitrum', chains: ['Arbitrum', 'Avalanche'], tvl: 780_000_000, change_1d: -0.8, change_7d: 1.5, category: 'Derivatives', symbol: 'GMX' },
];
