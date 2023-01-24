import { openWindow } from '@lido-sdk/helpers';

import {
  getWalletBySource,
  getWallets,
  Wallet,
} from '@talismn/connect-wallets';
import { FC, useCallback } from 'react';

import {
  ConnectButton,
  WalletsModal,
  WalletsModalProps,
} from '@reef-knot/connect-wallet-modal';
import { WALLET_EXTENSIONS } from 'components/walletsDotsama';
import { useThemeToggle } from '@lidofinance/lido-ui';
import { useDotsama } from 'hooks';

const dotsamaWallets = getWallets().filter((wallet) => {
  return Object.values(WALLET_EXTENSIONS).includes(
    wallet.extensionName as WALLET_EXTENSIONS,
  );
});

const WalletModalSelectDotsama: FC<WalletsModalProps> = (props) => {
  const { themeName } = useThemeToggle();
  const { setWallet } = useDotsama();

  const onSelectWallet = useCallback(
    (walletKey: string) => {
      setWallet(getWalletBySource(walletKey));
    },
    [setWallet],
  );

  const onClickDotsamaWallet = useCallback(
    (wallet: Wallet, onConnect: (() => void) | undefined) => () => {
      if (wallet.installed) {
        onSelectWallet(wallet.extensionName);
        onConnect?.();
      } else {
        openWindow(wallet.installUrl);
      }
    },
    [onSelectWallet],
  );

  return (
    <WalletsModal
      title="Connect wallet"
      shouldInvertWalletIcon={themeName === 'dark'}
      {...props}
    >
      {({ onConnect, ...connectProps }) => (
        <>
          {dotsamaWallets.map((dotWallet) => (
            <ConnectButton
              {...connectProps}
              key={dotWallet.extensionName}
              iconSrcOrReactElement={dotWallet.logo.src}
              onClick={onClickDotsamaWallet(dotWallet, onConnect)}
              title={dotWallet.title}
            >
              {dotWallet.title}
            </ConnectButton>
          ))}
        </>
      )}
    </WalletsModal>
  );
};

export default WalletModalSelectDotsama;
