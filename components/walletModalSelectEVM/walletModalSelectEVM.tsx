import {
  ConnectMetamask,
  WalletsModal,
  WalletsModalProps,
} from '@reef-knot/connect-wallet-modal';
import { FC } from 'react';

import { ConnectTalisman } from 'components/connectors';
import { useThemeToggle } from '@lidofinance/lido-ui';

const WalletModalSelectEVM: FC<WalletsModalProps> = (props) => {
  const { themeName } = useThemeToggle();

  return (
    <WalletsModal
      title="Connect wallet"
      shouldInvertWalletIcon={themeName === 'dark'}
      {...props}
    >
      {(commonProps) => (
        <>
          <ConnectMetamask key="Metamask" {...commonProps} />
          <ConnectTalisman key="Talisman" {...commonProps} />
        </>
      )}
    </WalletsModal>
  );
};

export default WalletModalSelectEVM;
