import { SxProps, Theme } from '@mui/material';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';

export const SX_NAVIGATION_STACK: SxProps<Theme> = {
  background: Colors.white,
  flexDirection: 'row',
  paddingX: MetricSize.extraLarge,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 4,
};

export default {};
