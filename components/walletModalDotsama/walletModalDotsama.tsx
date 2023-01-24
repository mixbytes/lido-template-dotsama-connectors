import { Modal, ModalProps, trimAddress } from '@lidofinance/lido-ui';
import { WalletAccount } from '@talismn/connect-wallets';
import { FC, useCallback, useMemo } from 'react';

import { useDotsama, useModal } from 'hooks';

import { MODAL } from 'providers';
import {
  WalletModalAccountStyle,
  WalletModalConnectedStyle,
  WalletModalConnectorStyle,
  WalletModalContentStyle,
} from '../walletModalEVM/walletModalStyles';
import {
  DotsamaModalAccountStyle,
  DotsamaAccountItemStyle,
  DotsamaAccountButtonStyle,
  WalletAccountInfoStyle,
  WalletAccountNameStyle,
  DotsamaAccountAddressStyle,
  WalletModalTextStyle,
  WalletModalIconStyle,
} from './styles';
import { AccountComponent } from './types';

const WalletAccountDotsama: AccountComponent = ({ account }) => {
  const { selectedAccount, selectAccount } = useDotsama();
  const active = account.address === selectedAccount?.address;

  const trimmedAddress = trimAddress(account.address ?? '', 8);

  const { closeModal } = useModal(MODAL.walletDotsama);

  const handleSelect = useCallback(() => {
    selectAccount(account);
    setTimeout(closeModal, 350);
  }, [account, closeModal, selectAccount]);

  return (
    <DotsamaAccountItemStyle>
      <DotsamaAccountButtonStyle
        disabled={active}
        size="xs"
        variant={active ? 'text' : 'ghost'}
        color={active ? 'primary' : 'secondary'}
        fullwidth
        onClick={handleSelect}
      >
        <DotsamaModalAccountStyle>
          <WalletModalAccountStyle>
            <WalletModalIconStyle address={account.address ?? ''} />
            <WalletAccountInfoStyle>
              <WalletAccountNameStyle>
                <WalletModalTextStyle>{account.name}</WalletModalTextStyle>
                <DotsamaAccountAddressStyle>
                  {trimmedAddress}
                </DotsamaAccountAddressStyle>
              </WalletAccountNameStyle>
            </WalletAccountInfoStyle>
          </WalletModalAccountStyle>
        </DotsamaModalAccountStyle>
      </DotsamaAccountButtonStyle>
    </DotsamaAccountItemStyle>
  );
};

const WalletModalDotsama: FC<ModalProps> = (props) => {
  const { accounts, wallet } = useDotsama();

  const mapAccounts = useMemo(() => {
    if (!accounts) return null;

    return accounts.map((account: WalletAccount) => (
      <WalletAccountDotsama key={account.address} account={account} />
    ));
  }, [accounts]);

  return (
    <Modal title="Dotsama Accounts" {...props}>
      <WalletModalContentStyle>
        <WalletModalConnectedStyle>
          {accounts && wallet && (
            <WalletModalConnectorStyle>
              Connected with {wallet.title}
            </WalletModalConnectorStyle>
          )}
        </WalletModalConnectedStyle>
        {mapAccounts}
      </WalletModalContentStyle>
    </Modal>
  );
};

export default WalletModalDotsama;
