import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight, MetricSize } from '~/assets/variables';

export const SX_CARD_WRAPPER: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  borderBottom: `1px solid ${Color.grey3}`,
  marginBottom: '1rem',
  paddingBottom: '1rem',
  /* Color */
  /* Text */
  /* Other */
};

export const SX_CARD_LIST_TEXT: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginRight: MetricSize.medium_15,
  /* Color */
  color: Color.grey2,
  /* Text */
  fontSize: FontSize.small_16,
  fontWeight: FontWeight.bold,
  letterSpacing: 1,
  textTransform: 'uppercase',
  /* Other */
};

export const SX_CARD_LIST_WRAPPER: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginTop: '1rem',
  paddingBottom: MetricSize.small_10,
  /* Color */
  /* Text */
  /* Other */
};

export const SX_BLOG_TITTLE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  /* Color */
  color: Color.navy,
  /* Text */
  fontSize: FontSize.medium_28,
  fontWeight: FontWeight.bold,
  lineHeight: '46px',
  /* Other */
};

export const SX_BLOG_CONTENT: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '1rem',
  /* Color */
  color: Color.grey,
  /* Text */
  fontSize: FontSize.small_16,
  lineHeight: 1.5,
  textAlign: 'justify',
  /* Other */
};

/* Comment */
export const SX_BLOG_COMMENT_TITLE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '1rem',
  /* Color */
  color: Color.navy2,
  /* Text */
  fontSize: FontSize.medium_24,
  fontWeight: FontWeight.bold,
  /* Other */
};

export const SX_BLOG_COMMENT_NOTE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  /* Color */
  /* Text */
  lineHeight: 1.8,
  marginBottom: '1rem',
  /* Other */
};
