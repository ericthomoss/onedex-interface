// a list of tokens by chain
import { ChainId, SUSHI, Token, WNATIVE } from '@sushiswap/core-sdk'

import * as BSC from './tokens/bsc'
import * as HARMONY from './tokens/harmony'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

const WRAPPED_NATIVE_ONLY: ChainTokenList = {
  [ChainId.ETHEREUM]: [WNATIVE[ChainId.ETHEREUM]],
  [ChainId.ROPSTEN]: [WNATIVE[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WNATIVE[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WNATIVE[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WNATIVE[ChainId.KOVAN]],
  [ChainId.BSC]: [WNATIVE[ChainId.BSC]],
  [ChainId.BSC_TESTNET]: [WNATIVE[ChainId.BSC_TESTNET]],
  [ChainId.MOONBEAM_TESTNET]: [WNATIVE[ChainId.MOONBEAM_TESTNET]],
  [ChainId.HECO]: [WNATIVE[ChainId.HECO]],
  [ChainId.HECO_TESTNET]: [WNATIVE[ChainId.HECO_TESTNET]],
  [ChainId.HARMONY]: [WNATIVE[ChainId.HARMONY]],
  [ChainId.HARMONY_TESTNET]: [WNATIVE[ChainId.HARMONY_TESTNET]],
  [ChainId.PALM]: [WNATIVE[ChainId.PALM]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,
  [ChainId.BSC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    BSC.DAI,
    BSC.USD,
    BSC.USDC,
    BSC.USDT,
    BSC.BTCB,
    BSC.WETH,
    BSC.MIM,
  ],
  [ChainId.HARMONY]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.HARMONY],
    HARMONY.DAI,
    HARMONY.USDC,
    HARMONY.USDT,
    HARMONY.WBTC,
    HARMONY.WETH,
  ],
}

export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainTokenList = {
  [ChainId.BSC]: [
    // @ts-ignore TYPE NEEDS FIXING
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    // @ts-ignore TYPE NEEDS FIXING
    SUSHI[ChainId.BSC],
    // @ts-ignore TYPE NEEDS FIXING
    BSC.WETH,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.BTCB,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.MIM,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.SPELL,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.ICE,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.DAI,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.USDC,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.USDT,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.USD,
  ],
  [ChainId.HARMONY]: [
    // @ts-ignore TYPE NEEDS FIXING
    ...WRAPPED_NATIVE_ONLY[ChainId.HARMONY],
    // @ts-ignore TYPE NEEDS FIXING
    SUSHI[ChainId.HARMONY],
    // @ts-ignore TYPE NEEDS FIXING
    HARMONY.WBTC,
    // @ts-ignore TYPE NEEDS FIXING
    HARMONY.WETH,
    // @ts-ignore TYPE NEEDS FIXING
    HARMONY.USDC,
    // @ts-ignore TYPE NEEDS FIXING
    HARMONY.USDT,
    // @ts-ignore TYPE NEEDS FIXING
    HARMONY.DAI,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,
  [ChainId.BSC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    BSC.DAI,
    BSC.USD,
    BSC.USDC,
    BSC.USDT,
    BSC.BTCB,
    BSC.WETH,
    BSC.MIM,
  ],
  [ChainId.HARMONY]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.HARMONY],
    HARMONY.DAI,
    HARMONY.USDC,
    HARMONY.USDT,
    HARMONY.WBTC,
    HARMONY.WETH,
  ],
}

export const PINNED_PAIRS: {
  readonly [chainId in ChainId]?: [Token, Token][]
} = {}
