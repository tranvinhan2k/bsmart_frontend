import { SxProps, Theme } from '@mui/material';
import { IconSize, MetricSize } from '~/assets/variables';

export const SX_IMAGE: SxProps<Theme> = {
  height: IconSize.small,
  width: IconSize.small,
};
export const SX_ICON_SOCIAL_STACK: SxProps<Theme> = {
  height: MetricSize.large_20,
  width: MetricSize.large_20,
  padding: MetricSize.medium_15,
};
export const SX_LIST_SOCIAL_STACK: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
};

export default {};
