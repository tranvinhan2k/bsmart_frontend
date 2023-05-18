import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontFamily } from '~/assets/variables';

export const SX_TITTLE: SxProps<Theme> = {
  color: '#818ea3',
  fontFamily: FontFamily.bold,
  fontSize: '.95rem',
  letterSpacing: '.0625rem',
};

export const SX_TITTLE_SUB: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: '2.0625rem',
  fontWeight: 500,
};

export const SX_TITTLE_ITEM: SxProps<Theme> = {
  boxShadow:
    '0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1)',
  backgroundColor: '#fff',
  border: 'none',
  borderRadius: '0.625rem',
};
