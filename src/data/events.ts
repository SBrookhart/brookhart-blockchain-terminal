import type { NarrativeEvent } from '../types';

/**
 * Curated narrative events for the timeline.
 * These represent major moments in crypto capital flow history 2020-2025.
 */
export const EVENTS: NarrativeEvent[] = [
  // 2020
  {
    id: 'defi-summer',
    timestamp: '2020-06-15',
    type: 'cultural',
    weight: 0.95,
    title: 'DeFi Summer Begins',
    description: 'Compound launches COMP token mining. Yield farming explodes. ETH DeFi TVL goes from $1B to $10B in months.',
    impact: [{ from: 'eth-nfts', to: 'eth-defi', amount: 3.0 }],
    sentiment: 0.9,
    socialGravity: 95,
  },
  {
    id: 'uni-airdrop',
    timestamp: '2020-09-17',
    type: 'launch',
    weight: 0.9,
    title: 'Uniswap UNI Airdrop',
    description: '400 UNI to every past user. Worth ~$1,200 at launch, later peaked at ~$15,000. Set the template for retroactive airdrops.',
    impact: [{ from: 'eth-nfts', to: 'eth-defi', amount: 1.5 }],
    sentiment: 0.95,
    socialGravity: 90,
  },

  // 2021
  {
    id: 'nft-boom',
    timestamp: '2021-03-11',
    type: 'cultural',
    weight: 0.95,
    title: 'Beeple sells for $69M',
    description: "Beeple's \"Everydays\" sells at Christie's for $69.3M. NFTs enter mainstream consciousness. OpenSea volume explodes.",
    impact: [{ from: 'eth-defi', to: 'eth-nfts', amount: 5.0 }],
    sentiment: 0.85,
    socialGravity: 98,
  },
  {
    id: 'bayc-launch',
    timestamp: '2021-04-23',
    type: 'launch',
    weight: 0.85,
    title: 'BAYC Launches',
    description: 'Bored Ape Yacht Club mints out at 0.08 ETH. Would become the defining PFP project of the cycle.',
    impact: [{ from: 'eth-defi', to: 'eth-nfts', amount: 2.0 }],
    sentiment: 0.8,
    socialGravity: 85,
  },
  {
    id: 'el-salvador',
    timestamp: '2021-09-07',
    type: 'macro',
    weight: 0.8,
    title: 'El Salvador adopts Bitcoin',
    description: 'Bitcoin becomes legal tender in El Salvador. First nation-state adoption. BTC crashes 10% on the news.',
    impact: [{ from: 'eth-defi', to: 'btc-defi', amount: 1.0 }],
    sentiment: 0.6,
    socialGravity: 88,
  },
  {
    id: 'sol-summer',
    timestamp: '2021-08-15',
    type: 'tech',
    weight: 0.85,
    title: 'Solana Summer',
    description: 'SOL rallies from $30 to $200+. Solana ecosystem explodes with DeFi and NFTs. "ETH killer" narrative peaks.',
    impact: [{ from: 'eth-defi', to: 'sol-ecosystem', amount: 4.0 }],
    sentiment: 0.85,
    socialGravity: 90,
  },

  // 2022
  {
    id: 'luna-collapse',
    timestamp: '2022-05-09',
    type: 'hack',
    weight: 1.0,
    title: 'Terra/Luna Collapse',
    description: 'UST loses peg, LUNA spirals to zero. $60B wiped out in days. Contagion hits Celsius, 3AC, Voyager.',
    impact: [
      { from: 'eth-defi', to: 'rwa', amount: -8.0 },
      { from: 'sol-ecosystem', to: 'rwa', amount: -3.0 },
    ],
    sentiment: -0.95,
    socialGravity: 100,
  },
  {
    id: 'merge',
    timestamp: '2022-09-15',
    type: 'tech',
    weight: 0.9,
    title: 'The Merge',
    description: 'Ethereum transitions from PoW to PoS. Energy usage drops 99.95%. Deflationary ETH begins.',
    impact: [{ from: 'btc-defi', to: 'eth-defi', amount: 2.0 }],
    sentiment: 0.8,
    socialGravity: 95,
  },
  {
    id: 'ftx-collapse',
    timestamp: '2022-11-11',
    type: 'hack',
    weight: 1.0,
    title: 'FTX Collapse',
    description: 'FTX files for bankruptcy. SBF arrested. $8B in customer funds missing. Worst trust crisis in crypto history.',
    impact: [
      { from: 'sol-ecosystem', to: 'eth-defi', amount: -5.0 },
      { from: 'eth-defi', to: 'rwa', amount: -4.0 },
    ],
    sentiment: -1.0,
    socialGravity: 100,
  },

  // 2023
  {
    id: 'bonk-mania',
    timestamp: '2023-01-05',
    type: 'cultural',
    weight: 0.7,
    title: 'BONK Mania',
    description: 'Solana community rallies around BONK memecoin. Signs of life after FTX collapse. Solana DeFi TVL starts recovering.',
    impact: [{ from: 'eth-defi', to: 'sol-memes', amount: 0.5 }],
    sentiment: 0.6,
    socialGravity: 70,
  },
  {
    id: 'blur-launch',
    timestamp: '2023-02-14',
    type: 'launch',
    weight: 0.75,
    title: 'Blur Takes Over NFTs',
    description: 'Blur airdrop and zero-fee marketplace flips OpenSea. Pro-trader NFT marketplace captures majority of volume.',
    impact: [{ from: 'eth-defi', to: 'eth-nfts', amount: 1.0 }],
    sentiment: 0.5,
    socialGravity: 75,
  },
  {
    id: 'arb-airdrop',
    timestamp: '2023-03-23',
    type: 'launch',
    weight: 0.85,
    title: 'Arbitrum ARB Airdrop',
    description: 'Arbitrum distributes ARB token. Largest L2 airdrop ever. L2 narrative accelerates.',
    impact: [{ from: 'eth-defi', to: 'arbitrum', amount: 2.0 }],
    sentiment: 0.8,
    socialGravity: 85,
  },
  {
    id: 'chatgpt-ai-tokens',
    timestamp: '2023-04-01',
    type: 'cultural',
    weight: 0.8,
    title: 'AI Token Mania',
    description: 'ChatGPT hype spills into crypto. FET, RNDR, AGIX pump. "AI x Crypto" becomes the new narrative.',
    impact: [{ from: 'eth-defi', to: 'ai-tokens', amount: 2.5 }],
    sentiment: 0.75,
    socialGravity: 82,
  },
  {
    id: 'base-launch',
    timestamp: '2023-08-09',
    type: 'launch',
    weight: 0.8,
    title: 'Base Goes Live',
    description: "Coinbase's L2 launches. Friend.tech drives early adoption. Brings normie onramp to L2s.",
    impact: [{ from: 'eth-defi', to: 'base', amount: 1.5 }],
    sentiment: 0.7,
    socialGravity: 80,
  },

  // 2024
  {
    id: 'btc-etf',
    timestamp: '2024-01-10',
    type: 'macro',
    weight: 0.95,
    title: 'Bitcoin Spot ETF Approved',
    description: 'SEC approves 11 spot Bitcoin ETFs. $4.6B volume on day one. TradFi officially enters crypto.',
    impact: [
      { from: 'rwa', to: 'btc-defi', amount: 5.0 },
      { from: 'rwa', to: 'eth-defi', amount: 3.0 },
    ],
    sentiment: 0.95,
    socialGravity: 98,
  },
  {
    id: 'wif-pump',
    timestamp: '2024-03-15',
    type: 'cultural',
    weight: 0.7,
    title: 'WIF to $3B',
    description: 'dogwifhat hits $3B market cap. Solana memecoins enter a new era. Pump.fun launches.',
    impact: [{ from: 'eth-defi', to: 'sol-memes', amount: 2.0 }],
    sentiment: 0.65,
    socialGravity: 78,
  },
  {
    id: 'eth-etf',
    timestamp: '2024-05-23',
    type: 'macro',
    weight: 0.85,
    title: 'Ethereum ETF Approved',
    description: 'SEC approves spot Ethereum ETFs. Institutional validation for ETH as an asset class.',
    impact: [{ from: 'rwa', to: 'eth-defi', amount: 4.0 }],
    sentiment: 0.85,
    socialGravity: 90,
  },
  {
    id: 'eigenlayer',
    timestamp: '2024-06-15',
    type: 'tech',
    weight: 0.8,
    title: 'Restaking Goes Mainstream',
    description: 'EigenLayer TVL hits $15B. Restaking becomes the dominant DeFi narrative. LRTs proliferate.',
    impact: [{ from: 'sol-ecosystem', to: 'eth-defi', amount: 2.0 }],
    sentiment: 0.7,
    socialGravity: 75,
  },
  {
    id: 'rwa-breakout',
    timestamp: '2024-09-01',
    type: 'macro',
    weight: 0.8,
    title: 'RWA TVL Hits $10B',
    description: 'Tokenized treasuries, real estate, and private credit cross $10B. BlackRock BUIDL fund launches.',
    impact: [{ from: 'eth-defi', to: 'rwa', amount: 3.0 }],
    sentiment: 0.8,
    socialGravity: 72,
  },
  {
    id: 'btc-100k',
    timestamp: '2024-12-05',
    type: 'macro',
    weight: 0.9,
    title: 'Bitcoin Hits $100K',
    description: 'Bitcoin crosses $100,000 for the first time. ETF inflows and halving supply shock drive the rally.',
    impact: [
      { from: 'rwa', to: 'btc-defi', amount: 3.0 },
      { from: 'eth-defi', to: 'btc-defi', amount: 1.5 },
    ],
    sentiment: 0.9,
    socialGravity: 95,
  },

  // 2025
  {
    id: 'ai-agents-2025',
    timestamp: '2025-01-15',
    type: 'tech',
    weight: 0.85,
    title: 'AI Agents Trade On-Chain',
    description: 'Autonomous AI agents managing DeFi positions become a major trend. AI token sector explodes.',
    impact: [{ from: 'eth-defi', to: 'ai-tokens', amount: 4.0 }],
    sentiment: 0.8,
    socialGravity: 88,
  },
  {
    id: 'base-overtakes-arb',
    timestamp: '2025-02-20',
    type: 'tech',
    weight: 0.75,
    title: 'Base Surpasses Arbitrum in TVL',
    description: 'Base overtakes Arbitrum as the #1 L2 by TVL. Coinbase effect and strong dApp ecosystem drive growth.',
    impact: [{ from: 'arbitrum', to: 'base', amount: 1.0 }],
    sentiment: 0.65,
    socialGravity: 70,
  },
];

/** Get events within a date range */
export function getEventsInRange(start: Date, end: Date): NarrativeEvent[] {
  return EVENTS.filter(e => {
    const d = new Date(e.timestamp);
    return d >= start && d <= end;
  });
}

/** Get events by type */
export function getEventsByType(type: NarrativeEvent['type']): NarrativeEvent[] {
  return EVENTS.filter(e => e.type === type);
}
