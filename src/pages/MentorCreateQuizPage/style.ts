import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontSize, FontFamily } from '~/assets/variables';

export const SX_ACCORDION_TITTLE: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.bold,
};
export const SX_FORM_LABEL: SxProps<Theme> = {
  color: '#0e0a38',
  fontWeight: 700,
  margin: '1rem 0 0.5rem 0',
};
