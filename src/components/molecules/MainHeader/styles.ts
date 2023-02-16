import { SxProps, Theme } from '@mui/material';
import { Colors, MetricSize } from '~/assets/variables';

export const SX_HEADER_CONTAINER: SxProps<Theme> = {
  flex: 1,
  background: Colors.navy,
  color: Colors.white,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingX: MetricSize.extraLarge,
};

export default {};
