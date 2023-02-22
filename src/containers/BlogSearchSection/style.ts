import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight, MetricSize } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {};

export const SX_CONTAINER: SxProps<Theme> = {
  /* Positioning */
  position: 'relative',
  /* Display & Box Model */
  borderRadius: '10px',
  marginBottom: '30px',
  padding: '30px 40px 40px',
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
  backgroundColor: Color.orange,
  /* Text */
  /* Other */
  '&:hover': {
    backgroundColor: Color.orange,
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
