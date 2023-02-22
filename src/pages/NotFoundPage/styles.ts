import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export const SX_NOT_FOUND_STACK: SxProps<Theme> = {
  height: MetricSize.fullHeight,
  justifyContent: 'center',
  alignItems: 'center',
};
export const SX_NOT_FOUND_TEXT: SxProps<Theme> = {
  fontSize: FontSize.extraLarge_70,
  fontFamily: FontFamily.light,
  color: Color.black,
};

export default {};
