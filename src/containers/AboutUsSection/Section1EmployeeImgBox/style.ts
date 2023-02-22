import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const WRAPPER: SxProps<Theme> = {
  width: 'clamp(0rem, 70vw + 10rem, 100rem)',
  marginX: 'auto',
  marginTop: '130px',
};

const IMG: SxProps<Theme> = {
  width: '100%',
  borderRadius: '25px',
};

export const SX = {
  WRAPPER,
  IMG,
};
