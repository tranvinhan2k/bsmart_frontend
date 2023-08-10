import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily, FontSize } from '~/assets/variables';

export const SX_DISPLAY_FIELD_TEXT: SxProps<Theme> = {
  fontSize: FontSize.small_16,
  color: Color.grey,
  fontFamily: FontFamily.regular,
};
