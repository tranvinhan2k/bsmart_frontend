import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontFamily, FontSize } from '~/assets/variables';

export const SX_FORM_ITEM_LABEL_BOLD: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.bold,
};
export const SX_FORM_ITEM_LABEL_LIGHT: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.light,
};
