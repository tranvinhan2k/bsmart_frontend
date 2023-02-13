import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontFamilies, FontSize } from '~/assets/variables';

export const SX_LARGE_TITLE: SxProps<Theme> = {
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.medium,
  color: Colors.white,
};
export const SX_SMALL_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.small,
  color: Colors.white,
};
export const SX_SMALL_GREY_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.small,
  color: Colors.grey,
};
export const SX_SMALL_BOLD_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.small,
  color: Colors.white,
};
export const SX_MEDIUM_BOLD_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.medium,
  color: Colors.white,
};
export const SX_SHADOW: SxProps<Theme> = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.17,
  shadowRadius: 3.05,
  elevation: 4,
};

export default {};
