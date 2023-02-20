import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';

const WRAPPER: SxProps<Theme> = {
  width: 'clamp(0rem, 70vw + 10rem, 100rem)',
  marginX: 'auto',
  marginTop: '40px',
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
  WRAPPER,
  H2,
  P,
};
