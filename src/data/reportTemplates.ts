import type { Narrative, TokenPrice, ChainData } from '../types';
import { formatLargeNumber, formatPercent } from '../utils/format';

// ============================================================
// Executive Summary — Narrative Bullet Generator
//
// Takes live market data and curated narratives, returns 7-8
// story-first bullets that tell a lay person "what's happening
// in crypto right now."
//
// Each bullet: bold headline + 2-3 educational sentences.
// Jargon is either avoided or explained inline.
// ============================================================

export interface SummaryBullet {
  headline: string;
  body: string;
  sentiment: 'bullish' | 'bearish' | 'neutral' | 'caution';
}

export interface SummaryInput {
  globalData: {
    total_market_cap: number;
    total_volume: number;
    market_cap_change_percentage_24h: number;
    btc_dominance: number;
  };
  narratives: Narrative[];
  chains: ChainData[];
  topTokens: TokenPrice[];
}

/**
 * Generate the executive summary narrative bullets.
 *
 * Story arc:
 *   1. The big picture (market overview)
 *   2. Bitcoin's role (BTC price + dominance explained)
 *   3. The hottest narrative (what everyone's talking about)
 *   4. What else is gaining (secondary momentum)
 *   5. Where the money is flowing (chain activity)
 *   6. What's cooling off (fading narratives)
 *   7. Risk check (high-risk warnings)
 *   8. On the horizon (emerging themes)
 */
export function generateExecutiveSummary(input: SummaryInput): SummaryBullet[] {
  const { globalData, narratives, chains, topTokens } = input;
  const bullets: SummaryBullet[] = [];

  // ---- Sort and categorize narratives ----
  const active = narratives
    .filter(n => n.status !== 'dead')
    .sort((a, b) => b.socialScore - a.socialScore);

  const heating = active.filter(n => n.status === 'heating' || n.status === 'peak');
  const cooling = active.filter(n => n.status === 'cooling');
  const emerging = active.filter(n => n.status === 'emerging');
  const hottest = active[0];

  // ---- Top chains by 7d growth ----
  const growingChains = [...chains]
    .filter(c => (c.change_7d ?? 0) > 0)
    .sort((a, b) => (b.change_7d ?? 0) - (a.change_7d ?? 0));

  // ---- Key tokens ----
  const btc = topTokens.find(t => t.symbol.toLowerCase() === 'btc');

  // ============================================================
  // 1. THE BIG PICTURE
  // ============================================================
  const mcapChange = globalData.market_cap_change_percentage_24h;
  const marketMood =
    mcapChange > 2 ? 'surging'
    : mcapChange > 0 ? 'growing steadily'
    : mcapChange > -2 ? 'pulling back slightly'
    : 'dropping';

  const marketContext =
    mcapChange > 1
      ? 'Momentum is building and traders are leaning optimistic.'
    : mcapChange > 0
      ? 'A steady day with no major shocks — the market is holding its ground.'
    : mcapChange > -2
      ? 'Nothing alarming, but risk appetite has cooled a bit.'
    : 'Fear is creeping in and traders are pulling back from risky bets.';

  bullets.push({
    headline: 'The Big Picture',
    body: `The total crypto market is worth ${formatLargeNumber(globalData.total_market_cap)}, ${mcapChange >= 0 ? 'up' : 'down'} ${formatPercent(Math.abs(mcapChange)).replace('+', '')} in the last 24 hours. About ${formatLargeNumber(globalData.total_volume)} worth of crypto changed hands today across all exchanges — that's the daily trading volume, and it gives you a sense of how active the market is. Overall, the market is ${marketMood}. ${marketContext}`,
    sentiment: mcapChange > 1 ? 'bullish' : mcapChange < -1 ? 'bearish' : 'neutral',
  });

  // ============================================================
  // 2. BITCOIN'S ROLE
  // ============================================================
  if (btc) {
    const dominanceExplainer =
      globalData.btc_dominance > 55
        ? 'That\'s relatively high, which usually means investors are playing it safe — parking money in Bitcoin rather than taking bets on smaller, riskier projects.'
      : globalData.btc_dominance > 45
        ? 'That\'s a balanced level, meaning money is flowing into both Bitcoin and riskier projects — generally a sign of a healthy, confident market.'
      : 'That\'s relatively low, meaning investors are feeling bold and rotating money into smaller projects chasing bigger returns. More opportunity, but also more risk.';

    bullets.push({
      headline: 'Bitcoin Is Setting the Tone',
      body: `Bitcoin is trading at $${btc.current_price.toLocaleString()}, ${btc.price_change_percentage_24h >= 0 ? 'up' : 'down'} ${formatPercent(Math.abs(btc.price_change_percentage_24h)).replace('+', '')} today. It currently accounts for ${globalData.btc_dominance.toFixed(1)}% of the entire crypto market — a number called "BTC dominance" that tells you where investors' heads are at. ${dominanceExplainer}`,
      sentiment: btc.price_change_percentage_24h >= 0 ? 'bullish' : 'bearish',
    });
  }

  // ============================================================
  // 3. THE HOTTEST NARRATIVE
  // ============================================================
  if (hottest) {
    const tvlExplainer =
      hottest.tvlTotal > 10_000_000_000
        ? `with ${formatLargeNumber(hottest.tvlTotal)} deposited into its projects (think of this like total deposits at a bank — the more money locked in, the more people trust it)`
        : `with ${formatLargeNumber(hottest.tvlTotal)} deposited across its projects`;

    const buzzExplainer =
      hottest.socialScore > 80
        ? 'meaning it\'s dominating the conversation on crypto social media right now'
      : hottest.socialScore > 60
        ? 'meaning it\'s getting serious attention online'
      : 'a solid amount of interest, though not yet mania-level';

    bullets.push({
      headline: `${hottest.name} Is the Hottest Trade Right Now`,
      body: `The most talked-about theme in crypto is ${hottest.name}, ${tvlExplainer}. ${hottest.thesis} It's ${hottest.tvlChange7d >= 0 ? 'up' : 'down'} ${formatPercent(Math.abs(hottest.tvlChange7d)).replace('+', '')} this week, with a social buzz score of ${hottest.socialScore}/100 — ${buzzExplainer}.`,
      sentiment: hottest.tvlChange7d > 0 ? 'bullish' : 'neutral',
    });
  }

  // ============================================================
  // 4. WHAT ELSE IS GAINING
  // ============================================================
  const secondNarrative =
    heating.find(n => n.id !== hottest?.id) ||
    active.find(n => n.id !== hottest?.id && n.tvlChange7d > 0);

  if (secondNarrative) {
    const riskNote =
      secondNarrative.riskLevel === 'low'
        ? 'This is considered a lower-risk theme, with institutional players like BlackRock getting involved.'
      : secondNarrative.riskLevel === 'medium'
        ? 'Risk level is moderate — solid projects exist here, but always do your own research.'
      : 'Fair warning: this space is high-risk and moves fast.';

    bullets.push({
      headline: `${secondNarrative.name} Is Quietly Building Momentum`,
      body: `Beyond the top story, ${secondNarrative.name} is also gaining ground. ${secondNarrative.thesis} It's grown ${formatPercent(Math.abs(secondNarrative.tvlChange7d)).replace('+', '')} this week to ${formatLargeNumber(secondNarrative.tvlTotal)} in total deposits, with key activity on ${secondNarrative.chains.slice(0, 3).join(', ')}. ${riskNote}`,
      sentiment: secondNarrative.tvlChange7d > 0 ? 'bullish' : 'neutral',
    });
  }

  // ============================================================
  // 5. WHERE THE MONEY IS FLOWING (CHAINS)
  // ============================================================
  if (growingChains.length >= 3) {
    const top3 = growingChains.slice(0, 3);

    bullets.push({
      headline: 'Where the Money Is Flowing',
      body: `Different blockchains compete for users and money, like platforms competing for app developers. This week, ${top3[0].name} is leading the pack with ${formatPercent(top3[0].change_7d ?? 0)} growth and ${formatLargeNumber(top3[0].tvl)} in total deposits, followed by ${top3[1].name} (${formatPercent(top3[1].change_7d ?? 0)}) and ${top3[2].name} (${formatPercent(top3[2].change_7d ?? 0)}). When money flows into a chain, it usually means new projects are launching there or existing ones are gaining traction.`,
      sentiment: 'bullish',
    });
  }

  // ============================================================
  // 6. WHAT'S COOLING OFF
  // ============================================================
  if (cooling.length > 0) {
    const topCooling = cooling[0];
    const changeText = topCooling.tvlChange7d < 0
      ? `down ${formatPercent(Math.abs(topCooling.tvlChange7d)).replace('+', '')} this week as money exits`
      : 'with momentum visibly slowing';

    bullets.push({
      headline: `${topCooling.name} Is Losing Steam`,
      body: `Not everything is trending up. ${topCooling.name} has been cooling off, ${changeText}. ${topCooling.thesis} When a narrative cools, it doesn't necessarily mean it's dead — it could be shifting from hype-driven speculation to quieter, steadier building. But short-term traders tend to rotate their capital to wherever the next hot theme is.`,
      sentiment: 'bearish',
    });
  }

  // ============================================================
  // 7. RISK CHECK
  // ============================================================
  const highRisk = active.filter(n => n.riskLevel === 'high' && n.status !== 'cooling');
  if (highRisk.length > 0) {
    const riskNames = highRisk.map(n => n.name).join(' and ');
    const topRisk = highRisk[0].risks[0] || '';

    bullets.push({
      headline: 'Risk Check',
      body: `A word of caution: ${riskNames} ${highRisk.length > 1 ? 'are' : 'is'} currently rated high-risk despite being popular.${topRisk ? ` Key concern: ${topRisk.charAt(0).toLowerCase() + topRisk.slice(1)}${topRisk.endsWith('.') ? '' : '.'}` : ''} In crypto, the hottest narratives often carry the most risk — big potential returns come paired with real chances of loss. The general rule: keep position sizes small and never invest more than you can afford to lose.`,
      sentiment: 'caution',
    });
  }

  // ============================================================
  // 8. ON THE HORIZON
  // ============================================================
  if (emerging.length > 0) {
    const emergingNames = emerging.map(n => n.name);
    const first = emerging[0];

    bullets.push({
      headline: 'On the Horizon',
      body: `Worth keeping an eye on: ${emergingNames.join(' and ')} ${emergingNames.length > 1 ? 'are' : 'is'} still in the early "emerging" stage — not yet mainstream, but showing signs of life. ${first.thesis} ${first.name} has ${formatLargeNumber(first.tvlTotal)} invested so far and grew ${formatPercent(first.tvlChange7d)} this week. These early-stage themes are where the biggest opportunities (and biggest risks) live — they could become the next major narrative, or they could fizzle out entirely.`,
      sentiment: 'neutral',
    });
  }

  return bullets;
}
