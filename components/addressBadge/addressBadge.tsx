import { useBreakpoint } from '@lidofinance/lido-ui';
import { AddressBadgeStyle } from './addressBadgeStyles';
import { AddressBadgeComponent } from './types';

const AddressBadge: AddressBadgeComponent = (props) => {
  const { address, ...rest } = props;
  const isMobile = useBreakpoint('md');

  return (
    <AddressBadgeStyle
      symbols={isMobile ? 6 : 12}
      address={address ?? ''}
      {...rest}
    />
  );
};

export default AddressBadge;
