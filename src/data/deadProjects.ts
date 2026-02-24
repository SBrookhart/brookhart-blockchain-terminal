import type { DeadProject } from '../types';

/**
 * Memorial for failed/collapsed projects.
 * The Dead Zone — a graveyard of capital destruction.
 */
export const DEAD_PROJECTS: DeadProject[] = [
  {
    id: 'terra-luna',
    name: 'Terra/LUNA',
    sector: 'eth-defi',
    peakTvl: 41.0,
    deathDate: '2022-05-09',
    cause: 'Algorithmic stablecoin death spiral',
    description: 'UST lost its peg, triggering a hyperinflationary collapse of LUNA. $60B in value evaporated in 72 hours. Triggered contagion across the entire industry.',
    amountLost: 60.0,
  },
  {
    id: 'ftx',
    name: 'FTX',
    sector: 'sol-ecosystem',
    peakTvl: 16.0,
    deathDate: '2022-11-11',
    cause: 'Fraud and misappropriation of customer funds',
    description: 'Sam Bankman-Fried secretly funneled $8B+ of customer deposits to Alameda Research. Second-largest exchange collapsed overnight.',
    amountLost: 8.0,
  },
  {
    id: 'celsius',
    name: 'Celsius Network',
    sector: 'eth-defi',
    peakTvl: 24.0,
    deathDate: '2022-06-12',
    cause: 'Insolvency from Terra/3AC contagion',
    description: 'CeFi lender froze all withdrawals. Lost billions through leveraged DeFi positions and 3AC exposure. CEO Alex Mashinsky later charged with fraud.',
    amountLost: 4.7,
  },
  {
    id: 'three-arrows',
    name: 'Three Arrows Capital',
    sector: 'eth-defi',
    peakTvl: 10.0,
    deathDate: '2022-06-27',
    cause: 'Over-leveraged directional bets + Terra exposure',
    description: 'Su Zhu and Kyle Davies\' hedge fund imploded after leveraged LUNA and stETH positions went south. Owed creditors $3.5B.',
    amountLost: 3.5,
  },
  {
    id: 'voyager',
    name: 'Voyager Digital',
    sector: 'eth-defi',
    peakTvl: 5.9,
    deathDate: '2022-07-05',
    cause: '3AC default on $650M loan',
    description: 'Crypto brokerage filed for bankruptcy after Three Arrows Capital defaulted on a massive loan. Customer funds locked for over a year.',
    amountLost: 1.3,
  },
  {
    id: 'blockfi',
    name: 'BlockFi',
    sector: 'eth-defi',
    peakTvl: 10.0,
    deathDate: '2022-11-28',
    cause: 'FTX contagion',
    description: 'CeFi lender that was "rescued" by FTX in June 2022 filed for bankruptcy weeks after FTX collapsed. Ironic end to a cautionary tale.',
    amountLost: 1.2,
  },
  {
    id: 'iron-finance',
    name: 'Iron Finance / TITAN',
    sector: 'eth-defi',
    peakTvl: 2.0,
    deathDate: '2021-06-16',
    cause: 'Bank run on partially-collateralized stablecoin',
    description: 'TITAN token went from $65 to $0 in hours. Mark Cuban was a notable victim. An early preview of the algorithmic stablecoin risks that would later destroy Terra.',
    amountLost: 2.0,
  },
];

/** Total capital destroyed */
export function getTotalLost(): number {
  return DEAD_PROJECTS.reduce((sum, p) => sum + p.amountLost, 0);
}
