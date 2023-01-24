import {
  WalletCardStyle,
  WalletCardRowStyle,
  WalletCardAccountStyle,
  WalletCardTitleStyle,
} from './walletCardStyles';
import AddressBadge from 'components/addressBadge';
import {
  WalletCardAccountDotsamaComponent,
  WalletCardAccountEVMComponent,
  WalletCardComponent,
  WalletCardRowComponent,
} from './types';
import { useModal } from 'hooks';
import { MODAL } from 'providers';

export const WalletCard: WalletCardComponent = (props) => {
  return <WalletCardStyle color="accent" {...props} />;
};

export const WalletCardRow: WalletCardRowComponent = (props) => {
  return <WalletCardRowStyle {...props} />;
};

export const WalletCardAccountEVM: WalletCardAccountEVMComponent = (props) => {
  const { account, ...rest } = props;

  const { openModal } = useModal(MODAL.walletEMV);

  return (
    <WalletCardAccountStyle {...rest}>
      <WalletCardTitleStyle>EVM Account</WalletCardTitleStyle>
      <AddressBadge onClick={openModal} color="accent" address={account} />
    </WalletCardAccountStyle>
  );
};

export const WalletCardAccountDotsama: WalletCardAccountDotsamaComponent = (
  props,
) => {
  const { account, ...rest } = props;

  const { openModal } = useModal(MODAL.walletDotsama);

  const accountProps = {
    address: account?.address || '',
    name: account?.name || '',
  };

  return (
    <WalletCardAccountStyle {...rest}>
      <WalletCardTitleStyle>Dotsama Account</WalletCardTitleStyle>
      <AddressBadge onClick={openModal} color="accent" {...accountProps} />
    </WalletCardAccountStyle>
  );
};
