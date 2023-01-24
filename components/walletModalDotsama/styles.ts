import { Button, Identicon } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const WalletAccountNameStyle = styled.div`
  margin: 0 ${({ theme }) => theme.spaceMap.sm}px;
  text-align: left;
  white-space: normal;
  flex-grow: 1;
`;

export const WalletModalTextStyle = styled.div`
  margin-left: ${({ theme }) => theme.spaceMap.sm}px;
  font-size: ${({ theme }) => theme.fontSizesMap.sm}px;
  line-height: 1.2em;
`;

export const WalletModalIconStyle = styled(Identicon)`
  flex-shrink: 0;
`;

export const DotsamaAccountButtonStyle = styled(Button)`
  &:disabled {
    opacity: 1;
  }
`;

export const DotsamaModalAccountStyle = styled.div`
  display: flex;
  align-items: center;
`;

export const DotsamaAccountAddressStyle = styled.div`
  margin-left: ${({ theme }) => theme.spaceMap.sm}px;
  font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
  line-height: 1.2em;
  font-weight: normal;
`;

export const DotsamaAccountItemStyle = styled.div`
  position: relative;
`;

export const WalletAccountInfoStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
