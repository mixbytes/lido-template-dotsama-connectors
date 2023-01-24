// Dotsama account can be null, {}
// Can't use any of empty values
import { WalletAccount } from '@talismn/connect-wallets';
import { isEmptyObject } from './isEmptyObject';

export const isDotsamaAccount = (account: WalletAccount | null): boolean =>
  !!account && !isEmptyObject(account);
