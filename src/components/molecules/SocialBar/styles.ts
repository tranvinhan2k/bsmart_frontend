import { SxProps, Theme } from '@mui/material';
import { MetricSize } from '~/assets/variables';

export const SX_ICON_SOCIAL_STACK: SxProps<Theme> = {
  height: MetricSize.large,
  width: MetricSize.large,
  padding: MetricSize.medium,
};
export const SX_LIST_SOCIAL_STACK: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
};

export default {};
