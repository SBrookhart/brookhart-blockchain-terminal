import type { Narrative } from '../types';

/**
 * Curated crypto narratives — the core of the terminal.
 *
 * Each narrative represents a capital-driving thesis in crypto.
 * Status tracks its lifecycle: emerging → heating → peak → cooling → dead.
 *
 * Every narrative includes:
 *   - thesis: one-paragraph summary of the trade
 *   - analysis: deeper editorial on why it matters RIGHT NOW
 *   - sources: links to reputable articles for deeper reading
 *   - catalysts/risks: specific, current, cited where possible
 *
 * Last updated: 2026-02-27
 */
export const NARRATIVES: Narrative[] = [
  // ============================================================
  // AI AGENTS — "AgentFi"
  // ============================================================
  {
    id: 'ai-agents',
    name: 'AI Agents (AgentFi)',
    status: 'heating',
    thesis: 'Autonomous AI agents that hold wallets, manage portfolios, execute trades, and interact with DeFi protocols without human input. The convergence of LLMs and on-chain infrastructure is creating an entirely new class of economic actor.',
    analysis: `We've crossed a line. In 2026, AI agents aren't advising traders — they ARE traders. MoonPay launched "MoonPay Agents" on Feb 24, a non-custodial layer that lets AI agents create wallets, manage funds, and trade autonomously after a user completes identity checks. Coinbase's x402 payment protocol has processed over $50M in cumulative agentic payments. ERC-8004 (finalized August 2025) established identity registries for autonomous agents, with 24,000+ registrations.

The cautionary tale is just as important: on February 22, an autonomous agent called "Lobstar Wilde" sent 52.4 million tokens (~5% of total supply, worth $250K) to a random user who posted a sob story about a sick uncle. The agent had wallet access with no human override. This is the frontier — enormous potential paired with irreversible, unaudited decisions.

Solana dominates high-frequency agent trading via the GOAT framework (sub-cent fees enable "ant agents" doing 100+ microtransactions). Ethereum/Base hosts the heavy treasury management via ERC-4337 account abstraction. The SEC is evaluating whether agents acting as investment advisers trigger registration requirements — regulatory clarity here will determine whether this narrative goes mainstream or gets kneecapped.`,
    chains: ['Ethereum', 'Solana', 'Base'],
    protocols: ['Autonolas', 'Virtuals Protocol', 'AI16Z', 'MoonPay Agents'],
    tokens: ['OLAS', 'VIRTUAL', 'AI16Z', 'FET', 'RNDR'],
    tvlTotal: 6_500_000_000,
    tvlChange7d: 8.1,
    socialScore: 88,
    riskLevel: 'high',
    startDate: '2024-11-01',
    keyMetrics: [
      { label: 'Agent Registrations (ERC-8004)', value: '24,000+' },
      { label: 'x402 Cumulative Volume', value: '$50M+' },
      { label: 'Est. Market (2030)', value: '$30T' },
    ],
    catalysts: [
      'MoonPay Agents launched Feb 24 — non-custodial AI wallet management for verified users',
      'Coinbase x402 protocol crossed $50M in agentic payments, with AWS and Stripe integrations',
      'ERC-8004 identity standard enables cross-protocol agent reputation tracking (24K+ registered)',
      'Ethereum EIP-7702 session permissions let agents operate with scoped access while keys stay in hardware wallets',
    ],
    risks: [
      'Lobstar Wilde incident (Feb 22): autonomous agent sent $250K in tokens to a random user — no human override existed',
      'SEC evaluating whether agents managing funds trigger investment adviser registration requirements',
      'Most "AgentFi" products remain semi-autonomous; fully autonomous capital management is unproven at scale',
      'Market manipulation risk: AI agents can coordinate across platforms, amplify flash crashes, and exploit 24/7 fragmented markets',
    ],
    sources: [
      { name: 'Coincub', url: 'https://coincub.com/blog/crypto-ai-agents/', date: '2026-02-15' },
      { name: 'Crypto.news', url: 'https://crypto.news/moonpay-launches-ai-agents-non-custodial-wallets-2026/', date: '2026-02-24' },
      { name: 'Technology.org', url: 'https://www.technology.org/2026/02/05/ethereums-decentralized-ai-revolution-surges-as-agentic-standards-transform-2026/', date: '2026-02-05' },
      { name: 'CCN', url: 'https://www.ccn.com/education/crypto/ai-agent-sends-5-percent-memecoin-supply-250k-lobstar-wilde-incident/', date: '2026-02-23' },
      { name: 'PANews (AgentFi Report)', url: 'https://www.panewslab.com/en/articles/019c9473-0a16-75cc-a061-6288f7ddb643', date: '2026-02-10' },
    ],
  },

  // ============================================================
  // RESTAKING & AVS
  // ============================================================
  {
    id: 'restaking',
    name: 'Restaking & AVS',
    status: 'peak',
    thesis: 'Reusing staked ETH to secure additional protocols (AVSs) via EigenLayer. One asset, many yields. The restaking economy has become one of Ethereum\'s most consequential infrastructure layers — but the EIGEN token has lost 91% of its value.',
    analysis: `EigenLayer is the 800-pound gorilla: ~$19.5B in TVL, representing 85%+ of the entire restaking market. But there's a widening gap between protocol success and token price. EIGEN fell 91% in 2025, losing nearly $700M in market cap. On Feb 1, 2026, 36.8 million EIGEN tokens ($12.3M) unlocked — over 2% of total supply — adding selling pressure.

The protocol itself is evolving fast. EigenCloud is pivoting from "restaking middleware" to "verifiable cloud infrastructure," integrating with Polymarket and attracting $170M in ETH from entities like SharpLink for AI yield systems. Vertical AVSs (VAVSs) now specialize in validating specific data types — like verifying AI model correctness off-chain. An Incentives Committee launching in early 2026 will implement ELIP-12: directing emissions and routing fees to EIGEN buybacks.

Competition is real. Symbiotic and Karak emerged as alternatives in 2025, and EigenLayer's "too big to fail" risk is a concern: if multiple AVSs rely on the same validator set and a large validator gets penalized, several services degrade simultaneously. The yield is currently ~4.24% in EIGEN plus WETH rewards, with leveraged looping strategies reaching 15-20% (extremely risky in volatile markets). This narrative is at peak — enormous TVL, but the token economics need the fee-switch proposal to work.`,
    chains: ['Ethereum'],
    protocols: ['EigenLayer', 'Ether.fi', 'Renzo', 'Puffer', 'Kelp', 'Symbiotic'],
    tokens: ['EIGEN', 'ETHFI', 'REZ'],
    tvlTotal: 19_500_000_000,
    tvlChange7d: -2.1,
    socialScore: 52,
    riskLevel: 'medium',
    startDate: '2023-06-01',
    keyMetrics: [
      { label: 'EigenLayer TVL', value: '$19.5B' },
      { label: 'Market Share', value: '85%+' },
      { label: 'EIGEN Price Decline (2025)', value: '-91%' },
      { label: 'Base Yield', value: '~4.24%' },
    ],
    catalysts: [
      'EigenCloud pivoting to "verifiable cloud" infrastructure with Polymarket integration and AI compute',
      'ELIP-12 fee proposal: route AVS fees to EIGEN buybacks, creating real token demand',
      'Vertical AVSs (VAVSs) emerging for specialized validation — AI model verification, oracle data',
      'Multi-chain AVS support lets developers deploy across chains with Ethereum-level security',
    ],
    risks: [
      'EIGEN token down 91% in 2025 — massive gap between protocol TVL and token value',
      '36.8M EIGEN ($12.3M) unlocked Feb 1, 2026 — over 2% of supply, 6.75% of market cap',
      '"Too big to fail" risk: correlated AVS failures if major validators get slashed',
      'Symbiotic and Karak competing for restaking share; EigenLayer dominance not guaranteed',
      'Leveraged restaking loops (15-20% yield) amplify losses during sharp market swings',
    ],
    sources: [
      { name: 'Mitosis University', url: 'https://university.mitosis.org/eigenlayers-restaking-economy-hits-25b-tvl-too-big-to-fail/', date: '2026-01-20' },
      { name: 'CoinDesk', url: 'https://www.coindesk.com/business/2025/12/19/foundation-behind-restaking-protocol-eigenlayer-plans-bigger-rewards-for-active-users', date: '2025-12-19' },
      { name: 'AInvest', url: 'https://www.ainvest.com/news/eigenlayer-eigen-early-2026-strategic-buy-rebalancing-portfolios-post-alt-season-era-2601/', date: '2026-01-15' },
      { name: 'Exmon Academy', url: 'https://academy.exmon.pro/restaking-guide-2026-double-your-crypto-yield-with-eigenlayer', date: '2026-02-01' },
    ],
  },

  // ============================================================
  // RWA TOKENIZATION
  // ============================================================
  {
    id: 'rwa-tokenization',
    name: 'RWA Tokenization',
    status: 'heating',
    thesis: 'Bringing traditional financial assets — treasuries, bonds, real estate, private credit — on-chain. BlackRock\'s BUIDL fund has become the benchmark. The GENIUS Act provided regulatory clarity, and tokenized treasuries are now accepted as collateral on major derivatives exchanges.',
    analysis: `This is the narrative with the strongest structural tailwinds. RWA tokenized value has soared from $1.2B in 2023 to $25.26B in 2026 — a 308% increase in three years. Tokenized U.S. Treasuries alone surged 50x from early 2024 to reach $7-9B by January 2026.

BlackRock's BUIDL fund is the centerpiece: $1.8B+ in assets, $100M+ in cumulative dividends distributed, yielding 3.5-4% APY with a stable $1.00 token price. It's now accepted as collateral on Deribit and Binance, and backs Ethena's USDtb stablecoin. BlackRock COO Rob Goldstein called blockchain "the biggest financial breakthrough since double-entry bookkeeping." That's not a crypto native hyping their bags — that's the world's largest asset manager.

The GENIUS Act (signed July 2025) was the unlock. It created the first federal stablecoin framework with reserve requirements and audit standards, repositioning stablecoins from experimental to regulated infrastructure. The FDIC is now proposing procedures for banks to issue stablecoins. Goldman Sachs and BNY Mellon launched tokenized money-market funds. At Consensus Hong Kong 2026, leaders from Mastercard and Robinhood highlighted tokenized treasuries as their priority.

If stablecoins are the checking accounts of crypto, tokenized treasuries have become the savings accounts — and increasingly, the prime collateral. McKinsey projects $2T in tokenized assets by 2030. Ripple and BCG forecast $18.9T by 2033.`,
    chains: ['Ethereum', 'Polygon', 'Avalanche', 'Solana'],
    protocols: ['BlackRock BUIDL', 'Ondo Finance', 'Maple Finance', 'Centrifuge', 'Franklin Templeton'],
    tokens: ['ONDO', 'MKR', 'MPL', 'CFG'],
    tvlTotal: 25_260_000_000,
    tvlChange7d: 2.4,
    socialScore: 72,
    riskLevel: 'low',
    startDate: '2024-03-01',
    keyMetrics: [
      { label: 'Total RWA On-Chain', value: '$25.3B' },
      { label: 'Tokenized Treasuries', value: '$7-9B' },
      { label: 'BUIDL AUM', value: '$1.8B+' },
      { label: 'Growth (3yr)', value: '+308%' },
    ],
    catalysts: [
      'GENIUS Act (July 2025) created first federal stablecoin framework — full implementation due July 2026',
      'BlackRock BUIDL accepted as collateral on Deribit and Binance; backs Ethena USDtb stablecoin',
      'Goldman Sachs + BNY Mellon launched tokenized money-market funds on-chain',
      'FDIC proposing procedures for bank stablecoin issuance — banks want in',
      'McKinsey projects $2T tokenized market by 2030; Ripple/BCG forecast $18.9T by 2033',
    ],
    risks: [
      'Tension between banks and crypto firms on yield-bearing stablecoin regulation (GENIUS Act loopholes)',
      'Market structure bill still pending — 50-60% odds of passing in 2026, political headwinds from midterms',
      'Most RWA products remain "permissioned" — limited DeFi composability vs. native crypto assets',
      'Smart contract risk on wrapped real-world assets; legal recourse unclear if bridge/wrapper fails',
    ],
    sources: [
      { name: 'Coinpedia', url: 'https://coinpedia.org/news/tokenized-real-world-assets-rwa-go-mainstream-in-2026/', date: '2026-01-25' },
      { name: 'PistachioFi', url: 'https://www.pistachio.fi/blog/tokenized-treasuries-2026-blackrock-buidl', date: '2026-02-10' },
      { name: 'CoinLaw', url: 'https://coinlaw.io/asset-tokenization-statistics/', date: '2026-02-01' },
      { name: 'Aurpay', url: 'https://aurpay.net/aurspace/rwa-tokenization-2026/', date: '2026-01-30' },
      { name: 'Bitcoin Ethereum News', url: 'https://bitcoinethereumnews.com/crypto/cryptos-rwa-revolution-25b-market-37-growth-institutional-flows/', date: '2026-02-15' },
    ],
  },

  // ============================================================
  // SOLANA MEMECOINS
  // ============================================================
  {
    id: 'sol-memecoins',
    name: 'Solana Memecoins',
    status: 'cooling',
    thesis: 'Pump.fun turned Solana into the memecoin factory — 15.3 million tokens launched, 28.7 million addresses. But volumes collapsed 80% from Jan 2025 to Dec 2025, and the platform is pivoting to "Pump Ventures" to survive the narrative fatigue.',
    analysis: `The numbers tell a story of peak-and-fade. Pump.fun's monthly volume dropped from $11.75B in January 2025 to $2.43B by December 2025. But then came the January 2026 revival: PumpSwap hit a record $1.28B in 24-hour volume, and daily DEX volume touched $2B. Memecoins recaptured 63% of Solana's total DEX volume.

The platform is evolving out of necessity. In January 2026, Pump.fun launched "Pump Ventures" — its first investment arm — alongside a $3M hackathon backing 12 early-stage teams at $250K each ($10M valuations). Co-founder Alon Cohen hints at transforming from "memecoin launchpad" into a "decentralized social and creator hub." It's an acknowledgment that pure memecoin launches are a race to zero — 600 new tokens daily, with vanishingly few surviving past 48 hours.

The ecosystem has mutated. AI-agent memecoins (pippin, Fartcoin) use BabyAGI frameworks for 24/7 social media interaction. PolitiFi tokens (TRUMP, MELANIA) trade as high-beta proxies for midterm election sentiment. Firedancer (Solana's new validator client) enables sub-cent fees and near-instant finality, making Solana the undisputed home for high-frequency meme trading.

A looming risk: blockchain investigator ZachXBT announced a "major investigation" into insider trading at a "profitable crypto business" dropping Feb 26. Polymarket gave Pump.fun 10-16% odds of being the target. Smart money wallets reduced PUMP holdings by 35% in 24 hours.`,
    chains: ['Solana'],
    protocols: ['Pump.fun', 'PumpSwap', 'Raydium', 'Jupiter'],
    tokens: ['PUMP', 'WIF', 'BONK', 'POPCAT'],
    tvlTotal: 2_800_000_000,
    tvlChange7d: -3.8,
    socialScore: 65,
    riskLevel: 'high',
    startDate: '2024-01-01',
    keyMetrics: [
      { label: 'Tokens Launched', value: '15.3M' },
      { label: 'Total Addresses', value: '28.7M' },
      { label: 'PumpSwap ATH (24h)', value: '$1.28B' },
      { label: 'Vol Decline (Peak-Trough)', value: '-80%' },
    ],
    catalysts: [
      'PumpSwap hit $1.28B 24h volume record in Jan 2026; memecoins recaptured 63% of Solana DEX volume',
      'Pump Ventures fund launched with $3M hackathon — 12 teams at $250K each, platform pivot to creator hub',
      'AI-agent memecoins (pippin, Fartcoin) adding autonomous social interaction via BabyAGI frameworks',
      'Firedancer validator client makes Solana sub-cent fees permanent — cements memecoin infrastructure advantage',
    ],
    risks: [
      'ZachXBT insider trading investigation (Feb 26) — Polymarket gives Pump.fun 10-16% odds of being the target',
      'Monthly volume collapsed 80% (Jan 2025 to Dec 2025) before partial recovery; narrative fatigue is real',
      '99%+ of launched tokens go to zero within 48 hours; fee generation doesn\'t scale with volume ($2.98M on $2B days)',
      'PUMP token at $0.0018 — smart money reduced holdings 35% in 24 hours on investigation news',
    ],
    sources: [
      { name: 'CoinDesk', url: 'https://www.coindesk.com/markets/2026/01/06/solana-memecoin-frenzy-sends-pumpswap-trading-volume-to-record-usd1-2-billion', date: '2026-01-06' },
      { name: 'BeInCrypto', url: 'https://beincrypto.com/pump-funs-dex-volume-hits-a-new-ath/', date: '2026-01-08' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/pump-fun-launches-pump-ventures-144911250.html', date: '2026-01-18' },
      { name: 'AMBCrypto', url: 'https://ambcrypto.com/pump-rallies-as-pump-fun-usage-doubles-can-solana-ride-the-memecoin-wave/', date: '2026-02-10' },
    ],
  },

  // ============================================================
  // L2 WARS
  // ============================================================
  {
    id: 'l2-wars',
    name: 'L2 Wars',
    status: 'heating',
    thesis: 'The Ethereum L2 shakeout is here. Base and Arbitrum control 75%+ of all L2 TVL. Over 50 rollups launched, but most are becoming "zombie chains." The winners were decided by distribution, not technology.',
    analysis: `The L2 landscape has consolidated faster than almost anyone predicted. According to 21Shares, just three networks — Base, Arbitrum, and Optimism — process nearly 90% of all L2 transactions. Base alone handles over 60%.

Base is the undeniable story. TVL rose from $3.1B in January 2025 to a peak above $5.6B in October — 46.6% of all L2 DeFi TVL. It processes 11.57M transactions daily with 663K active addresses. The secret isn't technology — it's Coinbase's 100M+ user distribution. When Coinbase launched USDC lending via Morpho (10.8% APY) directly in its app, liquidity flooded onto Base. This is the "distribution moat" thesis: the L2 with the most users wins, and Coinbase has more users than every other L2's parent company combined.

Arbitrum holds steady at $2.8B TVL (31% of L2 DeFi), positioned as the institutional DeFi center — deepest liquidity for GMX, Uniswap, Pendle, and the broadest Aave deployment outside mainnet. Enterprise rollups emerged in 2025: Kraken (INK), Uniswap (UniChain), Sony (Soneium), Robinhood (Arbitrum rails). All four chose OP Stack or Arbitrum over newer alternatives.

The losers are brutal. Blast's TVL collapsed 97%. Kinto shut down. Loopring closed its wallet. Even blue-chip protocols like Aave and Synthetix are scaling back deployments on struggling chains. 21Shares predicts most L2s won't survive past 2026. Analysts project L2 TVL will exceed Ethereum L1 DeFi TVL by Q3 2026 ($150B vs $130B).`,
    chains: ['Base', 'Arbitrum', 'Optimism', 'Scroll', 'zkSync'],
    protocols: ['Aerodrome', 'GMX', 'Uniswap', 'Morpho', 'Pendle'],
    tokens: ['ARB', 'OP'],
    tvlTotal: 12_000_000_000,
    tvlChange7d: 3.2,
    socialScore: 61,
    riskLevel: 'medium',
    startDate: '2023-03-01',
    keyMetrics: [
      { label: 'Base TVL Share', value: '46.6%' },
      { label: 'Base Daily Txns', value: '11.57M' },
      { label: 'Arbitrum TVL', value: '$2.8B' },
      { label: 'Zombie Chains', value: '50+' },
    ],
    catalysts: [
      'Base processing 11.57M daily transactions with 663K active addresses — consumer scale achieved',
      'Coinbase USDC lending (10.8% APY via Morpho) driving massive liquidity inflow to Base',
      'Enterprise rollups: Kraken (INK), Uniswap (UniChain), Sony (Soneium), Robinhood (Arbitrum rails)',
      'L2 TVL projected to exceed Ethereum L1 DeFi TVL by Q3 2026 ($150B vs $130B)',
    ],
    risks: [
      'Blast TVL collapsed 97%; Kinto shut down; Loopring closed wallet — zombie chain risk is existential',
      'Extreme concentration: Base + Arbitrum = 75%+ of TVL; if either stumbles, L2 narrative suffers',
      'Centralized sequencers remain a trust assumption — no L2 has fully decentralized sequencing yet',
      'Aave, Synthetix scaling back deployments on struggling chains — protocol fragmentation accelerating',
    ],
    sources: [
      { name: 'The Block', url: 'https://www.theblock.co/post/383329/2026-layer-2-outlook', date: '2026-01-15' },
      { name: 'EarnPark', url: 'https://earnpark.com/en/posts/ethereum-layer-2-wars-why-base-arbitrum-optimism-are-winning-and-50-rollups-are-already-dead/', date: '2026-02-10' },
      { name: 'CoinGape', url: 'https://coingape.com/base-outshines-arbitrum-and-optimism-in-ethereum-l2-tvl-war/', date: '2026-02-05' },
      { name: 'BlockEden', url: 'https://blockeden.xyz/blog/2026/02/01/enterprise-rollup-wars-robinhood-kraken-uniswap-sony-ethereum-l2/', date: '2026-02-01' },
    ],
  },

  // ============================================================
  // BITCOIN DEFI (BTCFi)
  // ============================================================
  {
    id: 'btc-defi',
    name: 'Bitcoin DeFi (BTCFi)',
    status: 'emerging',
    thesis: 'Less than 1% of Bitcoin is in DeFi — leaving over $1.4 trillion economically idle. Babylon ($4.6B TVL) is making BTC a productive asset via staking and trustless collateral, while Stacks and Runes bring smart contracts and fungible tokens to Bitcoin L1.',
    analysis: `The bull case is simple math: Ethereum has $130B+ in DeFi TVL. Bitcoin — with a much larger market cap — has roughly $5-6B. Bitwise's Matt Hougan estimates Bitcoin staking alone represents a $200B market opportunity. Even single-digit percentage points of BTC flowing into DeFi would create tens of billions in new liquidity.

Babylon is the lead horse at $4.6B TVL. It lets BTC holders stake their coins to secure PoS chains, earning 4-8% APY — a meaningful yield on an asset that historically just sat in cold storage. The January 2026 launch of BTCVaults enables native BTC as trustless DeFi collateral using BitVM3 and pre-signed transactions, eliminating the need for custodians or wrapping. Babylon partnered with Aave Labs to bring Bitcoin-backed lending to Aave v4 — testing in early 2026, broader launch planned for April.

But there's a security concern: researchers discovered a vulnerability in Babylon's staking validation logic that could let attackers simulate legitimate stake without locking capital. Some DeFi projects temporarily paused their BTC staking integrations in response. This is the risk of building financial infrastructure on a chain that wasn't designed for it.

Stacks' Nakamoto Upgrade and sBTC (decentralized 1:1 BTC peg) crossed $600M in ecosystem TVL by August 2025. StarkWare launched "Asset Runes" — Bitcoin-native tokens backed by reserves on Starknet, starting with USDC. The OP_CAT proposal and BitVM2 ZK bridges represent the next frontier for native Bitcoin programmability, but both require soft forks that the conservative Bitcoin community may resist.`,
    chains: ['Bitcoin'],
    protocols: ['Babylon', 'Stacks', 'Lightning Network', 'StarkWare'],
    tokens: ['STX', 'BABY', 'ORDI'],
    tvlTotal: 5_600_000_000,
    tvlChange7d: 4.3,
    socialScore: 48,
    riskLevel: 'medium',
    startDate: '2024-01-01',
    keyMetrics: [
      { label: 'Babylon TVL', value: '$4.6B' },
      { label: 'BTC Staked', value: '57,000+' },
      { label: 'BTC in DeFi', value: '<1%' },
      { label: 'Addressable Market', value: '$200B+' },
    ],
    catalysts: [
      'Babylon BTCVaults (Jan 2026): native BTC as trustless collateral via BitVM3 — no wrapping, no custodians',
      'Babylon x Aave Labs partnership: Bitcoin-backed lending on Aave v4 testing now, April launch planned',
      'Stacks sBTC (decentralized 1:1 BTC peg) enabling DeFi without centralized wrappers like WBTC',
      'StarkWare "Asset Runes": Bitcoin-native USDC tokens backed by Starknet reserves',
      'a16z Crypto led $15M investment in Babylon via BABY token purchase',
    ],
    risks: [
      'Security flaw discovered in Babylon staking validation — attackers could simulate stake without locking capital',
      'Bitcoin culture inherently resistant to DeFi complexity; OP_CAT soft fork faces community resistance',
      'L2s (Stacks, Lightning) still centralized in key infrastructure; trust assumptions underappreciated',
      'Wrapped BTC solutions (WBTC) have custodial risk; decentralized alternatives (sBTC) are unproven at scale',
    ],
    sources: [
      { name: 'CoinTelegraph', url: 'https://cointelegraph.com/news/bitcoin-de-fi-takes-center-stage', date: '2026-01-20' },
      { name: 'AInvest', url: 'https://www.ainvest.com/news/babylon-btcvaults-future-native-bitcoin-collateral-defi-2601/', date: '2026-01-15' },
      { name: 'CoinGape', url: 'https://coingape.com/block-of-fame/pulse/babylon-secures-15m-to-push-bitcoin-defi-beyond-wrapped-btc/', date: '2026-01-22' },
      { name: 'Hivemind Capital', url: 'https://www.hivemind.capital/content/betting-on-bitcoin-defi', date: '2026-02-01' },
      { name: 'BTCC', url: 'https://www.btcc.com/en-US/amp/square/Cryptonews/1398177', date: '2026-02-18' },
    ],
  },

  // ============================================================
  // DePIN
  // ============================================================
  {
    id: 'depin',
    name: 'DePIN',
    status: 'emerging',
    thesis: 'Decentralized Physical Infrastructure Networks — using crypto incentives to build real-world infra: wireless (Helium), GPU compute (Render, io.net), mapping, energy, storage. Unlike most crypto narratives, DePIN projects generate actual revenue from real-world usage.',
    analysis: `DePIN crossed a credibility threshold in January 2026. The sector posted real revenue numbers that silenced the "it's just token incentives" criticism: Helium generated $24M in January revenue (driven by logistics and IoT data transactions), Render hit $38M (evolving from rendering tool to AI inference infrastructure amid a global GPU shortage). These aren't token emissions — they're fees paid by actual users for actual services.

The total DePIN market cap reached $19.2B by September 2025, up from $5.2B a year earlier. The World Economic Forum projects $3.5T by 2028. AI-related DePINs dominate by market cap (48%), encompassing decentralized AI training, compute, data scraping, and storage. This AI convergence is the key catalyst — as centralized GPU providers (AWS, Azure) struggle with capacity, decentralized alternatives offering 50-85% cost savings are finding genuine product-market fit.

Helium specifically cleared a major hurdle: the SEC dismissed its lawsuit in April 2025, and the August 2025 halving reduced emissions to 7.5M HNT/year. Network throughput grew 138% quarter-over-quarter. The DeWi (Decentralized Wireless) model has matured — Helium now functions as a supplemental 5G layer for traditional MNOs, alleviating congestion in high-density areas.

The risk isn't technology or regulation (though fragmented global regulation is a real concern) — it's the chicken-and-egg problem. DePIN networks need both supply (node operators) and demand (paying users) simultaneously. Render and Helium cracked this; most others haven't.`,
    chains: ['Solana', 'Ethereum', 'Base'],
    protocols: ['Helium', 'Render Network', 'io.net', 'Hivemapper', 'Grass'],
    tokens: ['HNT', 'RNDR', 'IO', 'MOBILE'],
    tvlTotal: 2_400_000_000,
    tvlChange7d: 1.8,
    socialScore: 42,
    riskLevel: 'medium',
    startDate: '2023-09-01',
    keyMetrics: [
      { label: 'Sector Market Cap', value: '$19.2B' },
      { label: 'Helium Jan Rev', value: '$24M' },
      { label: 'Render Jan Rev', value: '$38M' },
      { label: 'Cost Savings vs Cloud', value: '50-85%' },
    ],
    catalysts: [
      'Helium $24M January revenue from real IoT/logistics usage; network throughput up 138% QoQ',
      'Render $38M January revenue — pivoting from GPU rendering to AI inference amid global GPU shortage',
      'SEC dismissed Helium lawsuit (April 2025); regulatory overhang removed',
      'AI-related DePINs = 48% of sector market cap; convergence of AI compute demand + decentralized supply',
      'World Economic Forum projects DePIN market at $3.5T by 2028',
    ],
    risks: [
      'Chicken-and-egg problem: networks need simultaneous supply (nodes) and demand (users); most haven\'t solved this',
      'Fragmented global regulation — DePIN networks are global by design, but laws remain national',
      'Token incentive sustainability: early revenue growth must outpace emission reduction to avoid death spirals',
      'Hardware costs create high barriers to entry for node operators; capital-intensive vs. pure-software DeFi',
    ],
    sources: [
      { name: 'Grayscale Research', url: 'https://research.grayscale.com/reports/the-real-world-how-depin-bridges-crypto-back-to-physical-systems', date: '2026-02-15' },
      { name: 'QuickNode', url: 'https://www.quicknode.com/builders-guide/best/top-10-decentralized-physical-infrastructure-networks', date: '2026-02-01' },
      { name: 'CoinTribune', url: 'https://www.cointribune.com/en/top-5-depin-crypto-projects-to-watch/', date: '2026-02-10' },
      { name: 'CoinLaunch', url: 'https://coinlaunch.space/blog/top-depin-crypto-projects/', date: '2026-02-05' },
    ],
  },

  // ============================================================
  // DEAD NARRATIVES
  // ============================================================
  {
    id: 'defi-summer',
    name: 'DeFi Summer',
    status: 'dead',
    thesis: 'Yield farming explosion. COMP mining kicked off a frenzy of liquidity mining and food tokens. DeFi TVL went from $1B to $10B in six months.',
    analysis: 'The original crypto narrative cycle. Compound launched COMP token mining in June 2020, and within months an entire ecosystem of yield farming protocols (Yearn, SushiSwap, Curve) emerged. The core innovation — liquidity mining — proved that token incentives could bootstrap protocol usage. The lasting legacy: Uniswap, Aave, and Curve became permanent DeFi infrastructure. The frenzy itself burned out by early 2021 as unsustainable APYs collapsed and gas fees made small-position farming unprofitable.',
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
    sources: [],
  },
  {
    id: 'nft-boom',
    name: 'NFT Boom',
    status: 'dead',
    thesis: 'PFP NFTs as social status. Beeple, BAYC, CryptoPunks. Celebrity adoption. OpenSea hit $5B/month in volume at peak.',
    analysis: 'Beeple\'s $69.3M Christie\'s sale in March 2021 brought NFTs into mainstream consciousness overnight. Bored Ape Yacht Club became a cultural phenomenon — minting at 0.08 ETH, eventually trading above 100 ETH. OpenSea peaked at $5B monthly volume. The crash was equally dramatic: NFT volumes fell 97% from peak, Blur\'s zero-fee model killed OpenSea\'s revenue, and the market consolidated around a tiny number of "blue chip" collections. The lasting legacy: digital ownership infrastructure, creator royalties on-chain, and the lesson that speculative collectibles follow the same boom-bust cycle as every other asset.',
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
    sources: [],
  },
  {
    id: 'algo-stablecoins',
    name: 'Algorithmic Stablecoins',
    status: 'dead',
    thesis: 'Stablecoins without collateral — purely algorithmic pegs. UST/LUNA was the poster child. All have failed catastrophically.',
    analysis: 'The most expensive lesson in crypto history. Terra\'s UST maintained its $1 peg through an algorithmic relationship with LUNA — print LUNA to absorb UST selling pressure, burn LUNA to mint UST demand. It worked until it didn\'t. On May 9, 2022, a large UST withdrawal from Curve triggered a depegging spiral. LUNA hyperinflated from $80 to $0.00001 in 72 hours. $60B+ in value was destroyed. The contagion was devastating: Celsius, Three Arrows Capital, Voyager, and BlockFi all collapsed in the following months. FTX\'s fraud was partially exposed by the liquidity vacuum Terra created. The Terraform Labs estate is now suing Jane Street for allegedly front-running the collapse with inside information — a lawsuit that is one of the biggest crypto stories of February 2026.',
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
    sources: [
      { name: 'Disruption Banking', url: 'https://www.disruptionbanking.com/2026/02/24/jane-street-hit-with-terra-40b-insider-trading-suit/', date: '2026-02-24' },
    ],
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
