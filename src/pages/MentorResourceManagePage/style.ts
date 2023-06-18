import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  boxShadow: 3,
  padding: 2,
  borderRadius: 1,
  backgroundColor: Color.white,
};
export const SX_HEADER_TITLE: SxProps<Theme> = {
  fontSize: 28,
  fontFamily: FontFamily.bold,
};

export const SX_FORM_ITEM_LABEL: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 16,
};
export const SX_FORM_ITEM_VALUE: SxProps<Theme> = {
  fontFamily: FontFamily.light,
  fontSize: 16,
};
