// ============================================================
// Internet Money Map - Type Definitions
// ============================================================

/** A sector represents a capital pool (chain, category, or narrative) */
export interface Sector {
  id: string;
  name: string;
  shortName: string;
  chain: string;
  category: string;
  color: string;
  /** Angle offset on the orbital (radians) */
  angle: number;
  /** Ring index (0 = inner, 1 = mid, 2 = outer) */
  ring: number;
  /** Current TVL in billions USD */
  tvl: number;
  /** TVL change percentage (24h) */
  change24h: number;
  /** Top protocols in this sector */
  protocols: string[];
  /** DeFiLlama chain slug for API lookups (if applicable) */
  llamaChainSlug?: string;
}

/** A capital flow between two sectors */
export interface CapitalFlow {
  id: string;
  from: string; // sector id
  to: string;   // sector id
  /** Amount in billions USD */
  amount: number;
  /** Intensity 0-1 controls visual brightness */
  intensity: number;
  /** Optional label */
  label?: string;
  /** Timestamp or date string */
  date?: string;
}

/** Narrative event type */
export type EventType = 'cultural' | 'tweet' | 'tech' | 'macro' | 'hack' | 'launch';

/** A narrative event on the timeline */
export interface NarrativeEvent {
  id: string;
  timestamp: string; // ISO date
  type: EventType;
  weight: number; // 0-1, importance
  title: string;
  description: string;
  /** Capital flow impacts triggered by this event */
  impact: Array<{
    from: string;
    to: string;
    amount: number;
  }>;
  sentiment: number; // -1 to 1
  socialGravity: number; // 0-100
  /** Optional source URL */
  source?: string;
}

/** A whale/smart money address */
export interface WhaleAddress {
  address: string;
  label: string;
  /** Net worth in millions */
  netWorth: number;
  winRate: number; // 0-1
  /** Key trades */
  trades: WhaleTrade[];
  /** Which sectors they're active in */
  activeSectors: string[];
}

export interface WhaleTrade {
  date: string;
  action: 'buy' | 'sell' | 'bridge';
  asset: string;
  amount: number; // USD
  sector: string;
  pnl?: number; // realized PnL
}

/** A dead/failed project for the memorial */
export interface DeadProject {
  id: string;
  name: string;
  sector: string;
  peakTvl: number; // billions
  deathDate: string;
  cause: string;
  description: string;
  /** Amount lost in billions */
  amountLost: number;
}

/** TVL data point from DeFiLlama */
export interface TvlDataPoint {
  date: number; // unix timestamp
  tvl: number;
}

/** Chain data from DeFiLlama /chains endpoint */
export interface LlamaChain {
  gecko_id: string | null;
  tvl: number;
  tokenSymbol: string;
  cmcId: string | null;
  name: string;
  chainId: number | null;
}

/** View mode */
export type ViewMode = 'live' | 'historical';

/** Time range for live mode */
export type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y';

/** Feature toggles */
export interface FeatureToggles {
  showSmartMoney: boolean;
  showDeadZone: boolean;
  showTutorial: boolean;
  showPredictions: boolean;
}

/** Application state (Zustand) */
export interface AppState {
  // View
  mode: ViewMode;
  timeRange: TimeRange;

  // Timeline (historical mode)
  currentDate: Date;
  isPlaying: boolean;
  playbackSpeed: number;

  // Data
  sectors: Sector[];
  flows: CapitalFlow[];
  events: NarrativeEvent[];
  whales: WhaleAddress[];
  deadProjects: DeadProject[];
  tvlHistory: Record<string, TvlDataPoint[]>;

  // Selection
  selectedSector: string | null;
  selectedEvent: string | null;
  hoveredSector: string | null;

  // Features
  features: FeatureToggles;

  // Loading
  isLoading: boolean;
  error: string | null;

  // Actions
  setMode: (mode: ViewMode) => void;
  setTimeRange: (range: TimeRange) => void;
  setCurrentDate: (date: Date) => void;
  togglePlay: () => void;
  setPlaybackSpeed: (speed: number) => void;
  selectSector: (id: string | null) => void;
  selectEvent: (id: string | null) => void;
  setHoveredSector: (id: string | null) => void;
  toggleFeature: (feature: keyof FeatureToggles) => void;
  setSectors: (sectors: Sector[]) => void;
  setFlows: (flows: CapitalFlow[]) => void;
  setTvlHistory: (chain: string, data: TvlDataPoint[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchLiveData: () => Promise<void>;
}
