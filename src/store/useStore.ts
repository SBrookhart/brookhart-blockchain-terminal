import { create } from 'zustand';
import type { AppState } from '../types';
import { EVENTS } from '../data/events';
import { DEAD_PROJECTS } from '../data/deadProjects';
import { FLOWS } from '../data/flows';
import { fetchChains, fetchProtocols, fetchChainTvl, MOCK_CHAINS, MOCK_PROTOCOLS } from '../api/defillama';
import { fetchTopTokens, fetchGlobalData, MOCK_TOP_TOKENS, MOCK_GLOBAL } from '../api/coingecko';

export const useStore = create<AppState>((set) => ({
  // Navigation
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Market data
  topTokens: MOCK_TOP_TOKENS,
  chains: MOCK_CHAINS,
  protocols: MOCK_PROTOCOLS,
  tvlHistory: {},
  globalData: MOCK_GLOBAL,

  // Curated data
  events: EVENTS,
  deadProjects: DEAD_PROJECTS,
  flows: FLOWS,

  // Selection
  selectedChain: null,
  selectChain: (chain) => set({ selectedChain: chain }),

  // Timeline
  currentDate: new Date(),
  isPlaying: false,
  playbackSpeed: 1,
  setCurrentDate: (date) => set({ currentDate: date }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  // Loading
  isLoading: false,
  error: null,

  // Fetch all data from APIs (with fallback to mocks)
  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [chainsRes, protocolsRes, tokensRes, globalRes] = await Promise.allSettled([
        fetchChains(),
        fetchProtocols(),
        fetchTopTokens(),
        fetchGlobalData(),
      ]);

      set({
        chains: chainsRes.status === 'fulfilled'
          ? chainsRes.value.sort((a: { tvl: number }, b: { tvl: number }) => b.tvl - a.tvl).slice(0, 30)
          : MOCK_CHAINS,
        protocols: protocolsRes.status === 'fulfilled'
          ? protocolsRes.value
          : MOCK_PROTOCOLS,
        topTokens: tokensRes.status === 'fulfilled'
          ? tokensRes.value
          : MOCK_TOP_TOKENS,
        globalData: globalRes.status === 'fulfilled'
          ? globalRes.value
          : MOCK_GLOBAL,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false, error: 'Failed to fetch data. Using cached data.' });
    }
  },

  fetchChainHistory: async (chain: string) => {
    try {
      const data = await fetchChainTvl(chain);
      set((s) => ({
        tvlHistory: { ...s.tvlHistory, [chain]: data },
      }));
    } catch {
      // Silently fail — historical data is optional
    }
  },
}));
