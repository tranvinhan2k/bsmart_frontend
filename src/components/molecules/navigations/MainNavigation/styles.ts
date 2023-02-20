import { SxProps, Theme } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';

export const SX_NAVIGATION_STACK: SxProps<Theme> = {
  background: Color.white,
  flexDirection: 'row',
  paddingX: MetricSize.extraLarge_100,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 4,
};

export default {};
