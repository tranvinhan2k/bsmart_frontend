import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily, FontSize } from '~/assets/variables';

export const SX_BOX_ITEM_WRAPPER: SxProps<Theme> = {
  boxShadow: 3,
  padding: '20px',
  borderRadius: '5px',
};
export const SX_FORM_ITEM_LABEL_BOLD: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.bold,
};
export const SX_FORM_ITEM_LABEL_LIGHT: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.light,
};
export const SX_FORM_LABEL: SxProps<Theme> = {
  fontSize: FontSize.medium_28,
  fontFamily: FontFamily.bold,
};
export const SX_FORM_VALUE: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.regular,
  color: Color.grey,
};
