import { SxProps, Theme } from '@mui/material';
import { Colors, FontFamilies, FontSize } from '~/assets/variables';

export const SX_CONTRACT_STACK: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
};
export const SX_CONTRACT_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.small_16,
  color: Colors.white,
};
export default {};
