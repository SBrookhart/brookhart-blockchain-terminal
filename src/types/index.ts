// ============================================================
// Brookhart Blockchain Terminal - Type Definitions
// ============================================================

// ---- Navigation ----

export type TabId = 'pulse' | 'narratives' | 'chains' | 'timeline' | 'graveyard' | 'learn';

// ---- Market Data (CoinGecko) ----

export interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  sparkline_in_7d?: { price: number[] };
  image?: string;
}

// ---- Chain Data (DeFiLlama) ----

export interface ChainData {
  name: string;
  tvl: number;
  tokenSymbol: string;
  change_1d?: number;
  change_7d?: number;
  change_1m?: number;
  mcap?: number;
  gecko_id?: string | null;
  chainId?: number | null;
}

export interface ProtocolData {
  id: string;
  name: string;
  chain: string;
  chains: string[];
  tvl: number;
  change_1d: number;
  change_7d: number;
  category: string;
  symbol: string;
  logo?: string;
  url?: string;
}

export interface TvlDataPoint {
  date: number;
  tvl: number;
}

// ---- Capital Flows ----

export interface CapitalFlow {
  id: string;
  from: string;
  to: string;
  amount: number;
  intensity: number;
  label?: string;
}

// ---- Narrative Events ----

export type EventType = 'cultural' | 'tweet' | 'tech' | 'macro' | 'hack' | 'launch';

export interface NarrativeEvent {
  id: string;
  timestamp: string;
  type: EventType;
  weight: number;
  title: string;
  description: string;
  impact: Array<{
    from: string;
    to: string;
    amount: number;
  }>;
  sentiment: number;
  socialGravity: number;
  source?: string;
}

// ---- Narratives ----

export type NarrativeStatus = 'emerging' | 'heating' | 'peak' | 'cooling' | 'dead';

export interface Narrative {
  id: string;
  name: string;
  status: NarrativeStatus;
  thesis: string;
  chains: string[];
  protocols: string[];
  tokens: string[];
  tvlTotal: number;
  tvlChange7d: number;
  socialScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  startDate: string;
  endDate?: string;
  keyMetrics: Array<{ label: string; value: string }>;
  catalysts: string[];
  risks: string[];
}

// ---- Dead Projects ----

export interface DeadProject {
  id: string;
  name: string;
  sector: string;
  peakTvl: number;
  deathDate: string;
  cause: string;
  description: string;
  amountLost: number;
}

// ---- App State ----

export interface AppState {
  // Navigation
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;

  // Market data
  topTokens: TokenPrice[];
  chains: ChainData[];
  protocols: ProtocolData[];
  tvlHistory: Record<string, TvlDataPoint[]>;
  globalData: {
    total_market_cap: number;
    total_volume: number;
    market_cap_change_percentage_24h: number;
    btc_dominance: number;
  };

  // Curated data
  narratives: Narrative[];
  events: NarrativeEvent[];
  deadProjects: DeadProject[];
  flows: CapitalFlow[];

  // Selection
  selectedChain: string | null;
  selectChain: (chain: string | null) => void;
  selectedNarrative: string | null;
  selectNarrative: (id: string | null) => void;

  // Learn tab navigation
  selectedLearnSection: string | null;
  selectLearnSection: (section: string | null) => void;
  selectedLearnTerm: string | null;
  selectLearnTerm: (term: string | null) => void;
  navigateToGlossary: (termId: string) => void;

  // Timeline
  currentDate: Date;
  isPlaying: boolean;
  playbackSpeed: number;
  setCurrentDate: (date: Date) => void;
  togglePlay: () => void;
  setPlaybackSpeed: (speed: number) => void;

  // Loading
  isLoading: boolean;
  error: string | null;

  // Data actions
  fetchAllData: () => Promise<void>;
  fetchChainHistory: (chain: string) => Promise<void>;
}
