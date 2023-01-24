import { Button, ButtonProps } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { useModal } from 'hooks';
import { MODAL } from 'providers';

const WalletSelectButtonDotsama: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useModal(MODAL.selectDotsamaWallet);

  return (
    <Button onClick={openModal} variant="filled" color="primary" {...rest}>
      Select Dotsama wallet
    </Button>
  );
};

export default WalletSelectButtonDotsama;
