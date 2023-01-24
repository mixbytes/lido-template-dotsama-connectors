import PolkadotJsLogo from './PolkadotLogo.svg';
import TalismanLogo from './TalismanLogo.svg';
import { WALLET_EXTENSIONS, WalletInfo } from './types';

export const PREDEFINED_WALLETS: WalletInfo[] = [
  {
    extensionName: WALLET_EXTENSIONS.POLKADOTJS,
    title: 'Polkadot{.js}',
    installUrl:
      'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd',
    logo: {
      src: PolkadotJsLogo as string,
      alt: 'Polkadot{.js} Extension',
    },
  },
  {
    extensionName: WALLET_EXTENSIONS.TALISMAN,
    title: 'Talisman',
    installUrl:
      'https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
    logo: {
      src: TalismanLogo as string,
      alt: 'Talisman',
    },
  },
];
