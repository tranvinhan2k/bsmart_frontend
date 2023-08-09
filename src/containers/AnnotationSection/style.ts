import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';

export const ANNOTATION_BOX: SxProps<Theme> = {
  padding: 3,
  borderRadius: 3,
  backgroundColor: Color.white,
  marginBottom: 3,
};

export const ANNOTATION_H3: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '10px',
  padding: '10px 20px',
  /* Color */
  color: Color.tertiary,
  /* Text */
  fontSize: FontSize.medium_24,
  fontWeight: FontWeight.bold,
  lineHeight: '30px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  /* Other */
};

export const SX_FORM_LABEL_GRAY: SxProps<Theme> = {
  color: Color.grey,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
};
