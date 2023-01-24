import { CHAINS } from '@lido-sdk/constants';
import { useSDK } from '@lido-sdk/react';
import { TalismanConnector } from '@talismn/web3react-v6-connector';
import { useCallback } from 'react';

import { getChainName, getChainNativeCurrency } from 'config';

import { hasInjected, hasTalisman } from '../utils';
import { useWeb3 } from '@reef-knot/web3-react';

const HexCharacters = '0123456789abcdef';
export const hexlify = (value: number): string => {
  let hex = '';
  while (value) {
    hex = HexCharacters[value & 0xf] + hex;
    value = Math.floor(value / 16);
  }

  if (hex.length) {
    return '0x' + hex;
  }
  return '0x00';
};

type SwitchChainRPCReturnType = {
  switchChain?: () => Promise<boolean | undefined>;
  chainName: string;
};

export const useSwitchChainRPC = (): SwitchChainRPCReturnType => {
  const { providerWeb3, onError, chainId: connectedChainId } = useSDK();
  const { connector } = useWeb3();

  const chainId = connectedChainId || CHAINS.Moonbase;

  const chainName = getChainName(chainId);
  const nativeCurrency = getChainNativeCurrency(chainId);

  const provider: any =
    (connector instanceof TalismanConnector &&
      hasTalisman() &&
      window.talismanEth) ||
    providerWeb3?.provider ||
    (hasInjected() && window.ethereum);

  const handleChainSwitch = useCallback(async () => {
    if (!provider?.request) return false;

    try {
      const switchResult = await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexlify(chainId) }],
      });

      return !!switchResult;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          const addResult = await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: hexlify(chainId),
                rpcUrls: [],
                chainName,
                nativeCurrency,
              },
            ],
          });

          return !!addResult;
        } catch (addError) {
          onError(addError as Error);
          return false;
        }
      }
    }
  }, [provider, chainId, chainName, nativeCurrency, onError]);

  const canSwitch = provider.isMetaMask || provider.isTalisman;
  const switchChain = canSwitch ? handleChainSwitch : undefined;

  return {
    switchChain,
    chainName,
  };
};
