import { create } from 'zustand';
import type { AppState, FeatureToggles } from '../types';
import { SECTORS } from '../data/sectors';
import { FLOWS } from '../data/flows';
import { EVENTS } from '../data/events';
import { WHALES } from '../data/whales';
import { DEAD_PROJECTS } from '../data/deadProjects';
import { fetchLiveSectorData, fetchChainTvl } from '../api/defillama';

export const useStore = create<AppState>((set, get) => ({
  // View
  mode: 'live',
  timeRange: '30d',

  // Timeline
  currentDate: new Date(),
  isPlaying: false,
  playbackSpeed: 1,

  // Data
  sectors: SECTORS,
  flows: FLOWS,
  events: EVENTS,
  whales: WHALES,
  deadProjects: DEAD_PROJECTS,
  tvlHistory: {},

  // Selection
  selectedSector: null,
  selectedEvent: null,
  hoveredSector: null,

  // Features
  features: {
    showSmartMoney: false,
    showDeadZone: false,
    showTutorial: false,
    showPredictions: false,
  },

  // Loading
  isLoading: false,
  error: null,

  // Actions
  setMode: (mode) => set({ mode }),
  setTimeRange: (timeRange) => set({ timeRange }),
  setCurrentDate: (currentDate) => set({ currentDate }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),

  selectSector: (id) => set({ selectedSector: id, selectedEvent: null }),
  selectEvent: (id) => set({ selectedEvent: id, selectedSector: null }),
  setHoveredSector: (id) => set({ hoveredSector: id }),

  toggleFeature: (feature: keyof FeatureToggles) =>
    set((state) => ({
      features: {
        ...state.features,
        [feature]: !state.features[feature],
      },
    })),

  setSectors: (sectors) => set({ sectors }),
  setFlows: (flows) => set({ flows }),

  setTvlHistory: (chain, data) =>
    set((state) => ({
      tvlHistory: { ...state.tvlHistory, [chain]: data },
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchLiveData: async () => {
    const state = get();
    set({ isLoading: true, error: null });

    try {
      // Fetch live chain TVL data
      const updatedSectors = await fetchLiveSectorData(state.sectors);
      set({ sectors: updatedSectors });

      // Fetch historical TVL for chains that have a DeFiLlama slug
      const chainsToFetch = updatedSectors.filter(s => s.llamaChainSlug);
      const historyPromises = chainsToFetch.map(async (sector) => {
        try {
          const data = await fetchChainTvl(sector.llamaChainSlug!);
          return { chain: sector.id, data };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(historyPromises);
      const tvlHistory: Record<string, typeof results[0] extends { data: infer D } | null ? D : never> = {};
      for (const result of results) {
        if (result) {
          tvlHistory[result.chain] = result.data;
        }
      }

      set({ tvlHistory, isLoading: false });
    } catch (err) {
      console.error('Failed to fetch live data:', err);
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch data',
      });
    }
  },
}));
