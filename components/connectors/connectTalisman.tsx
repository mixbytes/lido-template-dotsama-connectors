import { getWalletBySource } from '@talismn/connect-wallets';
import { FC, useCallback } from 'react';

import styled from 'styled-components';

import { useConnectorTalisman } from 'hooks';

import { ConnectWalletProps } from './types';
import { ConnectButton } from '@reef-knot/connect-wallet-modal';
import { WALLET_EXTENSIONS } from 'components/walletsDotsama';

const StyledWalletIcon = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-bottom: 8px;
`;

const talismanWallet = getWalletBySource(WALLET_EXTENSIONS.TALISMAN);

export const ConnectTalisman: FC<ConnectWalletProps> = (props) => {
  const { onConnect, setRequirements, ...rest } = props;
  const { connect } = useConnectorTalisman();

  const handleConnect = useCallback(async () => {
    onConnect?.();
    await connect();
  }, [onConnect, connect]);

  return (
    <ConnectButton
      {...rest}
      iconSrcOrReactElement={
        <StyledWalletIcon
          src={talismanWallet?.logo.src}
          alt={talismanWallet?.logo.alt}
        />
      }
      onClick={handleConnect}
    >
      {talismanWallet?.title}
    </ConnectButton>
  );
};
