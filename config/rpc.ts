import { CHAINS } from '@lido-sdk/constants';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { basePath } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  return `${basePath ?? ''}/api/rpc?chainId=${chainId}`;
};

export const backendRPC = {
  [CHAINS.Mainnet]: getBackendRPCPath(CHAINS.Moonbase),
  [CHAINS.Moonbase]: getBackendRPCPath(CHAINS.Moonbase),
  [CHAINS.Moonbeam]: getBackendRPCPath(CHAINS.Moonbeam),
  [CHAINS.Moonriver]: getBackendRPCPath(CHAINS.Moonriver),
};
