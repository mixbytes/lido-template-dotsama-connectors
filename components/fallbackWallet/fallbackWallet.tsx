import { useSwitchChainRPC } from 'hooks';

import {
  FallbackWalletStyle,
  ConnectButtonStyle,
} from './fallbackWalletStyles';
import { FallbackWalletComponent } from './types';
import { useErrorMessage } from './useErrorMessage';
import { useSupportedChains } from '@reef-knot/web3-react';

const FallbackWallet: FallbackWalletComponent = (props) => {
  const error = useErrorMessage();
  const { isUnsupported } = useSupportedChains();
  const { switchChain, chainName } = useSwitchChainRPC();

  if (error) {
    return (
      <FallbackWalletStyle {...props}>
        {error} <br />
        {isUnsupported && switchChain && (
          <ConnectButtonStyle
            size="xs"
            variant="filled"
            color="secondary"
            onClick={switchChain}
          >
            Switch to {chainName}
          </ConnectButtonStyle>
        )}
      </FallbackWalletStyle>
    );
  }

  return null;
};

export default FallbackWallet;
