import { SxProps, Theme } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';

export const SX_LOADING_STACK: SxProps<Theme> = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  background: Color.navy,
  height: MetricSize.fullHeight,
};
export const SX_LOADING_IMG: SxProps<Theme> = {
  width: MetricSize.extraLarge_100,
  height: MetricSize.extraLarge_100,
};

export default {};
