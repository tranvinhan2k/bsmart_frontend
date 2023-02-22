import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';

const WRAPPER = {
  width: 'clamp(0rem, 70vw + 10rem, 100rem)',
  marginX: 'auto',
  marginTop: '40px',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  fontSize: FontSize.large_45,
  lineHeight: '55px',
  fontWeight: FontWeight.bold,
};

const H5: SxProps<Theme> = {
  fontSize: FontSize.small_16,
  lineHeight: '26px',
  fontWeight: FontWeight.semiBold,
  textTransform: 'uppercase',
  color: Color.orange,
  letterSpacing: 1,
};

const P: SxProps<Theme> = {
  color: Color.grey,
  margin: '20px 0 40px',
  letterSpacing: 1,
  lineHeight: '25px',
};

export const SX = {
  WRAPPER,
  H2,
  H5,
  P,
};
