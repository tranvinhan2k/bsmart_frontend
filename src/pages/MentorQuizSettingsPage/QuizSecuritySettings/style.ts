import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

export const SX_FORM: SxProps<Theme> = {
  boxShadow: 3,
  padding: 3,
  borderRadius: 3,
  backgroundColor: Color.white,
};

export const SX_FORM_TITLE: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '46px',
};

export const SX_FORM_LABEL: SxProps<Theme> = {
  color: '#0e0a38',
  fontFamily: FontFamily.bold,
  fontWeight: 700,
};
