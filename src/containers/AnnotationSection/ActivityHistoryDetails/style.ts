import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight, MetricSize } from '~/assets/variables';

export const ANNOTATION_CONTENT: SxProps<Theme> = {
  width: '100%',
  borderRadius: 2,
  marginTop: 1,
  marginBottom: 1,
  boxShadow: 3,
  '&:hover': {
    backgroundColor: Color.navy,
    '& p': {
      color: Color.whiteSmoke,
    },
  },
};

export const ANNOTATION_CONTENT_CONTENT: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  paddingLeft: '20px',
  paddingTop: '10px',
  /* Color */
  color: 'black',
  /* Text */
  fontSize: FontSize.small_16,
  lineHeight: '15px',
  /* Other */
};

export const ANNOTATION_CONTENT_DATE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  paddingLeft: MetricSize.large_20,
  paddingTop: MetricSize.small_10,
  /* Color */
  color: 'gray',
  /* Text */
  fontSize: '14px',
};

export const ANNOTATION_CONTENT_TITLE: SxProps<Theme> = {
  paddingLeft: MetricSize.large_20,
  color: Color.tertiary,
  fontSize: FontSize.small_16,
  fontWeight: FontWeight.semiBold,
  textTransform: 'uppercase',
};
