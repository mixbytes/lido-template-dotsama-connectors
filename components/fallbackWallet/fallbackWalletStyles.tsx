import { WalletCard } from 'components/walletCard';
import styled from 'styled-components';
import { Button } from '@lidofinance/lido-ui';

export const FallbackWalletStyle = styled(WalletCard)`
  text-align: center;
  background: var(--lido-color-error);
  background-image: none !important;
`;

export const ConnectButtonStyle = styled(Button)`
  margin-top: ${({ theme }) => theme.spaceMap.md}px;
  background-color: #e06b6b;

  &:not(:disabled):hover {
    background-color: #a23232;
  }
`;
