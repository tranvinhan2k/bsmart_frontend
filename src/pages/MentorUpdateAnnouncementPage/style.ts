import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

export const SX_ACCORDION_TITTLE: SxProps<Theme> = {
  fontSize: 18,
  fontFamily: FontFamily.bold,
};
export const SX_FORM_LABEL: SxProps<Theme> = {
  color: Color.navy,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
};
