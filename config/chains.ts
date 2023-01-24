import { CHAINS } from '@lido-sdk/constants';
import invariant from 'tiny-invariant';

export const SUPPORTED_CHAINS: {
  [key in CHAINS]?: string;
} = {
  [CHAINS.Moonbeam]: 'Moonbeam',
  [CHAINS.Moonriver]: 'Moonriver',
  [CHAINS.Moonbase]: 'Moonbase testnet',
};

export type NativeCurrencyType = {
  name: string;
  symbol: string;
  decimals: number;
};

export const CHAIN_NATIVE_CURRENCIES: {
  [key in keyof typeof SUPPORTED_CHAINS]: NativeCurrencyType;
} = {
  [CHAINS.Moonbeam]: {
    name: 'Moonbeam',
    symbol: 'GLMR',
    decimals: 18,
  },
  [CHAINS.Moonriver]: {
    name: 'Moonriver',
    symbol: 'MOVR',
    decimals: 18,
  },
  [CHAINS.Moonbase]: {
    name: 'Moonbase',
    symbol: 'DEV',
    decimals: 18,
  },
};

export const getChainName = (chainId: CHAINS): string => {
  const chainName = SUPPORTED_CHAINS[chainId];
  invariant(chainName != null, 'Chain is not supported');

  return chainName;
};

export const getChainNativeCurrency = (chainId: CHAINS): NativeCurrencyType => {
  const nativeCurrency = CHAIN_NATIVE_CURRENCIES[chainId];
  invariant(nativeCurrency != null, 'Chain is not supported');

  return nativeCurrency;
};
