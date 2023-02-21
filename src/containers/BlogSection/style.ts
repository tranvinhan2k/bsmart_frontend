import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  backgroundColor: Color.white,
  padding: '90px 0 100px',
};

export const SX_CONTAINER: SxProps<Theme> = {
  width: 'clamp(0rem, 70vw + 10rem, 100rem)',
  marginX: 'auto',
};
