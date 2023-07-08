import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export const SX_REGISTER_TAB: SxProps<Theme> = {
  background: Color.white,
  borderRadius: MetricSize.small_5,
  width: { xs: '100%', md: MetricSize.halfWidth },
  boxShadow: 3,
};
export const SX_TABS: SxProps<Theme> = {
  width: '100%',
};
export const SX_TAB: SxProps<Theme> = {
  color: Color.tertiary,
  background: '#eee',
  borderColor: Color.tertiary,
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  '&:hover': {
    color: Color.white,
    background: Color.tertiary,
    opacity: 0.5,
  },
  '&.Mui-selected': {
    color: Color.white,
    background: Color.tertiary,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
};
export default {};
