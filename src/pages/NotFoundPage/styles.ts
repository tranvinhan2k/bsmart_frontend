import { SxProps, Theme } from '@mui/material';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';

export const SX_NOT_FOUND_STACK: SxProps<Theme> = {
  height: MetricSize.fullHeight,
  justifyContent: 'center',
  alignItems: 'center',
};
export const SX_NOT_FOUND_TEXT: SxProps<Theme> = {
  fontSize: FontSize.extraLarge_70,
  fontFamily: FontFamilies.light,
  color: Colors.black,
};

export default {};
