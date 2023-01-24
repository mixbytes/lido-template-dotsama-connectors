import { openWindow } from '@lido-sdk/helpers';
import { TalismanConnector } from '@talismn/web3react-v6-connector';
import { useCallback, useMemo } from 'react';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';

import { hasInjected, isTalismanProvider } from 'utils';
import { useForceDisconnect } from 'reef-knot';
import { useWeb3 } from '@reef-knot/web3-react';
import { PREDEFINED_WALLETS } from 'components/walletsDotsama';
import { useSDK } from '@lido-sdk/react';

type ConnectorHookResult = {
  connect: () => Promise<void>;
  connector: TalismanConnector;
};

const TalismanInfo = PREDEFINED_WALLETS.find(
  (wallet) => wallet.title === 'Talisman',
);

export const useConnectorTalisman = (): ConnectorHookResult => {
  const { supportedChainIds } = useSDK();
  const { activate } = useWeb3();
  const { disconnect } = useForceDisconnect();

  const talisman = useMemo(
    () => new TalismanConnector({ supportedChainIds }),
    [supportedChainIds],
  );

  const openInWallet = useCallback(() => {
    try {
      openWindow(TalismanInfo?.installUrl ?? '');
    } catch (error) {
      warning(false, 'Failed to open the link');
    }
  }, []);

  const connect = useCallback(async () => {
    invariant(talisman, 'Connector is required');

    if (hasInjected() && isTalismanProvider()) {
      await disconnect();
      activate(talisman);
    } else {
      openInWallet();
    }
  }, [activate, disconnect, openInWallet, talisman]);

  return {
    connect,
    connector: talisman,
  };
};
