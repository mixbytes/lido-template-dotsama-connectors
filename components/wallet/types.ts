import { ACCOUNT_TYPES, WalletCardComponent } from 'components/walletCard';
import { WalletAccount } from '@talismn/connect-wallets';
import { FC } from 'react';
import { BlockProps } from '@lidofinance/lido-ui';

export type WalletComponent = WalletCardComponent;

export type WalletDotsamaComponent = FC<
  BlockProps & {
    account?: string | null;
    substrateAccount?: WalletAccount | null;
    type?: ACCOUNT_TYPES;
  }
>;
