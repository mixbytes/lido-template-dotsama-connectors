# Lido Frontend Template with Dotsama connections

This repo is made for testing EVM and Dotsama connections for Lido on Kusama and Lido on Polkadot.
Connect EVM (Metamask and Talisman) and Dotsama (Polkadot.js and Talisman) accounts.

### Where to look for connect wallets logic:

- For connecting Talisman as EVM - `hooks/useConnectorTalisman` (@talismn/web3react-v6-connector is used)
- For connecting Dotsama accounts with @talism/connect-wallets - `components/walletModalSelectDotsama`
- For connecting Dotsama accounts with @polkadot/extension-dapp - `hooks/useLoadAccountDotsama`

### Pre-requisites

- Node.js v12+
- Yarn package manager

## Development

Step 1. Install dependencies

```bash
yarn install
```

Step 2. Start the development server

```bash
yarn dev
```

Step 3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

```bash
yarn build && yarn start
```
