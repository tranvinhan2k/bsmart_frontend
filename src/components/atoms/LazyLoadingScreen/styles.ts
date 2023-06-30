import { SxProps, Theme } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';

export const SX_LOADING_STACK: SxProps<Theme> = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  background: Color.navy,
  height: '1000px',
};
export const SX_LOADING_IMG: SxProps<Theme> = {
  width: '200px',
  height: undefined,
  aspectRatio: 1,
  objectFit: 'contain',
};

export default {};
