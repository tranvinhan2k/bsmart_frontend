import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export const SX_NAVIGATION_CONTAINER: SxProps<Theme> = {
  flex: 1,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  justifyContent: 'center',
  alignItems: 'center',
};
export const SX_NAVIGATION_COVER_STACK: SxProps<Theme> = {
  background: Color.blueTransparent,
  position: 'position',
  content: '""',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  width: '100%',
};
export const SX_MAIN_TITLE: SxProps<Theme> = {
  color: Color.orange,
  fontSize: FontSize.medium_24,
  fontFamily: FontFamily.bold,
};
export const SX_SUB_TITLE: SxProps<Theme> = {
  color: Color.white,
  fontSize: FontSize.extraLarge_70,
  fontFamily: FontFamily.bold,
};
export const SX_HOMEPAGE_STACK: SxProps<Theme> = {
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: { xs: MetricSize.medium_15, md: '160px' },
};
export const SX_SUB_HOMEPAGE_STACK: SxProps<Theme> = {
  paddingX: { xs: MetricSize.medium_15, md: '160px' },
};
export const SX_CONTENT_TITLE: SxProps<Theme> = {
  color: Color.white,
  fontSize: FontSize.small_16,
  fontFamily: FontFamily.regular,
};
export const SX_NAVIGATION_STACK: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '60px',
};
export const SX_NAVIGATION_TITLE: SxProps<Theme> = {
  fontSize: FontSize.extraLarge_70,
  fontFamily: FontFamily.medium,
  color: Color.orange,
  textAlign: 'center',
};
export const SX_BREADCRUMB_TITLE: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_16,
  color: Color.white,
  '&:hover': {
    textDecoration: 'underline',
  },
};

export default {};
