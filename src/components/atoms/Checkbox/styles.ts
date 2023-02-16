import { SxProps, Theme } from '@mui/material';
import { Colors, FontFamilies, FontSize } from '~/assets/variables';

export const SX_CHECKBOX_STACK: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
  left: '-10px',
};
export const SX_CHECKBOX: SxProps<Theme> = {
  '&.Mui-checked': {
    color: Colors.orange,
  },
};
export const SX_CHECKBOX_TYPOGRAPHY: SxProps<Theme> = {
  color: Colors.grey,
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.small,
};

export default {};
