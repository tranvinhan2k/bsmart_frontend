import { SxProps, Theme } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';

export const SX_HEADER_CONTAINER: SxProps<Theme> = {
  flex: 1,
  background: Color.navy,
  color: Color.white,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingX: MetricSize.extraLarge_100,
};

export default {};
