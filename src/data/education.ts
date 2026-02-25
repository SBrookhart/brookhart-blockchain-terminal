// ============================================================
// Education Content — Learn Tab
//
// Mini-lessons, glossary, chain profiles, and the lifecycle
// of a crypto transaction. Written for a lay person — analogies
// over jargon, always.
// ============================================================

// ---- Glossary Terms ----

export interface GlossaryTerm {
  id: string;
  term: string;
  shortDef: string;
  explanation: string;
  analogy?: string;
  relatedTerms?: string[];
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'blockchain',
    term: 'Blockchain',
    shortDef: 'A shared, tamper-proof ledger that records every transaction.',
    explanation: 'A blockchain is a database that\'s shared across thousands of computers around the world. Every time someone sends crypto, the transaction gets added to a "block" of data. That block gets linked to the previous one, forming a chain — hence "blockchain." Because so many computers hold a copy, no single person can cheat or alter the records.',
    analogy: 'Imagine a Google Doc that the whole world can read, anyone can add to, but nobody can edit or delete what\'s already there. That\'s essentially a blockchain.',
    relatedTerms: ['smart-contract', 'gas-fees', 'node'],
  },
  {
    id: 'smart-contract',
    term: 'Smart Contract',
    shortDef: 'A program on a blockchain that runs automatically when conditions are met.',
    explanation: 'A smart contract is a small program that lives on a blockchain. Once deployed, it runs automatically — no middleman needed. When you interact with DeFi apps like Uniswap, you\'re actually sending instructions to smart contracts. They handle the trade, enforce the rules, and settle everything instantly. The key innovation: the code is public, so anyone can verify exactly what it does before trusting it with their money.',
    analogy: 'Think of a vending machine. You put in $2, press B4, and a snack drops out. The machine enforces the deal automatically — no cashier, no trust required. A smart contract works the same way, but for financial transactions.',
    relatedTerms: ['solidity', 'defi', 'gas-fees', 'blockchain'],
  },
  {
    id: 'solidity',
    term: 'Solidity',
    shortDef: 'The most popular programming language for writing smart contracts on Ethereum.',
    explanation: 'Solidity is a programming language specifically designed for writing smart contracts on Ethereum and other compatible blockchains (like Avalanche, Arbitrum, and Base). It was created in 2014 and has become the dominant language in the crypto ecosystem. Most of the DeFi protocols you interact with — Uniswap, Aave, Compound — are written in Solidity. If you\'ve heard someone say they\'re a "Solidity developer," they build smart contracts. Other chains use different languages: Solana uses Rust, and some newer chains support Move.',
    analogy: 'If blockchains are like operating systems (Windows, Mac, Linux), then Solidity is like a programming language built specifically for one of them. Just as Swift is the language for building iPhone apps, Solidity is the language for building Ethereum apps.',
    relatedTerms: ['smart-contract', 'defi', 'gas-fees'],
  },
  {
    id: 'defi',
    term: 'DeFi (Decentralized Finance)',
    shortDef: 'Financial services built on blockchains instead of banks.',
    explanation: 'DeFi recreates traditional financial services — lending, borrowing, trading, earning interest — using smart contracts instead of banks or brokers. You connect your crypto wallet directly to these protocols and interact with the code. No accounts to open, no paperwork, no waiting. The tradeoff: you\'re responsible for your own security, and if something goes wrong with the code, there\'s no customer support to call.',
    analogy: 'Imagine if you could walk into a bank that had no employees — just machines that lend, borrow, and trade. The rules are posted on the wall for everyone to see, and everything runs 24/7. That\'s DeFi.',
    relatedTerms: ['smart-contract', 'tvl', 'liquidity'],
  },
  {
    id: 'tvl',
    term: 'TVL (Total Value Locked)',
    shortDef: 'The total amount of money deposited into a DeFi protocol.',
    explanation: 'TVL stands for Total Value Locked — it\'s the total amount of crypto that users have deposited into a DeFi protocol or blockchain. It\'s the most common way to measure how popular and trusted a project is. A protocol with $10 billion TVL means people have collectively trusted it with $10 billion of their money. When TVL grows, it usually means the project is gaining confidence. When it drops, people may be pulling their money out.',
    analogy: 'Think of it like total deposits at a bank. The more money people deposit, the more they trust that bank. TVL is the same metric, but for DeFi protocols.',
    relatedTerms: ['defi', 'liquidity'],
  },
  {
    id: 'wallet',
    term: 'Crypto Wallet',
    shortDef: 'Software that stores your private keys and lets you send/receive crypto.',
    explanation: 'A crypto wallet doesn\'t actually "store" your crypto — your coins live on the blockchain. What the wallet stores is your private key, which is like the password that proves you own those coins. There are two main types: "hot wallets" (apps like MetaMask that are connected to the internet, convenient but less secure) and "cold wallets" (hardware devices like Ledger that stay offline, more secure but less convenient).',
    analogy: 'Your wallet is less like a physical wallet and more like the key to a safe deposit box. The box (blockchain) holds your money. The key (wallet) proves it\'s yours and lets you access it.',
    relatedTerms: ['private-key', 'gas-fees'],
  },
  {
    id: 'gas-fees',
    term: 'Gas Fees',
    shortDef: 'The transaction fee you pay to use a blockchain.',
    explanation: 'Every time you do something on a blockchain — send crypto, swap tokens, interact with a smart contract — you pay a small fee called "gas." This fee goes to the people (validators or miners) who process and verify your transaction. Gas fees fluctuate based on demand: when lots of people are using the network, fees go up (like surge pricing). Ethereum is known for high gas fees during busy periods, while chains like Solana and Avalanche are designed to keep fees very low.',
    analogy: 'Gas fees are like postage for your transaction. You\'re paying the network to deliver it. When the post office is busy (high network activity), stamps cost more.',
    relatedTerms: ['blockchain', 'validator'],
  },
  {
    id: 'private-key',
    term: 'Private Key',
    shortDef: 'A secret code that proves ownership of your crypto. Never share it.',
    explanation: 'Your private key is a long string of characters that gives you (and only you) access to your crypto. It\'s generated when you create a wallet and is often represented as a "seed phrase" — 12 or 24 words you write down and store safely. If someone gets your private key, they can steal everything. If you lose it, your crypto is gone forever. There\'s no "forgot password" button in crypto.',
    analogy: 'It\'s like the combination to a vault. Anyone with the combination can open it. There\'s no locksmith who can reset it. Write it down, store it safely, and never share it.',
    relatedTerms: ['wallet'],
  },
  {
    id: 'validator',
    term: 'Validator',
    shortDef: 'A computer that verifies transactions and secures the network.',
    explanation: 'Validators are the backbone of a blockchain. They\'re computers that check every transaction to make sure it\'s legitimate (you actually own the coins you\'re sending, you haven\'t already spent them, etc.). In return for this work, they earn rewards — usually paid in the blockchain\'s native cryptocurrency. On most modern blockchains, validators have to "stake" (lock up) a large amount of crypto as collateral. If they try to cheat, they lose their stake.',
    relatedTerms: ['blockchain', 'staking', 'gas-fees'],
  },
  {
    id: 'staking',
    term: 'Staking',
    shortDef: 'Locking up your crypto to help secure a network and earn rewards.',
    explanation: 'Staking is like putting your crypto to work. You lock it up in a blockchain\'s system, and in return, you earn interest (usually 3-8% annually). Your staked crypto helps secure the network by backing validators. The catch: your crypto is locked for a period, and if the validator you\'re backing misbehaves, you could lose some of it. Many people stake through protocols like Lido that give you a "liquid staking token" so your money isn\'t fully locked.',
    analogy: 'Think of it like a certificate of deposit (CD) at a bank. You lock up money for a period, and the bank pays you interest. Except here, your money is helping secure a global network, not funding loans.',
    relatedTerms: ['validator', 'defi'],
  },
  {
    id: 'liquidity',
    term: 'Liquidity',
    shortDef: 'How easily you can buy or sell an asset without affecting its price.',
    explanation: 'Liquidity measures how easy it is to trade something. Bitcoin has deep liquidity — you can buy or sell millions of dollars worth without moving the price much. A tiny memecoin might have low liquidity — even a small trade can cause the price to swing wildly. In DeFi, users provide liquidity by depositing tokens into "liquidity pools" that other people trade against. In return, they earn a share of the trading fees.',
    analogy: 'Think about selling a house vs. selling a share of Apple stock. The stock sells instantly at market price (high liquidity). The house could take months and you might need to lower the price (low liquidity).',
    relatedTerms: ['tvl', 'defi'],
  },
  {
    id: 'node',
    term: 'Node',
    shortDef: 'A computer that runs blockchain software and stores a copy of all transactions.',
    explanation: 'A node is any computer that participates in a blockchain network. Nodes download and verify every transaction, maintaining a complete copy of the blockchain\'s history. The more nodes a network has, the more decentralized and resilient it is — there\'s no single point of failure. Anyone can run a node, though some blockchains require more expensive hardware than others.',
    relatedTerms: ['blockchain', 'validator'],
  },
  {
    id: 'layer-2',
    term: 'Layer 2 (L2)',
    shortDef: 'A secondary network built on top of a blockchain to make it faster and cheaper.',
    explanation: 'Layer 2s are networks built on top of a main blockchain (usually Ethereum) that handle transactions faster and cheaper, then periodically settle the results back to the main chain. Think of it like this: Ethereum is the courthouse where everything is officially recorded, and L2s are the law offices where most of the actual work happens. Popular L2s include Arbitrum, Base, and Optimism. They inherit Ethereum\'s security while dramatically reducing costs.',
    analogy: 'Ethereum is like a busy highway. Layer 2s are express lanes built on top of it — same destination, but faster and cheaper because there\'s less congestion.',
    relatedTerms: ['blockchain', 'gas-fees'],
  },
  {
    id: 'btc-dominance',
    term: 'BTC Dominance',
    shortDef: 'Bitcoin\'s share of the total crypto market cap.',
    explanation: 'BTC dominance is the percentage of the total crypto market that Bitcoin accounts for. If the crypto market is worth $2 trillion and Bitcoin is worth $1 trillion, BTC dominance is 50%. When dominance rises, it usually means investors are playing it safe — moving money into Bitcoin, the "blue chip" of crypto. When it falls, money is flowing into riskier assets like altcoins and memecoins, which signals higher risk appetite in the market.',
    relatedTerms: ['blockchain'],
  },
  {
    id: 'narrative',
    term: 'Narrative (Crypto)',
    shortDef: 'A dominant investment theme that drives capital and attention in crypto markets.',
    explanation: 'In crypto, a "narrative" is the hot story that everyone is talking about and investing in. Narratives drive markets: when "AI Agents" is the narrative, AI-related tokens pump. When "RWA Tokenization" is trending, those projects attract capital. Narratives have a lifecycle — they emerge, heat up, peak, and eventually cool off. Smart investors try to identify narratives early and rotate out before they peak. This terminal tracks these narrative cycles.',
    relatedTerms: ['defi', 'tvl'],
  },
];

// ---- Transaction Lifecycle ----

export interface TransactionStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const TRANSACTION_LIFECYCLE: TransactionStep[] = [
  {
    step: 1,
    title: 'You Initiate the Transaction',
    description: 'You open your wallet app (like MetaMask) and say "send 1 ETH to this address" or "swap my USDC for ETH." Your wallet creates a transaction and signs it with your private key — proof that you authorized it.',
    icon: '👤',
  },
  {
    step: 2,
    title: 'Transaction Enters the Mempool',
    description: 'Your signed transaction gets broadcast to the network and lands in the "mempool" — a waiting room of pending transactions. Think of it like a queue at the post office. Every transaction waits here until a validator picks it up.',
    icon: '📬',
  },
  {
    step: 3,
    title: 'Validators Pick It Up',
    description: 'Validators (the computers that run the network) select transactions from the mempool, usually prioritizing ones with higher gas fees. This is why paying a higher fee gets your transaction processed faster — you\'re essentially tipping to skip the line.',
    icon: '⚙️',
  },
  {
    step: 4,
    title: 'Validation & Consensus',
    description: 'The validator checks: Do you actually have the funds? Is the transaction properly signed? Are the smart contract rules satisfied? If everything checks out, the validator proposes adding it to the next block. Other validators verify and agree (this is called "consensus").',
    icon: '✅',
  },
  {
    step: 5,
    title: 'Added to a Block',
    description: 'Your transaction gets bundled with others into a "block" — a batch of verified transactions. This block is cryptographically linked to the previous block, extending the chain. On Ethereum, a new block is created roughly every 12 seconds.',
    icon: '🧱',
  },
  {
    step: 6,
    title: 'Confirmation & Finality',
    description: 'Once your transaction is in a block, it\'s confirmed. But most apps wait for a few more blocks to be added on top (called "confirmations") before considering it truly final. More confirmations = more security. After enough confirmations, the transaction is permanent and irreversible — it\'s part of the blockchain forever.',
    icon: '🔒',
  },
];

// ---- Transaction Lifecycle ASCII Diagram ----

export const TRANSACTION_DIAGRAM = `
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   YOU        │     │   MEMPOOL   │     │ VALIDATORS  │
│  (Wallet)    │────▶│  (Waiting   │────▶│ (Verify &   │
│              │     │   Room)     │     │  Approve)   │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  CONFIRMED  │     │   BLOCK     │     │  CONSENSUS  │
│  (Final &   │◀────│ (Bundled    │◀────│ (Network    │
│  Permanent) │     │  together)  │     │  Agrees)    │
└─────────────┘     └─────────────┘     └─────────────┘
`;

// ---- Chain Profiles ----

export interface ChainProfile {
  id: string;
  name: string;
  symbol: string;
  launched: string;
  consensus: string;
  tps: string;
  avgFee: string;
  blockTime: string;
  tvl: string;
  personality: string;
  bestFor: string;
  tradeoffs: string;
  ecosystem: string;
  keyFact: string;
}

export const CHAIN_PROFILES: ChainProfile[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    launched: '2009',
    consensus: 'Proof of Work',
    tps: '~7',
    avgFee: '$1-5',
    blockTime: '~10 minutes',
    tvl: '$5.2B (and growing)',
    personality: 'The original. Bitcoin is the "digital gold" of crypto — the oldest, most secure, and most trusted network. It was designed to do one thing well: be a decentralized, censorship-resistant store of value. It\'s not trying to be a platform for apps.',
    bestFor: 'Long-term store of value, large transfers, censorship resistance. Bitcoin is where institutions and governments are parking serious capital via ETFs.',
    tradeoffs: 'Slow and expensive compared to newer chains. Limited programmability — you can\'t build complex apps on it natively (though Bitcoin L2s and sidechains are changing this).',
    ecosystem: 'Lightning Network (fast payments), Ordinals/BRC-20 (NFTs and tokens on Bitcoin), Stacks (smart contracts), Babylon (Bitcoin staking).',
    keyFact: 'Bitcoin processes about $10 billion in transactions daily and has never been hacked in its 16+ year history. Its total market cap exceeds $1 trillion.',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    launched: '2015',
    consensus: 'Proof of Stake',
    tps: '~15 (L1), 1000s (with L2s)',
    avgFee: '$1-20 (L1), <$0.01 (L2s)',
    blockTime: '~12 seconds',
    tvl: '$60B+',
    personality: 'The world computer. Ethereum was the first blockchain to support smart contracts, which makes it a platform for building apps — not just a currency. Almost everything in DeFi, NFTs, and Web3 was built on Ethereum first. It\'s the most battle-tested smart contract platform.',
    bestFor: 'DeFi, smart contracts, and anything that needs maximum security and decentralization. Most major projects launch on Ethereum first, even if they later expand to other chains.',
    tradeoffs: 'The main chain (Layer 1) can be slow and expensive during high traffic. Ethereum\'s strategy is to offload activity to Layer 2 networks (Arbitrum, Base, Optimism) that are faster and cheaper.',
    ecosystem: 'The largest by far — Uniswap (trading), Aave (lending), Lido (staking), OpenSea (NFTs), plus 40+ Layer 2 networks built on top.',
    keyFact: 'Ethereum hosts over 60% of all DeFi activity. After switching to Proof of Stake in 2022 ("The Merge"), it reduced its energy use by 99.95%.',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    launched: '2020',
    consensus: 'Proof of Stake + Proof of History',
    tps: '~4,000',
    avgFee: '<$0.01',
    blockTime: '~0.4 seconds',
    tvl: '$8B+',
    personality: 'The speed demon. Solana was built from scratch to be blazing fast and dirt cheap. It\'s the chain people go to when they want instant transactions without worrying about fees. This made it the home of memecoin trading, but it\'s also attracting serious DeFi and payments projects.',
    bestFor: 'High-frequency trading, memecoins, consumer apps, payments, and anything where speed and low cost matter more than maximum decentralization.',
    tradeoffs: 'Has had multiple network outages in its history (the chain literally stopped working). Less decentralized than Ethereum — fewer validators and higher hardware requirements to run one. The "move fast and break things" chain.',
    ecosystem: 'Jupiter (trading), Raydium (liquidity), Marinade (staking), Pump.fun (memecoin launches), Tensor (NFTs), and a fast-growing DePIN sector.',
    keyFact: 'Solana processes more daily transactions than Ethereum and all its L2s combined. Pump.fun alone generated over $300M in revenue launching memecoins on Solana.',
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    launched: '2020',
    consensus: 'Avalanche Consensus (novel protocol)',
    tps: '~4,500',
    avgFee: '<$0.10',
    blockTime: '~2 seconds',
    tvl: '$1.5B+',
    personality: 'The enterprise builder. Avalanche\'s unique feature is "subnets" — custom blockchains that companies and projects can launch with their own rules, validators, and token economics. This makes it popular with institutions and gaming companies who want blockchain benefits without the chaos of public chains.',
    bestFor: 'Enterprise use cases, gaming, institutional DeFi, and any project that wants its own custom blockchain without building from scratch.',
    tradeoffs: 'Smaller DeFi ecosystem compared to Ethereum or Solana. The subnet model is powerful but adds complexity. Less retail/consumer mindshare than the big three.',
    ecosystem: 'Trader Joe (trading), Benqi (lending), GMX (perpetuals, also on Arbitrum), and a growing number of gaming and institutional subnets.',
    keyFact: 'Avalanche reaches finality (your transaction is truly permanent) in under 2 seconds — faster than Visa. Multiple TradFi institutions are building on Avalanche subnets for tokenized assets.',
  },
];

// ---- Chain Comparison Table Data ----

export const CHAIN_COMPARISON_HEADERS = [
  'Chain',
  'Speed',
  'Cost',
  'Security',
  'Best For',
] as const;

export interface ChainComparisonRow {
  chain: string;
  symbol: string;
  speed: string;
  cost: string;
  security: string;
  bestFor: string;
}

export const CHAIN_COMPARISON: ChainComparisonRow[] = [
  { chain: 'Bitcoin', symbol: 'BTC', speed: '~10 min blocks', cost: '$1-5', security: 'Highest', bestFor: 'Store of value' },
  { chain: 'Ethereum', symbol: 'ETH', speed: '~12 sec blocks', cost: '$1-20 (L1)', security: 'Very high', bestFor: 'DeFi & smart contracts' },
  { chain: 'Solana', symbol: 'SOL', speed: '~0.4 sec blocks', cost: '<$0.01', security: 'Moderate', bestFor: 'Speed & low cost' },
  { chain: 'Avalanche', symbol: 'AVAX', speed: '~2 sec finality', cost: '<$0.10', security: 'High', bestFor: 'Enterprise & subnets' },
];

// ---- Anatomy of a Smart Contract ----

export interface ContractPart {
  id: string;
  name: string;
  whatItIs: string;
  realWorldAnalogy: string;
  example: string;
}

export const CONTRACT_PARTS: ContractPart[] = [
  {
    id: 'address',
    name: 'The Address',
    whatItIs: 'Every smart contract has a unique address on the blockchain — like a street address for a building. When you want to interact with a contract (say, swap tokens on Uniswap), your wallet sends a transaction to that contract\'s address. The address is generated when the contract is deployed and never changes.',
    realWorldAnalogy: 'Like the address of a bank branch. You need to know where to go to do business there. Anyone can look up the address and see what\'s inside.',
    example: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  },
  {
    id: 'state',
    name: 'The State (Storage)',
    whatItIs: 'State is the contract\'s memory — the data it keeps track of. A token contract remembers how many tokens each person owns. A lending contract tracks who borrowed what, and how much interest they owe. This state is stored permanently on the blockchain, which is why blockchains need so much storage and why gas fees exist — you\'re paying the network to remember things.',
    realWorldAnalogy: 'Think of a bank\'s ledger that records every customer\'s balance. The state is that ledger — always up to date, always accessible, and everyone can verify it matches.',
    example: 'balances: { Alice: 500 USDC, Bob: 1,200 USDC }\ntotalSupply: 1,000,000 tokens\nowner: 0xABC...123',
  },
  {
    id: 'functions',
    name: 'The Functions',
    whatItIs: 'Functions are the actions a contract can perform — the buttons you can press. A token contract might have functions like "transfer" (send tokens to someone), "approve" (let another contract spend your tokens), and "balanceOf" (check someone\'s balance). Some functions change the state (and cost gas), while others just read data (free to call).',
    realWorldAnalogy: 'Like the services a bank offers: deposit, withdraw, check balance, transfer. Each service has rules about who can use it and what happens when you do.',
    example: 'transfer(to: Bob, amount: 100 USDC)\napprove(spender: Uniswap, amount: 500 USDC)\nbalanceOf(account: Alice) → 500 USDC',
  },
  {
    id: 'events',
    name: 'The Events',
    whatItIs: 'Events are announcements the contract makes when something important happens. When you transfer tokens, the contract emits a "Transfer" event that says who sent what to whom. Apps and block explorers listen for these events to update their UI in real time. Events are also how you can search the blockchain\'s history — "show me every transfer of this token in the last 24 hours."',
    realWorldAnalogy: 'Like a receipt or notification. Every time you do something at the bank, they give you a receipt and maybe send a push notification. Events are the blockchain\'s version of that — a permanent, public record that something happened.',
    example: 'Event: Transfer(from: Alice, to: Bob, amount: 100 USDC)\nEvent: Approval(owner: Alice, spender: Uniswap, amount: 500 USDC)',
  },
  {
    id: 'access-control',
    name: 'The Rules (Access Control)',
    whatItIs: 'Not everyone can do everything. Smart contracts have rules about who can call which functions. Some functions are public (anyone can call them, like checking a balance). Others are restricted — only the contract owner can pause the contract, only the governance system can change fees, only you can withdraw your own funds. These rules are enforced by code, not people.',
    realWorldAnalogy: 'Like permissions at a company. An employee can check their own pay stub, but only HR can change salaries. A customer can use the ATM, but only the bank manager can open the vault. The rules are built into the system.',
    example: 'transfer → anyone can call (but only with their own tokens)\npause → only the contract owner\nsetFee → only governance vote\nwithdraw → only if you have a balance',
  },
  {
    id: 'immutability',
    name: 'The Immutability',
    whatItIs: 'Once a smart contract is deployed to the blockchain, its code cannot be changed. This is both the superpower and the Achilles\' heel of smart contracts. The superpower: nobody (not even the creator) can secretly change the rules after you\'ve agreed to them. The risk: if there\'s a bug in the code, it can\'t be patched like a normal app. This is why smart contract audits are so important — and why hacks happen when contracts have undiscovered vulnerabilities.',
    realWorldAnalogy: 'Imagine signing a legal contract that\'s been carved into stone. No one can alter the terms after the fact, which protects you — but if there\'s a typo that creates a loophole, it\'s permanent too.',
    example: 'Deployed once → lives forever at its address\nCode is public → anyone can read and verify\nBugs are permanent → audits happen BEFORE deployment\nUpgradeable patterns exist, but add trust assumptions',
  },
];

export const CONTRACT_LIFECYCLE_DIAGRAM = `
  ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
  │  WRITE   │      │  DEPLOY  │      │ INTERACT │      │  EVENTS  │
  │          │─────▶│          │─────▶│          │─────▶│          │
  │ Developer│      │ Send to  │      │ Users    │      │ Announce │
  │ writes   │      │ blockchain│      │ call     │      │ what     │
  │ the code │      │ (one-time│      │ functions│      │ happened │
  │          │      │  tx + gas)│      │ (pay gas)│      │ (logs)   │
  └──────────┘      └──────────┘      └──────────┘      └──────────┘
                          │
                          ▼
                    ┌──────────┐
                    │ PERMANENT│
                    │ Gets a   │
                    │ unique   │
                    │ address  │
                    │ on-chain │
                    └──────────┘
`;

export const CONTRACT_EXAMPLE = `// A simplified token swap contract (pseudocode, not real Solidity)
// This is what Uniswap looks like under the hood, simplified.

CONTRACT TokenSwap:

  STATE:
    pool_token_a: 10,000 USDC          // Tokens available to trade
    pool_token_b: 5 ETH                // Other side of the pair
    fee_rate: 0.3%                     // Fee on every trade
    fee_collector: 0xABC...            // Where fees go

  FUNCTION swap(sell: Token, amount: Number):
    1. Check: Does the user actually have enough tokens?
    2. Calculate: How many tokens they get back (based on pool ratio)
    3. Deduct: The 0.3% fee
    4. Update: Pool balances (more of what they sold, less of what they bought)
    5. Transfer: Send the bought tokens to the user
    6. Emit: SwapEvent(user, sold, bought, fee)

  FUNCTION addLiquidity(tokenA_amount, tokenB_amount):
    1. Check: Are the amounts in the correct ratio?
    2. Transfer: Pull tokens from user into the pool
    3. Mint: Give user LP tokens (proof of their deposit)
    4. Emit: LiquidityAdded(user, amounts)

  RULES:
    swap → anyone can call
    addLiquidity → anyone can call
    changeFee → only governance vote
    pause → only owner (emergency)`;
