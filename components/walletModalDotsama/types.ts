import { WalletAccount } from '@talismn/connect-wallets';
import { FC } from 'react';

export type AccountComponent = FC<{
  account: WalletAccount;
}>;
