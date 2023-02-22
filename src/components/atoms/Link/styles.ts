import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize } from '~/assets/variables';

export const SX_TEXT_LINK: SxProps<Theme> = {
  color: Color.orange,
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_16,
  '&:hover': {
    textDecoration: 'underline',
  },
};
export default {};
