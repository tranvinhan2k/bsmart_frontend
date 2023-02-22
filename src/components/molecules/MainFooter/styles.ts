import { SxProps, Theme } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';

export const SX_FOOTER_STACK: SxProps<Theme> = {
  background: Color.navy,
  flex: 1,
  paddingX: MetricSize.extraLarge_100,
  paddingTop: MetricSize.large_20,
};
export default {};
