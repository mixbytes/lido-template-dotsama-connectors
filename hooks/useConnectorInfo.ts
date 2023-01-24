import { TalismanConnector } from '@talismn/web3react-v6-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

import { isInjectedTalismanProvider, isTalismanProvider } from 'utils';
import { useWeb3 } from '@reef-knot/web3-react';
import { Connector, useConnectorInfo as useConnectorInfoBase } from 'reef-knot';

type ConnectorInfo = {
  providerName?: string;
  connectorName?: Connector;

  isInjected: boolean;
  isMetamask: boolean;
  isTalisman: boolean;
};

export const useConnectorInfo = (): ConnectorInfo => {
  const connectorProps = useConnectorInfoBase();
  const { active, connector } = useWeb3();

  const isInjected = active && connector instanceof InjectedConnector;
  const isTalismanConnector = active && connector instanceof TalismanConnector;
  // Talisman can be connected wia InjectedConnector
  // and wia Talisman Connector
  const isTalisman =
    (isTalismanConnector && isTalismanProvider()) ||
    (isInjected && isInjectedTalismanProvider());

  const providerName = (() => {
    if (isTalisman) return 'Talisman';

    return connectorProps?.providerName;
  })();

  return {
    ...connectorProps,
    providerName,

    isInjected,
    isTalisman,
  };
};
