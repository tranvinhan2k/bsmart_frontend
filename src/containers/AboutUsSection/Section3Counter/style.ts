import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontWeight } from '~/assets/variables';

const CONTAINER: SxProps<Theme> = {
  width: '80%',
  margin: 'auto',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  color: Colors.orange,
  fontSize: { xs: '28px', sm: '50px' },
  fontWeight: FontWeight.bold,
  marginBottom: '10px',
};

const P: SxProps<Theme> = {
  fontSize: '16px',
  lineHeight: '26px',
  color: Colors.grey2,
};

export const SX = {
  CONTAINER,
  H2,
  P,
};
