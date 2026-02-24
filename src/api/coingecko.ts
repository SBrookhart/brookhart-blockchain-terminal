import type { TokenPrice } from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * CoinGecko free API client.
 * Rate limit: ~10-30 calls/min on free tier.
 * Docs: https://docs.coingecko.com/reference/introduction
 */

/** Fetch top crypto market data */
export async function fetchTopTokens(limit = 20): Promise<TokenPrice[]> {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=7d`
  );
  if (!res.ok) throw new Error(`CoinGecko markets failed: ${res.status}`);
  return res.json();
}

/** Fetch specific token prices */
export async function fetchTokenPrices(ids: string[]): Promise<Record<string, { usd: number; usd_24h_change: number }>> {
  const res = await fetch(
    `${BASE_URL}/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`
  );
  if (!res.ok) throw new Error(`CoinGecko price failed: ${res.status}`);
  return res.json();
}

/** Fetch global market data */
export async function fetchGlobalData(): Promise<{
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  btc_dominance: number;
}> {
  const res = await fetch(`${BASE_URL}/global`);
  if (!res.ok) throw new Error(`CoinGecko global failed: ${res.status}`);
  const json = await res.json();
  const d = json.data;
  return {
    total_market_cap: d.total_market_cap?.usd ?? 0,
    total_volume: d.total_volume?.usd ?? 0,
    market_cap_change_percentage_24h: d.market_cap_change_percentage_24h_usd ?? 0,
    btc_dominance: d.market_cap_percentage?.btc ?? 0,
  };
}

// ---- Mock data (fallback when API is unavailable) ----

export const MOCK_TOP_TOKENS: TokenPrice[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 97234,
    market_cap: 1_920_000_000_000,
    total_volume: 38_000_000_000,
    price_change_percentage_24h: 2.1,
    price_change_percentage_7d_in_currency: 5.3,
    sparkline_in_7d: { price: [91000, 92000, 93500, 94200, 95100, 96800, 97234] },
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 3421,
    market_cap: 411_000_000_000,
    total_volume: 18_000_000_000,
    price_change_percentage_24h: 1.8,
    price_change_percentage_7d_in_currency: 3.2,
    sparkline_in_7d: { price: [3200, 3250, 3300, 3350, 3380, 3400, 3421] },
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    current_price: 178,
    market_cap: 68_000_000_000,
    total_volume: 4_200_000_000,
    price_change_percentage_24h: 3.5,
    price_change_percentage_7d_in_currency: 8.1,
    sparkline_in_7d: { price: [155, 160, 165, 168, 172, 175, 178] },
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    current_price: 635,
    market_cap: 95_000_000_000,
    total_volume: 2_100_000_000,
    price_change_percentage_24h: 0.8,
    price_change_percentage_7d_in_currency: 1.2,
    sparkline_in_7d: { price: [625, 628, 630, 632, 633, 634, 635] },
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    current_price: 2.45,
    market_cap: 42_000_000_000,
    total_volume: 3_800_000_000,
    price_change_percentage_24h: -1.2,
    price_change_percentage_7d_in_currency: 4.5,
    sparkline_in_7d: { price: [2.30, 2.35, 2.50, 2.48, 2.42, 2.44, 2.45] },
  },
];

export const MOCK_GLOBAL = {
  total_market_cap: 3_200_000_000_000,
  total_volume: 128_000_000_000,
  market_cap_change_percentage_24h: 1.4,
  btc_dominance: 52.1,
};
