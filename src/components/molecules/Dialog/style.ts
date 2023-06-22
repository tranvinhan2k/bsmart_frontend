import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontFamily } from '~/assets/variables';

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
  margin: '1rem 0 0.5rem 0',
};
