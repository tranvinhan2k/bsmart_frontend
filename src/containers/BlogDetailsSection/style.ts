import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  padding: '90px 0 100px',
  /* Color */
  backgroundColor: Color.white,
  /* Text */
  /* Other */
};

export const SX_CONTAINER: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  width: 'clamp(0rem, 70vw + 10rem, 100rem)',
  marginX: 'auto',
  /* Color */
  /* Text */
  /* Other */
};
