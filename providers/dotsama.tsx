import { useLocalStorage } from '@lido-sdk/react';
import {
  getWalletBySource,
  Wallet,
  WalletAccount,
} from '@talismn/connect-wallets';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { APP_NAME } from 'config';
import { WALLET_EXTENSIONS } from 'components/walletsDotsama';

export type SetStateType<TAction> = React.Dispatch<
  React.SetStateAction<TAction>
>;

export interface DotsamaContextInterface {
  wallet?: Wallet;
  accounts: WalletAccount[];
  setWallet: (wallet: Wallet | undefined) => void;

  selectedAccount: WalletAccount | null;
  selectAccount: SetStateType<WalletAccount | null>;

  loadAccountsOldFashioned: (accounts: WalletAccount[]) => void;

  error?: Error;
  setError: (error: Error) => void;
  isLoading: boolean;
}

export const DotsamaContext = createContext({} as DotsamaContextInterface);

const DotsamaContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [walletKey, setWalletKey] = useLocalStorage<string | null>(
    'wallet-key',
    null,
  );
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>(
    getWalletBySource(walletKey as WALLET_EXTENSIONS),
  );
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedAccount, selectAccount] = useState<WalletAccount | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const afterSelectWallet = useCallback(async (wallet: Wallet) => {
    const infos = await wallet.getAccounts();

    if (infos) {
      setAccounts(infos);
      selectAccount(infos[0]);
    }
  }, []);

  const selectWallet = useCallback(
    async (wallet: Wallet) => {
      try {
        if (!wallet?.installed) return;

        setError(undefined);
        setLoading(true);
        setCurrentWallet(currentWallet);

        await wallet.enable(APP_NAME);
        setWalletKey(wallet.extensionName);

        await afterSelectWallet(wallet);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    },
    [afterSelectWallet, currentWallet, setWalletKey],
  );

  const loadAccountsOldFashioned = useCallback((accounts: WalletAccount[]) => {
    try {
      if (accounts.length === 0)
        throw new Error('No accounts found in connected extensions');

      setAccounts(accounts);
      selectAccount(accounts[0]);
    } catch (error) {
      setError(error as Error);
    }
  }, []);

  // AutoConnect
  useEffect(() => {
    if (walletKey) {
      const wallet = getWalletBySource(walletKey as WALLET_EXTENSIONS);

      setTimeout(() => {
        if (wallet && wallet?.installed) {
          void selectWallet(wallet);
        }
      }, 150);
    }
  }, [selectWallet, walletKey]);

  const dotsamaContext = {
    wallet: getWalletBySource(walletKey as WALLET_EXTENSIONS),
    accounts,
    setWallet: (wallet: Wallet | undefined) => {
      wallet?.installed && selectWallet(wallet as Wallet);
    },

    error,
    setError,
    selectAccount,
    selectedAccount,

    loadAccountsOldFashioned,

    isLoading,
  };

  return (
    <DotsamaContext.Provider value={dotsamaContext as DotsamaContextInterface}>
      {children}
    </DotsamaContext.Provider>
  );
};

export default DotsamaContextProvider;
