import { SxProps, Theme } from '@mui/material';
import { Colors, MetricSize } from '~/assets/variables';

export const SX_LOADING_STACK: SxProps<Theme> = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  background: Colors.navy,
  height: MetricSize.fullHeight,
};
export const SX_LOADING_IMG: SxProps<Theme> = {
  width: MetricSize.extraLarge,
  height: MetricSize.extraLarge,
};

export default {};
