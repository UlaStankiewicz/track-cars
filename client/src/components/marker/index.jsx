import { styled } from '@material-ui/styles';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

export const Marker = styled(({ children, className, ...props }) => (
  <div className={className}>
    <LocalShippingIcon />
  </div>
))(() => ({
  color: 'white',
  cursor: 'pointer',
}));
