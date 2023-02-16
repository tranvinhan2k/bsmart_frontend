import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const WRAPPER: SxProps<Theme> = {
  marginTop: '130px',
  width: '100%',
  padding: '30px 200px',
  boxSizing: 'border-box',
};

const IMG: SxProps<Theme> = {
  width: '100%',
  borderRadius: '25px',
};

export const SX = {
  WRAPPER,
  IMG,
};
