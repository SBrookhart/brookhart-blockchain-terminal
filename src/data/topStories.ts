import type { TopStory, WireItem } from '../types';

/**
 * Curated top stories for the Pulse tab.
 *
 * These are manually maintained editorial pieces — the heart of the terminal.
 * Each story blends analysis, education, and factual reporting with links
 * to reputable sources (crypto-native and mainstream finance).
 *
 * Update cadence: refresh stories weekly or when a major event breaks.
 * Last updated: 2026-02-27
 */
export const TOP_STORIES: TopStory[] = [
  // ============================================================
  // 1. JANE STREET — THE BIGGEST STORY IN CRYPTO RIGHT NOW
  // ============================================================
  {
    id: 'jane-street-controversy',
    headline: 'Jane Street Under Fire: Market Manipulation or Convenient Scapegoat?',
    hook: 'The $40B Terraform insider trading lawsuit, a viral "10 AM dump" conspiracy theory, and $566M frozen by Indian regulators — Jane Street Capital is suddenly crypto\'s most controversial firm.',
    analysis: `The facts first: on February 23, Terraform Labs' bankruptcy administrator sued Jane Street, alleging the trading giant used inside information from a former Terraform intern to front-run UST trades in May 2022 — hours before the stablecoin lost its peg and $60 billion evaporated. Jane Street calls the claims "baseless and opportunistic."

But the lawsuit landed on top of a much louder narrative. Since late 2025, retail traders on X have accused Jane Street of running a systematic "10 AM dump" — selling Bitcoin at market open, driving the price from $125K down to $62K, then buying ETF shares at a discount. Charts from December show BTC dropping $2,000 in minutes, liquidating $171M in longs. Jane Street holds roughly $790M in BlackRock's IBIT ETF, and its role as an "authorized participant" gives it the mechanical ability to redeem shares for underlying BTC.

Here's what makes this story important for everyone, not just traders: Jane Street is the infrastructure behind the Bitcoin ETFs that pension funds and 401(k)s are buying. If the firm is manipulating prices, it's a systemic problem. If it isn't — and most Wall Street analysts say the "10 AM dump" is just Nasdaq-correlated risk repricing — then the conspiracy theory itself is moving markets. Bitcoin surged $170B in value after the lawsuit dropped and traders claimed Jane Street "stopped dumping." The firm deleted its entire X timeline days later, adding fuel to the fire.

The deeper context: India's SEBI banned Jane Street in July 2025 and froze $566M for a similar "morning pump, afternoon dump" scheme on Bank Nifty derivatives. And the firm once employed Sam Bankman-Fried and Caroline Ellison before they built (and destroyed) FTX. Whether or not Jane Street is guilty, the pattern of allegations is building — and the crypto market has clearly decided it needs a villain for this bear market.`,
    sources: [
      { name: 'CoinDesk', url: 'https://www.coindesk.com/markets/2026/02/26/why-crypto-x-thinks-jane-street-crashed-bitcoin-and-what-s-actually-behind-the-10-am-slam', date: '2026-02-26' },
      { name: 'Fortune', url: 'https://fortune.com/2026/02/26/bitcoin-slump-jane-street-conspiracy-theory/', date: '2026-02-26' },
      { name: 'Disruption Banking', url: 'https://www.disruptionbanking.com/2026/02/24/jane-street-hit-with-terra-40b-insider-trading-suit/', date: '2026-02-24' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/jane-street-really-doing-terraform-111715480.html', date: '2026-02-26' },
      { name: 'Decrypt', url: 'https://decrypt.co/359182/jane-street-speculation-bitcoin-etf-market-mechanics', date: '2026-02-26' },
    ],
    category: 'market-structure',
    sentiment: 'caution',
    importance: 10,
    date: '2026-02-26',
    relatedNarratives: ['restaking'],
    relatedTokens: ['BTC', 'ETH'],
    tags: ['Jane Street', 'market manipulation', 'Bitcoin ETF', 'Terraform', 'IBIT'],
  },

  // ============================================================
  // 2. THE GREAT FLUSH — $3.8B IN ETF OUTFLOWS
  // ============================================================
  {
    id: 'etf-great-flush',
    headline: 'The Great Flush: Bitcoin ETFs Bleed $3.8 Billion in Historic Outflow Streak',
    hook: 'Five consecutive weeks of outflows — the longest since launch. BlackRock\'s IBIT alone lost $2.1B. Institutions aren\'t buying the dip; they\'re selling into it.',
    analysis: `This is the number that should make you pay attention: $3.8 billion has left U.S. spot Bitcoin ETFs over the past five weeks, the longest sustained outflow since these products launched in January 2024. BlackRock's IBIT — the largest and most liquid Bitcoin ETF — accounted for $2.1 billion of that. Fidelity's FBTC bled another $954 million.

Why it matters: when these ETFs launched, the narrative was "institutions are coming." And they did — $54 billion in cumulative net inflows since launch. But in February 2026, the institutional bid flipped. CryptoQuant confirmed that U.S. spot Bitcoin ETFs went from net buying 46,000 BTC in February 2025 to net selling in February 2026. That's a complete reversal, and it's the clearest signal yet that the smart money is de-risking.

The mechanical story is important too. Much of the outflow isn't "institutions hate crypto" — it's basis-trade unwinding. Hedge funds were running an arbitrage: long ETF, short futures, pocket the spread. As financial conditions tightened and the spread compressed, those trades got unwound. On February 23 alone, ETFs sold 3,010 BTC — seven full days of mining supply dumped in a single session.

But there's a silver lining. Solana ETF products gained $8M on the same day Bitcoin bled $204M. Ether and XRP funds are quietly attracting inflows too. This looks less like "exit crypto" and more like "rotate within crypto." And on February 24, IBIT and FBTC pulled in $258M — the largest single-day inflow in weeks. The flush may be nearing its end, but calling a bottom here requires conviction that macro headwinds are priced in.`,
    sources: [
      { name: 'CoinDesk', url: 'https://www.coindesk.com/markets/2026/02/23/bitcoin-etfs-bleed-usd3-8-billion-in-historic-five-week-outflow-streak', date: '2026-02-23' },
      { name: 'The Block', url: 'https://www.theblock.co/post/390706/spot-bitcoin-etfs-notch-five-straight-weeks-of-outflows-for-first-time-since-march-2025', date: '2026-02-23' },
      { name: 'CoinDesk', url: 'https://www.coindesk.com/markets/2026/02/19/bitcoin-ether-xrp-etfs-bleed-while-solana-bucks-outflow-trend', date: '2026-02-19' },
      { name: 'Outlook India', url: 'https://www.outlookindia.com/xhub/blockchain-insights/the-great-flush-inside-the-38-billion-bitcoin-etf-capitulation', date: '2026-02-24' },
    ],
    category: 'institutional',
    sentiment: 'bearish',
    importance: 9,
    date: '2026-02-23',
    relatedNarratives: ['rwa-tokenization'],
    relatedTokens: ['BTC', 'ETH', 'SOL'],
    tags: ['Bitcoin ETF', 'IBIT', 'institutional flows', 'outflows', 'BlackRock'],
  },

  // ============================================================
  // 3. BITCOIN'S WORST START SINCE RECORDS BEGAN
  // ============================================================
  {
    id: 'btc-bear-market-2026',
    headline: 'Bitcoin Down 47% From Peak: Worst Year-to-Date Start in a Decade',
    hook: 'BTC has fallen from $126K to ~$67K. Ethereum is down 34% YTD. Traders are calling it a new Crypto Winter — but late-February shorts are getting liquidated.',
    analysis: `The numbers are stark: Bitcoin is down roughly 24% year-to-date to about $67,000, and Ethereum has plunged 34% to around $2,000. According to Fortune's analysis of CoinGecko data, these are the worst year-to-date performances on record for both assets. "We're certainly in a Crypto Winter," says Danny Nelson, a research analyst at Bitwise.

The sell-off didn't happen gradually. The first weekend of February — traders labeled it "Black Sunday II" — produced $2.56 billion in single-day liquidations, the 10th largest in crypto history. On February 5, Bitcoin registered a -6.05 sigma move, placing it among the fastest crashes ever recorded. Entity-adjusted realized losses hit $3.2 billion that day, an all-time record.

Six factors compounded at once: Trump's 15% global tariff announcement, a collapse in U.S. tech stocks, record liquidations, a structural reversal in institutional ETF flows (covered in the story above), a critical technical breakdown below Bitcoin's 365-day moving average, and escalating U.S.-Iran tensions after Trump said he'd decide on an Iran strike "in the next 10 days."

But here's the contrarian signal: on February 25, Bitcoin bounced 6% to $68,500, triggering a broad relief rally. ETH, SOL, DOGE, and ADA surged over 10%. Nearly $400 million in short positions were liquidated in 24 hours. The crowd was overwhelmingly bearish and positioned accordingly — which historically is where bottoms form. Whether this is a dead cat bounce or a genuine bottom depends largely on whether the macro headwinds (tariffs, Iran, institutional selling) stabilize.`,
    sources: [
      { name: 'Fortune', url: 'https://fortune.com/2026/02/20/bitcoin-ethereum-price-today-worst-starts-in-history-rebound-in-sight/', date: '2026-02-20' },
      { name: 'CNBC', url: 'https://www.cnbc.com/2026/02/23/bitcoin-falls-to-nearly-64000-as-2026-crypto-woes-continue-.html', date: '2026-02-23' },
      { name: 'Bloomberg', url: 'https://www.bloomberg.com/news/articles/2026-02-21/bitcoin-s-1-trillion-identity-crisis-hits-from-every-direction', date: '2026-02-21' },
      { name: 'VanEck', url: 'https://www.vaneck.com/us/en/blogs/digital-assets/matthew-sigel-what-triggered-bitcoins-major-selloff-in-february-2026/', date: '2026-02-24' },
      { name: 'CoinDesk', url: 'https://www.coindesk.com/markets/2026/02/25/bitcoin-climbs-to-usd67-500-circle-leads-crypto-stocks-higher-as-bounce-strengthens', date: '2026-02-25' },
    ],
    category: 'macro',
    sentiment: 'bearish',
    importance: 9,
    date: '2026-02-25',
    relatedTokens: ['BTC', 'ETH', 'SOL'],
    tags: ['bear market', 'crypto winter', 'liquidations', 'tariffs', 'Black Sunday'],
  },

  // ============================================================
  // 4. CRYPTO REGULATION — THE LEGISLATION NOBODY'S TALKING ABOUT
  // ============================================================
  {
    id: 'crypto-regulation-2026',
    headline: 'While Markets Crash, Washington Is Quietly Building Crypto\'s Legal Foundation',
    hook: 'The GENIUS Act is now law. A market structure bill has 50-60% odds of passing. The SEC and CFTC launched "Project Crypto." This is the most consequential regulatory year in crypto history.',
    analysis: `Here's the story everyone should be paying attention to but isn't: while prices crash and Twitter debates Jane Street conspiracies, Washington is building the legal infrastructure that will define crypto for the next decade.

The GENIUS Act — the first comprehensive federal stablecoin law — was signed by President Trump in July 2025. It created reserve requirements, audit standards, and supervisory pathways for dollar-backed stablecoins. Full implementation is due by July 2026. The FDIC has already proposed procedures for banks to issue stablecoins. This isn't future speculation; it's happening now. Stablecoins are becoming regulated financial infrastructure, and banks want in.

On January 29, 2026, CFTC Chairman Michael Selig and SEC Chairman Paul Atkins jointly announced "Project Crypto" — a coordinated regulatory framework. For the first time, the two agencies that have fought over crypto jurisdiction for years are working together. Meanwhile, the Senate Banking Committee is negotiating a broader market structure bill — the "Clarity Act" — that would define which tokens are securities vs. commodities. Crypto advocacy groups give it 50-60% odds of passing in 2026.

Why this matters for your portfolio: regulatory clarity is the single biggest unlock for institutional capital. The reason BlackRock, Franklin Templeton, and JPMorgan are tokenizing assets on-chain isn't because crypto is cool — it's because they can finally see the legal guardrails. If the market structure bill passes, expect a wave of institutional products that make today's ETFs look quaint. If it stalls (midterm election distractions, government shutdown risks), the uncertainty trade continues.`,
    sources: [
      { name: 'DL News', url: 'https://www.dlnews.com/articles/regulation/key-dates-for-us-crypto-regulation-in-2026/', date: '2026-02-10' },
      { name: 'The Block', url: 'https://www.theblock.co/post/383010/midterms-shutdown-risks-negotiations-can-congress-pass-sweeping-crypto-bill-in-2026', date: '2026-02-15' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/top-us-crypto-bills-watch-100215687.html', date: '2026-02-12' },
      { name: 'Cleary Gottlieb', url: 'https://www.clearygottlieb.com/news-and-insights/publication-listing/2026-digital-assets-regulatory-update-a-landmark-2025-but-more-developments-on-the-horizon', date: '2026-01-15' },
    ],
    category: 'regulation',
    sentiment: 'bullish',
    importance: 8,
    date: '2026-02-15',
    relatedNarratives: ['rwa-tokenization'],
    relatedTokens: ['USDC', 'USDT'],
    tags: ['GENIUS Act', 'stablecoin', 'regulation', 'market structure', 'SEC', 'CFTC'],
  },

  // ============================================================
  // 5. SOLANA'S QUIET INSTITUTIONAL PIVOT
  // ============================================================
  {
    id: 'solana-institutional-pivot',
    headline: 'Solana Is Becoming Wall Street\'s Favorite Chain — While No One\'s Looking',
    hook: 'Solana ETFs gained inflows while Bitcoin bled. Tokenized stocks (QQQ, SPY, NVDA, TSLA) are now live on-chain. The memecoin casino is evolving into financial infrastructure.',
    analysis: `While Bitcoin ETFs hemorrhaged $3.8 billion, something quietly remarkable happened: Solana ETF products attracted net inflows. On February 23, when Bitcoin lost $204M, Solana gained $8M. It's a small number, but the direction matters more than the magnitude.

The bigger story is what's being built on Solana. Tokenized versions of the Nasdaq 100 (QQQ), S&P 500 (SPY), Nvidia, and Tesla shares are now live on the network. This isn't a DeFi experiment — it's an attempt to make Solana the settlement layer for traditional financial assets, leveraging its low fees and high throughput to undercut legacy clearinghouses.

This is a dramatic pivot from Solana's 2024 identity. A year ago, the chain was synonymous with Pump.fun, memecoin rugs, and degen gambling. That hasn't gone away — but it's being overshadowed by institutional interest. The network processed over $200B in DEX volume in recent months, and its DeFi TVL has held steady even as broader markets crashed.

For Solana, the playbook is clear: use memecoins to bootstrap liquidity and attention, then redirect that infrastructure toward real-world financial products. It's working, and it's the kind of narrative shift that creates long-term value — if execution holds up. The risk? Solana's network stability history (multiple outages in 2022-2023) still haunts institutional confidence, and competition from Ethereum L2s is intensifying.`,
    sources: [
      { name: 'CoinDesk', url: 'https://www.coindesk.com/markets/2026/02/19/bitcoin-ether-xrp-etfs-bleed-while-solana-bucks-outflow-trend', date: '2026-02-19' },
      { name: 'The Coin Republic', url: 'https://www.thecoinrepublic.com/2026/02/26/crypto-etfs-dump-240m-as-institutions-rotate-from-bitcoin-into-solana/', date: '2026-02-26' },
      { name: 'OANDA', url: 'https://www.oanda.com/us-en/trade-tap-blog/asset-classes/crypto/mid-month-crypto-update-february-2026/', date: '2026-02-15' },
    ],
    category: 'narrative-shift',
    sentiment: 'bullish',
    importance: 7,
    date: '2026-02-26',
    relatedNarratives: ['sol-memecoins', 'rwa-tokenization'],
    relatedTokens: ['SOL'],
    tags: ['Solana', 'tokenized stocks', 'institutional', 'ETF rotation'],
  },
];

/**
 * News wire items — supplemental headlines from crypto and finance press.
 *
 * In production, these would be fetched from RSS feeds (CoinDesk, The Block,
 * Bloomberg Crypto, etc.). For now, curated manually to demonstrate the format.
 *
 * TODO: Add RSS fetch from:
 *   - https://www.coindesk.com/arc/outboundfeeds/rss/
 *   - https://www.theblock.co/rss
 *   - https://blockworks.co/feed
 */
export const WIRE_ITEMS: WireItem[] = [
  {
    id: 'wire-1',
    headline: 'Bitcoin ETFs post $258M inflow on Feb 24, snapping 5-week outflow streak',
    source: 'CoinDesk',
    url: 'https://www.coindesk.com/markets/2026/02/25/bitcoin-climbs-to-usd67-500-circle-leads-crypto-stocks-higher-as-bounce-strengthens',
    timestamp: '2026-02-25T14:30:00Z',
    category: 'institutional',
  },
  {
    id: 'wire-2',
    headline: 'Jane Street deletes entire X timeline amid mounting allegations',
    source: 'Cryptopolitan',
    url: 'https://www.cryptopolitan.com/jane-street-group-deletes-x-allegations/',
    timestamp: '2026-02-25T11:00:00Z',
    category: 'market-structure',
  },
  {
    id: 'wire-3',
    headline: 'MicroStrategy down 72% from July 2025 peak as BTC exposure weighs',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2026/02/23/bitcoin-falls-to-nearly-64000-as-2026-crypto-woes-continue-.html',
    timestamp: '2026-02-24T16:00:00Z',
    category: 'institutional',
  },
  {
    id: 'wire-4',
    headline: 'SEC and CFTC launch "Project Crypto" for unified regulatory framework',
    source: 'DL News',
    url: 'https://www.dlnews.com/articles/regulation/key-dates-for-us-crypto-regulation-in-2026/',
    timestamp: '2026-02-24T09:00:00Z',
    category: 'regulation',
  },
  {
    id: 'wire-5',
    headline: 'Bitcoin short squeeze liquidates $400M in bearish bets as BTC rebounds to $68.5K',
    source: 'CoinDesk',
    url: 'https://www.coindesk.com/markets/2026/02/25/bitcoin-climbs-to-usd67-500-circle-leads-crypto-stocks-higher-as-bounce-strengthens',
    timestamp: '2026-02-25T18:00:00Z',
    category: 'macro',
  },
  {
    id: 'wire-6',
    headline: 'Brazil crypto firm licensing regime takes effect, mandating AML compliance',
    source: 'TRM Labs',
    url: 'https://www.trmlabs.com/reports-and-whitepapers/global-crypto-policy-review-outlook-2025-26',
    timestamp: '2026-02-02T10:00:00Z',
    category: 'regulation',
  },
  {
    id: 'wire-7',
    headline: 'Solana tokenized stocks (QQQ, SPY, NVDA) see $12M first-week volume',
    source: 'OANDA',
    url: 'https://www.oanda.com/us-en/trade-tap-blog/asset-classes/crypto/mid-month-crypto-update-february-2026/',
    timestamp: '2026-02-22T13:00:00Z',
    category: 'narrative-shift',
  },
  {
    id: 'wire-8',
    headline: 'Trump threatens Iran strike "in the next 10 days," adding to macro uncertainty',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2026/02/23/bitcoin-falls-trump-tariffs.html',
    timestamp: '2026-02-23T08:30:00Z',
    category: 'macro',
  },
  {
    id: 'wire-9',
    headline: 'Senate Banking Committee targets early 2026 markup for digital asset market structure bill',
    source: 'The Block',
    url: 'https://www.theblock.co/post/383010/midterms-shutdown-risks-negotiations-can-congress-pass-sweeping-crypto-bill-in-2026',
    timestamp: '2026-02-20T15:00:00Z',
    category: 'regulation',
  },
  {
    id: 'wire-10',
    headline: 'Crypto theft reaches $3.4B in 2025; Bybit hack alone accounted for $1.5B',
    source: 'Chainalysis',
    url: 'https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2026/',
    timestamp: '2026-02-18T12:00:00Z',
    category: 'security',
  },
];

/** Get stories sorted by importance */
export function getTopStories(): TopStory[] {
  return [...TOP_STORIES].sort((a, b) => b.importance - a.importance);
}

/** Get wire items sorted by timestamp (newest first) */
export function getWireItems(): WireItem[] {
  return [...WIRE_ITEMS].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}
