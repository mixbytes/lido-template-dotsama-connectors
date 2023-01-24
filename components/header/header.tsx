import { FC } from 'react';
import Link from 'next/link';
import { LidoLogo } from '@lidofinance/lido-ui';
import { HeaderStyle, HeaderLogoStyle } from './headerStyles';

const Header: FC = () => (
  <HeaderStyle size="full" forwardedAs="header">
    <HeaderLogoStyle>
      <Link href="/">
        <LidoLogo />
      </Link>
    </HeaderLogoStyle>
  </HeaderStyle>
);

export default Header;
