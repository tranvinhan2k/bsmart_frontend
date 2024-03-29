import { SxProps, Theme } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';

export const SX_REGISTER_LAYOUT_STACK: SxProps<Theme> = {
  justifyContent: 'center',
  alignItems: 'center',
  margin: MetricSize.large_20,
  alignSelf: 'center',
  background: Color.white,
};

export default {};
