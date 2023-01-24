import {
  WalletCard,
  WalletCardAccountDotsama,
  WalletCardAccountEVM,
  WalletCardRow,
} from 'components/walletCard';
import { Divider } from '@lidofinance/lido-ui';
import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from '@reef-knot/web3-react';
import FallbackWallet from 'components/fallbackWallet';
import { WalletComponent, WalletDotsamaComponent } from './types';
import { useDotsama } from 'hooks';
import { isDotsamaAccount } from 'utils';
import FallbackWalletDotsama from 'components/fallbackWalletDotsama';

const WalletEVM: WalletComponent = (props) => {
  const { account } = useSDK();

  return (
    <WalletCard {...props}>
      <WalletCardRow>
        <WalletCardAccountEVM account={account} />
      </WalletCardRow>
    </WalletCard>
  );
};

export const WalletDotsama: WalletDotsamaComponent = (props) => {
  const { selectedAccount } = useDotsama();

  return (
    <WalletCard {...props}>
      <WalletCardRow>
        <WalletCardAccountDotsama account={selectedAccount} />
      </WalletCardRow>
    </WalletCard>
  );
};

const WalletWrapper: WalletComponent = (props) => {
  const { active: evmActive } = useWeb3();
  const { selectedAccount } = useDotsama();
  const dotsamaActive = isDotsamaAccount(selectedAccount);

  return (
    <>
      {evmActive ? <WalletEVM {...props} /> : <FallbackWallet {...props} />}
      {evmActive && dotsamaActive && <Divider />}
      {dotsamaActive ? (
        <WalletDotsama {...props} />
      ) : (
        <FallbackWalletDotsama {...props} />
      )}
    </>
  );
};

export default WalletWrapper;
