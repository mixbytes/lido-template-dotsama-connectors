import { FC, PropsWithChildren } from 'react';
import { CookieThemeProvider } from '@lidofinance/lido-ui';

import { GlobalStyle } from 'styles';

import ModalProvider from './modals';
import Web3Provider from './web3';
import DotsamaContextProvider from './dotsama';
export { MODAL, ModalContext } from './modals';

export * from './web3';
export * from './dotsama';

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CookieThemeProvider>
    <GlobalStyle />
    <Web3Provider>
      <DotsamaContextProvider>
        <ModalProvider>{children}</ModalProvider>
      </DotsamaContextProvider>
    </Web3Provider>
  </CookieThemeProvider>
);

export default Providers;
