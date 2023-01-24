import { Component } from 'types';
import { BlockProps } from '@lidofinance/lido-ui';
import { FC } from 'react';
import { WalletAccount } from '@talismn/connect-wallets';

export enum ACCOUNT_TYPES {
  EVM,
  Dotsama,
}

export type WalletCardComponent = FC<BlockProps>;

export type WalletCardRowComponent = Component<'div'>;

export type WalletCardBalanceComponent = Component<
  'div',
  {
    title: React.ReactNode;
    value: React.ReactNode;
    small?: boolean;
    loading?: boolean;
    extra?: React.ReactNode;
  }
>;

export type WalletCardAccountEVMComponent = FC<{
  account?: string | null;
}>;

export type WalletCardAccountDotsamaComponent = FC<{
  account?: WalletAccount | null;
}>;
