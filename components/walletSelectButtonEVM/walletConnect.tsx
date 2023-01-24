import { FC } from 'react';
import { Button, ButtonProps } from '@lidofinance/lido-ui';
import { useModal } from 'hooks';
import { MODAL } from 'providers';

const WalletSelectButtonEVM: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useModal(MODAL.selectEVMWallet);

  return (
    <Button onClick={openModal} {...rest}>
      Select EVM wallet
    </Button>
  );
};

export default WalletSelectButtonEVM;
