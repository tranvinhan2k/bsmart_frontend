import { SxProps, Theme } from '@mui/material';
import { Colors, MetricSize } from '~/assets/variables';

export const SX_FOOTER_STACK: SxProps<Theme> = {
  background: Colors.navy,
  flex: 1,
  paddingX: MetricSize.extraLarge,
  paddingTop: MetricSize.large,
};
export default {};
