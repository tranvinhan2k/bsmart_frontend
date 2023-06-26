import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontSize, FontFamily, Color } from '~/assets/variables';

export const SX_ACCORDION_TITTLE: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.bold,
};
export const SX_FORM_LABEL: SxProps<Theme> = {
  color: Color.navy,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
};
export const SX_FORM_LABEL_ERROR: SxProps<Theme> = {
  color: Color.red,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
};
