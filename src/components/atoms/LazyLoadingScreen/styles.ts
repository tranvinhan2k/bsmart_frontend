import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily } from '~/assets/variables';

export const SX_LOADING_STACK: SxProps<Theme> = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  background: Color.navy,
  height: '1000px',
};
export const SX_LOADING_IMG: SxProps<Theme> = {
  width: '200px',
  height: undefined,
  aspectRatio: 1,
  objectFit: 'contain',
};
export const SX_LOADING_TITLE: SxProps<Theme> = {
  fontSize: 26,
  fontFamily: FontFamily.bold,
  color: Color.white,
};
export const SX_LOADING_DESC: SxProps<Theme> = {
  fontSize: 20,
  fontFamily: FontFamily.medium,
  color: Color.white,
  boxShadow: 3,
};

export default {};
