import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize } from '~/assets/variables';

export const SX_CONTRACT_STACK: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
};
export const SX_CONTRACT_TEXT: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_16,
  color: Color.white,
};
export default {};
