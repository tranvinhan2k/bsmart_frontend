import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
  BorderRadius,
  Color,
  FontSize,
  FontWeight,
  MetricSize,
} from '~/assets/variables';

export const SX_CONTAINER: SxProps<Theme> = {
  /* Positioning */
  position: 'relative',
  /* Display & Box Model */
  borderRadius: BorderRadius.small_10,
  marginBottom: MetricSize.large_30,
  padding: MetricSize.large_20,
  /* Color */
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
  /* Text */
  /* Other */
};

export const SX_WITHDRAW_TITLE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '20px',
  /* Color */
  color: Color.tertiary,
  /* Text */
  fontSize: FontSize.medium_24,
  fontWeight: FontWeight.bold,
  lineHeight: '30px',
  textAlign: 'center',
  textTransform: 'uppercase',
};

export const SX_WITHDRAW_BALANCE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  /* Color */
  color: Color.black,
  /* Text */
  lineHeight: '30px',
  fontWeight: FontWeight.bold,
  fontSize: FontSize.small_18,
};

export const SX_WITHDRAW_BALANCE_NUMBER: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  paddingLeft: MetricSize.small_5,
  /* Color */
  color: Color.tertiary,
  /* Text */
  fontWeight: FontWeight.bold,
  fontSize: FontSize.medium_24,
};

export const SX_TITLE_NOTE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '20px',
  /* Color */
  color: Color.tertiary,
  /* Text */
  fontSize: FontSize.medium_24,
  fontWeight: FontWeight.bold,
  lineHeight: '30px',
  textTransform: 'uppercase',
};

export const SX_DESC_NOTE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '20px',
  /* Color */
  color: Color.grey,
  /* Text */
  fontSize: FontSize.small_16,
};

export const SX_NOTE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '20px',
  /* Color */
  color: Color.grey,
  /* Text */
  fontSize: FontSize.small_16,
  fontWeight: FontWeight.bold,
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
