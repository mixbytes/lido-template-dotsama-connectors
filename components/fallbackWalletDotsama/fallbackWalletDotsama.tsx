import { FallbackWalletStyle } from './styles';
import { useDotsama } from 'hooks';
import { WalletCardComponent } from '../walletCard';

export const FallbackWalletDotsama: WalletCardComponent = (props) => {
  const { error } = useDotsama();

  // if (!!wallet && !isDotsamaAccount(selectedAccount)) {
  //   return (
  //     <FallbackWalletStyle {...props}>
  //       You have connected {wallet.title}, but we can&apos;t retrieve Dotsama
  //       accounts from your wallet. Go ahead and create an account or connect an
  //       existing one in {wallet.title}, or check if you are allowing your wallet
  //       to work with this site.
  //     </FallbackWalletStyle>
  //   );
  // } else if (error) {
  if (error) {
    return (
      <FallbackWalletStyle {...props}>{error.message}</FallbackWalletStyle>
    );
  } else {
    return null;
  }
};

export default FallbackWalletDotsama;
