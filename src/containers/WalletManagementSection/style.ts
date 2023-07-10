import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
  BorderRadius,
  Color,
  FontSize,
  FontWeight,
  MetricSize,
} from '~/assets/variables';

export const SX_WRAPPER_TITLE: SxProps<Theme> = {
  paddingTop: '100px',
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

export const SX_TITLE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '20px',
  /* Color */
  color: Color.tertiary,
  /* Text */
  fontSize: FontSize.large_35,
  fontWeight: FontWeight.bold,
  letterSpacing: 2,
  lineHeight: '30px',
  textTransform: 'uppercase',
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

export const SX_OUTSTANDING_TITLE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  paddingBottom: MetricSize.medium_15,
  /* Color */
  color: Color.navy2,
  /* Text */
  fontSize: FontSize.medium_24,
  fontWeight: FontWeight.bold,
  /* Other */
};

export const SX_OUTSTANDING_POST_TITLE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: MetricSize.small_10,
  /* Color */
  color: Color.navy,
  /* Text */
  fontSize: '1rem',
  fontWeight: FontWeight.bold,
  /* Other */
};

export const SX_OUTSTANDING_POST_DATE: SxProps<Theme> = {
  color: Color.grey2,
};

export const SX_WALLET_DATAGRID: SxProps<Theme> = {
  borderColor: Color.white,
};
