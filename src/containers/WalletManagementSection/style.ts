import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
  BorderRadius,
  Color,
  FontFamily,
  MetricSize,
} from '~/assets/variables';

export const SX_FORM: SxProps<Theme> = {
  padding: 3,
  borderRadius: 3,
  backgroundColor: Color.white,
  marginBottom: 3,
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
  margin: '1rem 0 0.5rem 0',
};

export const SX_FORM_ITEM_LABEL: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 16,
};

export const SX_CONTAINER: SxProps<Theme> = {
  /* Positioning */
  position: 'relative',
  /* Display & Box Model */
  borderRadius: BorderRadius.small_10,
  marginBottom: MetricSize.large_30,
  padding: '20px',
  /* Color */
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
  /* Text */
  /* Other */
};

export const SX_FORM_SEARCH_INPUT: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  /* Color */
  backgroundColor: '#f1f1f1',
  /* Text */
  /* Other */
  '& fieldset': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    overflow: 'hidden',
  },
};

export const SX_FORM_SEARCH_INPUT_ICON_BUTTON: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  borderRadius: 0,
  /* Color */
  backgroundColor: Color.tertiary,
  /* Text */
  /* Other */
  '&:hover': {
    backgroundColor: Color.tertiary,
  },
};

export const SX_FORM_SEARCH_INPUT_ICON: SxProps<Theme> = {
  color: Color.white,
};

export const SX_WALLET_DATAGRID: SxProps<Theme> = {
  borderColor: Color.white,
};
