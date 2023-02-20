import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize } from '~/assets/variables';

export const SX_CHECKBOX_STACK: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
  left: '-10px',
};
export const SX_CHECKBOX: SxProps<Theme> = {
  '&.Mui-checked': {
    color: Color.orange,
  },
};
export const SX_CHECKBOX_TYPOGRAPHY: SxProps<Theme> = {
  color: Color.grey,
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_16,
};

export default {};
