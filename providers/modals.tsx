import {
  createContext,
  useMemo,
  useCallback,
  memo,
  useState,
  FC,
  PropsWithChildren,
} from 'react';
import { useThemeToggle } from '@lidofinance/lido-ui';
import WalletModal from 'components/walletModalEVM';
import WalletModalSelectEVM from 'components/walletModalSelectEVM';
import WalletModalSelectDotsama from 'components/walletModalSelectDotsama';
import WalletModalDotsama from 'components/walletModalDotsama';

export type ModalContextValue = {
  openModal: (modal: MODAL) => void;
  closeModal: () => void;
};

export enum MODAL {
  walletEMV,
  walletDotsama,
  selectEVMWallet,
  selectDotsamaWallet,
}

export const ModalContext = createContext({} as ModalContextValue);

type ModalType = {
  onClose: () => void;
  Component: any;
  open: boolean;
};

const Modal: FC<ModalType> = ({ open, Component, ...common }) => {
  return <Component open={open} {...common} />;
};

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [active, setActive] = useState<MODAL | null>(null);
  const { themeName } = useThemeToggle();

  const openModal = useCallback((modal: MODAL) => {
    setActive(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActive(null);
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [closeModal, openModal],
  );

  const common = {
    onClose: closeModal,
    shouldInvertWalletIcon: themeName === 'dark',
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <WalletModal open={active === MODAL.walletEMV} {...common} />
      <WalletModalDotsama open={active === MODAL.walletDotsama} {...common} />
      <Modal
        Component={WalletModalSelectEVM}
        open={active === MODAL.selectEVMWallet}
        {...common}
      />
      <Modal
        Component={WalletModalSelectDotsama}
        open={active === MODAL.selectDotsamaWallet}
        {...common}
      />
    </ModalContext.Provider>
  );
};

export default memo<FC<PropsWithChildren>>(ModalProvider);
