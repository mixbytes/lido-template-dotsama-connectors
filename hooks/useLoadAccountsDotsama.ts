import { useCallback } from 'react';

import { APP_NAME } from 'config';
import { useDotsama } from './useDotsama';
import { WalletAccount } from '@talismn/connect-wallets';

type Loader = {
  loadAccounts: () => void;
};

export const useLoadAccountsDotsama = (): Loader => {
  const { loadAccountsOldFashioned, setError } = useDotsama();

  const loadAccounts = useCallback(async () => {
    const { web3Accounts, web3Enable, isWeb3Injected } = await import(
      '@polkadot/extension-dapp'
    );
    try {
      if (!isWeb3Injected) {
        throw new Error('No extensions found');
      } else {
        const enabledExtensions = await web3Enable(APP_NAME);
        if (enabledExtensions.length == 0) {
          throw new Error(
            'The page is not allowed to interact with extensions.',
          );
        }

        const allAccounts = await web3Accounts();
        const accounts = allAccounts.map(
          ({ address, meta }) =>
            ({
              address,
              meta: { ...meta, name: `${meta.name} (${meta.source})` },
              source: 'Unknown',
            } as WalletAccount),
        );
        loadAccountsOldFashioned(accounts);
      }
    } catch (error) {
      setError(error as Error);
    }
  }, [loadAccountsOldFashioned, setError]);

  return { loadAccounts };
};
