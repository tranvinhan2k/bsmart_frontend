import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';

const CONTAINER: SxProps<Theme> = {
  width: '80%',
  margin: 'auto',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  color: Color.orange,
  fontSize: { xs: FontSize.medium_28, sm: '50px' },
  fontWeight: FontWeight.bold,
  marginBottom: '10px',
};

const P: SxProps<Theme> = {
  fontSize: FontSize.small_16,
  lineHeight: '26px',
  color: Color.grey2,
};

export const SX = {
  CONTAINER,
  H2,
  P,
};
