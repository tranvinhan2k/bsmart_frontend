import { SxProps, Theme } from '@mui/material';
import { Colors, FontFamilies, FontSize } from '~/assets/variables';

export const SX_NAVIGATION_CONTAINER: SxProps<Theme> = {
  flex: 1,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  justifyContent: 'center',
  alignItems: 'center',
};
export const SX_NAVIGATION_COVER_STACK: SxProps<Theme> = {
  background: Colors.blueTransparent,
  position: 'position',
  content: '""',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  width: '100%',
};
export const SX_MAIN_TITLE: SxProps<Theme> = {
  color: Colors.orange,
  fontSize: FontSize.medium_24,
  fontFamily: FontFamilies.bold,
};
export const SX_SUB_TITLE: SxProps<Theme> = {
  color: Colors.white,
  fontSize: FontSize.extraLarge_70,
  fontFamily: FontFamilies.bold,
};
export const SX_HOMEPAGE_STACK: SxProps<Theme> = {
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingX: '160px',
};
export const SX_SUB_HOMEPAGE_STACK: SxProps<Theme> = {
  paddingX: '160px',
};
export const SX_CONTENT_TITLE: SxProps<Theme> = {
  color: Colors.white,
  fontSize: FontSize.small_16,
  fontFamily: FontFamilies.regular,
};
export const SX_NAVIGATION_STACK: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};
export const SX_NAVIGATION_TITLE: SxProps<Theme> = {
  fontSize: FontSize.extraLarge_70,
  fontFamily: FontFamilies.medium,
  color: Colors.orange,
};
export const SX_BREADCRUMB_TITLE: SxProps<Theme> = {
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.small_16,
  color: Colors.white,
};

export default {};
