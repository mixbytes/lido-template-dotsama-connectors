import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Block, Button } from '@lidofinance/lido-ui';

import Wallet from 'components/wallet';
import Layout from 'components/layout';
import Faq from 'components/faq';
import { FAQItem, getFaqList } from 'utils/faqList';
import WalletSelectButtonEVM from 'components/walletSelectButtonEVM';
import WalletSelectButtonDotsama from 'components/walletSelectButtonDotsama';
import { useWeb3 } from '@reef-knot/web3-react';
import { useDotsama, useLoadAccountsDotsama } from 'hooks';
import { isDotsamaAccount } from 'utils';
import styled from 'styled-components';

interface HomeProps {
  faqList: FAQItem[];
}

const Delimiter = styled.div`
  margin-bottom: 20px;
`;

const Home: FC<HomeProps> = ({ faqList }) => {
  const { active: evmActive } = useWeb3();
  const { selectedAccount } = useDotsama();
  const dotsamaActive = isDotsamaAccount(selectedAccount);
  const { loadAccounts } = useLoadAccountsDotsama();

  return (
    <Layout
      title="Lido Frontend Template"
      subtitle="Develop Lido Apps without hassle"
    >
      <Head>
        <title>Lido | Frontend Template</title>
      </Head>
      <Wallet />
      <Block>
        {evmActive ? null : <WalletSelectButtonEVM fullwidth />}
        <Delimiter />
        {dotsamaActive ? null : <WalletSelectButtonDotsama fullwidth />}
        <Delimiter />
        {dotsamaActive ? null : (
          <Button fullwidth onClick={loadAccounts}>
            Connect Dotsama old-fashioned way (@polkadot/api)
          </Button>
        )}
      </Block>
      <Faq faqList={faqList} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    faqList: await getFaqList(['lido-frontend-template']),
  },
});
