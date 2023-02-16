import { SxProps, Theme } from '@mui/material';
import { Colors, FontFamilies, FontSize } from '~/assets/variables';

export const SX_TEXT_LINK: SxProps<Theme> = {
  color: Colors.orange,
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.small_16,
  '&:hover': {
    textDecoration: 'underline',
  },
};
export default {};
