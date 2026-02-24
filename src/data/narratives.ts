import type { Narrative } from '../types';

/**
 * Curated crypto narratives — the core of the terminal.
 *
 * Each narrative represents a capital-driving thesis in crypto.
 * Status tracks its lifecycle: emerging → heating → peak → cooling → dead.
 * The terminal helps users understand: what's the trade, where is it playing out,
 * and when did it start/will it end.
 */
export const NARRATIVES: Narrative[] = [
  // ---- ACTIVE / HEATING ----
  {
    id: 'ai-agents',
    name: 'AI Agents',
    status: 'heating',
    thesis: 'Autonomous AI agents managing portfolios, executing trades, and interacting with DeFi protocols. The convergence of LLMs and on-chain infrastructure.',
    chains: ['Ethereum', 'Solana', 'Base'],
    protocols: ['Autonolas', 'Virtuals Protocol', 'AI16Z', 'GRIFFAIN'],
    tokens: ['OLAS', 'VIRTUAL', 'AI16Z', 'FET', 'RNDR'],
    tvlTotal: 6_500_000_000,
    tvlChange7d: 12.3,
    socialScore: 92,
    riskLevel: 'high',
    startDate: '2024-11-01',
    keyMetrics: [
      { label: 'AI Token Mcap', value: '$45B' },
      { label: 'Active Agents', value: '~2,500' },
      { label: '7d Volume', value: '$8.2B' },
    ],
    catalysts: [
      'New agent frameworks launching weekly',
      'VCs pouring capital into AI x Crypto startups',
      'Real utility emerging (portfolio management, MEV)',
    ],
    risks: [
      'Most "AI" projects are vaporware with a ChatGPT wrapper',
      'Regulatory uncertainty around autonomous financial agents',
      'Extremely high valuations relative to actual usage',
    ],
  },
  {
    id: 'restaking',
    name: 'Restaking & AVS',
    status: 'peak',
    thesis: 'Reusing staked ETH security for other protocols via EigenLayer. Liquid restaking tokens (LRTs) create leverage on ETH yield.',
    chains: ['Ethereum'],
    protocols: ['EigenLayer', 'Ether.fi', 'Renzo', 'Puffer', 'Kelp'],
    tokens: ['EIGEN', 'ETHFI', 'REZ'],
    tvlTotal: 15_000_000_000,
    tvlChange7d: -1.2,
    socialScore: 58,
    riskLevel: 'medium',
    startDate: '2023-06-01',
    keyMetrics: [
      { label: 'Restaked ETH', value: '4.8M ETH' },
      { label: 'AVS Live', value: '12' },
      { label: 'LRT Mcap', value: '$8.2B' },
    ],
    catalysts: [
      'AVS mainnet launches creating real demand for restaked security',
      'LRT yield composability across DeFi',
    ],
    risks: [
      'Slashing risk is poorly understood',
      'LRT depeg risk in a crash',
      'Yield compression as more ETH is restaked',
    ],
  },
  {
    id: 'rwa-tokenization',
    name: 'RWA Tokenization',
    status: 'heating',
    thesis: 'Bringing traditional financial assets (treasuries, bonds, real estate, credit) on-chain. BlackRock, Franklin Templeton, and major TradFi entering.',
    chains: ['Ethereum', 'Polygon', 'Avalanche', 'Solana'],
    protocols: ['Ondo Finance', 'Maple Finance', 'Centrifuge', 'Backed Finance'],
    tokens: ['ONDO', 'MKR', 'MPL', 'CFG'],
    tvlTotal: 12_000_000_000,
    tvlChange7d: 3.8,
    socialScore: 68,
    riskLevel: 'low',
    startDate: '2024-03-01',
    keyMetrics: [
      { label: 'Tokenized Treasuries', value: '$3.2B' },
      { label: 'Private Credit', value: '$4.1B' },
      { label: 'Institutions Active', value: '30+' },
    ],
    catalysts: [
      'BlackRock BUIDL fund exceeds $500M',
      'Regulatory clarity improving globally',
      'T-bill yields making tokenized treasuries attractive',
    ],
    risks: [
      'Regulatory whiplash could freeze progress',
      'Smart contract risk on wrapped real-world assets',
      'Low on-chain composability for most RWA products',
    ],
  },
  {
    id: 'sol-memecoins',
    name: 'Solana Memecoins',
    status: 'cooling',
    thesis: 'Pump.fun and Raydium turned Solana into the memecoin casino. High-speed, low-fee chain is perfect for degen trading.',
    chains: ['Solana'],
    protocols: ['Pump.fun', 'Raydium', 'Jupiter', 'Tensor'],
    tokens: ['WIF', 'BONK', 'POPCAT', 'MEW'],
    tvlTotal: 3_200_000_000,
    tvlChange7d: -5.4,
    socialScore: 71,
    riskLevel: 'high',
    startDate: '2024-01-01',
    keyMetrics: [
      { label: 'Meme Mcap', value: '$18B' },
      { label: 'Daily Launches', value: '~5,000' },
      { label: 'Pump.fun Rev', value: '$300M+' },
    ],
    catalysts: [
      'New memecoin primitives (AI-generated memes, celebrity coins)',
      'Solana ecosystem growth brings more degens',
    ],
    risks: [
      '99.9% of memecoins go to zero',
      'Pump.fun scam/rug rate is extremely high',
      'Narrative fatigue setting in',
    ],
  },
  {
    id: 'l2-wars',
    name: 'L2 Wars',
    status: 'heating',
    thesis: 'Ethereum L2s competing for users, TVL, and mindshare. Base surpassing Arbitrum signals a new phase. OP Stack vs ZK rollups.',
    chains: ['Arbitrum', 'Base', 'Optimism', 'Blast', 'Scroll', 'zkSync'],
    protocols: ['Aerodrome', 'GMX', 'Camelot', 'Velodrome'],
    tokens: ['ARB', 'OP', 'BLAST'],
    tvlTotal: 9_800_000_000,
    tvlChange7d: 4.1,
    socialScore: 65,
    riskLevel: 'medium',
    startDate: '2023-03-01',
    keyMetrics: [
      { label: 'Total L2 TVL', value: '$9.8B' },
      { label: 'L2 Count', value: '40+' },
      { label: 'Base 7d Growth', value: '+12%' },
    ],
    catalysts: [
      'Base momentum from Coinbase distribution',
      'EIP-4844 blob fees make L2s cheaper',
      'Appchain thesis (L3s, Orbit chains)',
    ],
    risks: [
      'Too many L2s fragmenting liquidity',
      'Centralized sequencers are a trust assumption',
      'Revenue sustainability post-incentive programs',
    ],
  },
  {
    id: 'btc-defi',
    name: 'Bitcoin DeFi',
    status: 'emerging',
    thesis: 'Bitcoin getting programmability via Ordinals, BRC-20, Runes, and L2s like Stacks. BTC becoming more than just a store of value.',
    chains: ['Bitcoin'],
    protocols: ['Stacks', 'Lightning Network', 'Babylon', 'ALEX'],
    tokens: ['STX', 'ORDI', 'RUNE'],
    tvlTotal: 5_200_000_000,
    tvlChange7d: 6.2,
    socialScore: 52,
    riskLevel: 'medium',
    startDate: '2024-01-01',
    keyMetrics: [
      { label: 'BTC in DeFi', value: '~54K BTC' },
      { label: 'Ordinals Inscriptions', value: '67M+' },
      { label: 'Runes Volume', value: '$2.1B' },
    ],
    catalysts: [
      'Post-halving attention on BTC ecosystem',
      'Babylon staking bringing BTC security to other chains',
      'OP_CAT and covenant proposals could unlock native DeFi',
    ],
    risks: [
      'Bitcoin culture resistant to "shitcoining" the chain',
      'L2s are very early and often centralized',
      'Ordinals/BRC-20 may be a fad',
    ],
  },
  {
    id: 'depin',
    name: 'DePIN',
    status: 'emerging',
    thesis: 'Decentralized Physical Infrastructure Networks. Using crypto incentives to build real-world infra: wireless, compute, energy, mapping.',
    chains: ['Solana', 'Ethereum', 'Base'],
    protocols: ['Helium', 'Render Network', 'Hivemapper', 'io.net'],
    tokens: ['HNT', 'RNDR', 'HONEY', 'IO'],
    tvlTotal: 1_800_000_000,
    tvlChange7d: 2.1,
    socialScore: 45,
    riskLevel: 'medium',
    startDate: '2023-09-01',
    keyMetrics: [
      { label: 'DePIN Mcap', value: '$22B' },
      { label: 'Active Nodes', value: '1.2M+' },
      { label: 'Revenue', value: '$50M/yr' },
    ],
    catalysts: [
      'AI compute demand boosting Render, io.net',
      'Helium mobile growing actual subscriber base',
      'Real revenue models unlike most crypto',
    ],
    risks: [
      'Hardware costs create high barriers to entry',
      'Token incentives may not sustain without real demand',
      'Chicken-and-egg problem: need supply and demand simultaneously',
    ],
  },

  // ---- HISTORICAL / DEAD ----
  {
    id: 'defi-summer',
    name: 'DeFi Summer',
    status: 'dead',
    thesis: 'Yield farming explosion. COMP mining kicked off a frenzy of liquidity mining and food tokens. DeFi TVL went from $1B to $10B.',
    chains: ['Ethereum'],
    protocols: ['Compound', 'Uniswap', 'Yearn', 'SushiSwap', 'Curve'],
    tokens: ['COMP', 'YFI', 'SUSHI', 'CRV'],
    tvlTotal: 0,
    tvlChange7d: 0,
    socialScore: 5,
    riskLevel: 'low',
    startDate: '2020-06-15',
    endDate: '2021-01-01',
    keyMetrics: [
      { label: 'Peak TVL', value: '$10B' },
      { label: 'Duration', value: '~6 months' },
    ],
    catalysts: [],
    risks: [],
  },
  {
    id: 'nft-boom',
    name: 'NFT Boom',
    status: 'dead',
    thesis: 'PFP NFTs as social status. Beeple, BAYC, CryptoPunks. Celebrity adoption. OpenSea did $5B/month at peak.',
    chains: ['Ethereum', 'Solana'],
    protocols: ['OpenSea', 'Blur', 'Magic Eden'],
    tokens: [],
    tvlTotal: 0,
    tvlChange7d: 0,
    socialScore: 8,
    riskLevel: 'low',
    startDate: '2021-03-01',
    endDate: '2022-06-01',
    keyMetrics: [
      { label: 'Peak Monthly Vol', value: '$5B' },
      { label: 'Duration', value: '~15 months' },
    ],
    catalysts: [],
    risks: [],
  },
  {
    id: 'algo-stablecoins',
    name: 'Algorithmic Stablecoins',
    status: 'dead',
    thesis: 'Stablecoins without collateral — purely algorithmic pegs. UST/LUNA was the poster child. All have failed.',
    chains: ['Ethereum'],
    protocols: ['Terra', 'Iron Finance', 'Basis Cash', 'Fei Protocol'],
    tokens: ['LUNA', 'UST', 'TITAN', 'FEI'],
    tvlTotal: 0,
    tvlChange7d: 0,
    socialScore: 0,
    riskLevel: 'high',
    startDate: '2020-12-01',
    endDate: '2022-05-15',
    keyMetrics: [
      { label: 'Peak UST Supply', value: '$18.7B' },
      { label: 'Capital Destroyed', value: '$60B+' },
    ],
    catalysts: [],
    risks: [],
  },
];

/** Get active narratives sorted by social score */
export function getActiveNarratives(): Narrative[] {
  return NARRATIVES
    .filter(n => n.status !== 'dead')
    .sort((a, b) => b.socialScore - a.socialScore);
}

/** Get dead narratives */
export function getDeadNarratives(): Narrative[] {
  return NARRATIVES.filter(n => n.status === 'dead');
}
