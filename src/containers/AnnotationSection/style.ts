import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight, MetricSize } from '~/assets/variables';

export const ANNOTATION_H3: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  marginBottom: '10px',
  padding: '10px 20px',
  /* Color */
  color: Color.orange,
  /* Text */
  fontSize: FontSize.medium_24,
  fontWeight: FontWeight.bold,
  lineHeight: '30px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  /* Other */
};
export const ANNOTATION_BOX: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  borderRadius: MetricSize.small_10,
  padding: '20px 20px',
  /* Color */
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
  /* Text */
  /* Other */
};

export const ANNOTATION_BUTTON: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  border: '0px solid',
  borderRadius: '8px',
  height: '25px',
  marginRight: MetricSize.small_10,
  marginBottom: MetricSize.small_10,
  padding: MetricSize.medium_15,
  /* Color */
  backgroundColor: Color.orange,
  color: Color.blue2,
  /* Text */
  /* Other */
  '&:hover': {
    backgroundColor: Color.orange,
    color: Color.blue2,
  },
};

export const ANNOTATION_CONTENT: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  borderRadius: '8px',
  marginTop: MetricSize.small_10,
  marginBottom: MetricSize.small_5,
  /* Color */
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
  /* Text */
  /* Other */
  '&:hover': {
    borderRadius: '8px',
    backgroundColor: Color.navy,
    '& p': {
      color: Color.whiteSmoke,
    },
  },
};

export const ANNOTATION_CONTENT_IMG: SxProps<Theme> = {
  /* Positioning */
  float: 'left',
  /* Display & Box Model */
  borderRadius: '50%',
  width: '56px',
  height: '56px',
  /* Color */
  backgroundColor: Color.aquamarine,
  /* Text */
  /* Other */
};

export const ANNOTATION_CONTENT_TITLE: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  paddingLeft: MetricSize.large_20,
  /* Color */
  color: Color.orange,
  /* Text */
  fontSize: FontSize.small_16,
  fontWeight: FontWeight.semiBold,
  lineHeight: '15px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  /* Other */
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
  /* Other */
};
