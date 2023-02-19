import { SxProps, Theme } from '@mui/material';
import { Colors, FontFamilies, FontSize } from '~/assets/variables';

export const SX_REGISTER_TAB: SxProps<Theme> = {
  borderColor: Colors.grey,
};
export const SX_TABS: SxProps<Theme> = {
  width: '100%',
  borderBottomColor: Colors.orange,
};
export const SX_TAB: SxProps<Theme> = {
  color: Colors.orange,
  background: '#eee',
  borderColor: Colors.orange,
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.small,
  '&:hover': {
    color: Colors.white,
    background: Colors.orange,
    opacity: 0.5,
  },
  '&.Mui-selected': {
    color: Colors.white,
    background: Colors.orange,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
};
export default {};
