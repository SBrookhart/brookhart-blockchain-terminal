import type { LlamaChain, TvlDataPoint, Sector } from '../types';

const BASE_URL = 'https://api.llama.fi';

/**
 * DeFiLlama API client.
 * Free, no auth required. Docs: https://defillama.com/docs/api
 */

/** Fetch all chains with current TVL */
export async function fetchChains(): Promise<LlamaChain[]> {
  const res = await fetch(`${BASE_URL}/chains`);
  if (!res.ok) throw new Error(`DeFiLlama /chains failed: ${res.status}`);
  return res.json();
}

/** Fetch historical TVL for a specific chain */
export async function fetchChainTvl(chain: string): Promise<TvlDataPoint[]> {
  const res = await fetch(`${BASE_URL}/v2/historicalChainTvl/${chain}`);
  if (!res.ok) throw new Error(`DeFiLlama /historicalChainTvl/${chain} failed: ${res.status}`);
  const data: Array<{ date: number; tvl: number }> = await res.json();
  return data.map(d => ({ date: d.date, tvl: d.tvl }));
}

/** Fetch total TVL across all chains (historical) */
export async function fetchTotalTvl(): Promise<TvlDataPoint[]> {
  const res = await fetch(`${BASE_URL}/v2/historicalChainTvl`);
  if (!res.ok) throw new Error(`DeFiLlama total TVL failed: ${res.status}`);
  const data: Array<{ date: number; tvl: number }> = await res.json();
  return data.map(d => ({ date: d.date, tvl: d.tvl }));
}

/** Map DeFiLlama chain data to update sector TVLs */
export function mapChainDataToSectors(
  chains: LlamaChain[],
  sectors: Sector[]
): Sector[] {
  const chainMap = new Map(chains.map(c => [c.name, c.tvl]));

  return sectors.map(sector => {
    if (sector.llamaChainSlug) {
      const liveTvl = chainMap.get(sector.llamaChainSlug);
      if (liveTvl !== undefined) {
        return {
          ...sector,
          tvl: liveTvl / 1_000_000_000, // Convert to billions
        };
      }
    }
    return sector;
  });
}

/** Fetch chain data and return updated sectors */
export async function fetchLiveSectorData(sectors: Sector[]): Promise<Sector[]> {
  try {
    const chains = await fetchChains();
    return mapChainDataToSectors(chains, sectors);
  } catch (err) {
    console.warn('Failed to fetch live data, using defaults:', err);
    return sectors;
  }
}
