import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontSize, FontWeight } from '~/assets/variables';

export const ANNOTATION_H3: SxProps<Theme> = {
  padding: '10px 20px',
  color: '#ff630e',
  lineHeight: '30px',
  letterSpacing: '2px',
  fontWeight: FontWeight.bold,
  marginBottom: '10px',
  textTransform: 'uppercase',
  fontSize: '24px',
};
export const ANNOTATION_BOX: SxProps<Theme> = {
  borderRadius: '8px',
  padding: '20px 20px',
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
};

export const ANNOTATION_BUTTON: SxProps<Theme> = {
  height: '25px',
  padding: '15px',
  marginRight: '10px',
  borderRadius: '8px',
  marginBottom: '10px',
  backgroundColor: '#ff630e',
  color: 'aliceblue',
  border: '0px solid',
  '&:hover': {
    backgroundColor: '#ff630e',
    color: 'aliceblue',
  },
};

export const ANNOTATION_CONTENT: SxProps<Theme> = {
  marginTop: '10px',
  marginBottom: '5px',
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
  borderRadius: '8px',
  '&:hover': {
    borderRadius: '8px',
    backgroundColor: '#0e0a38',
    transition: 'all 2s',
    '& p': {
      color: '#f5f5f5',
      transition: 'all 2s',
    },
  },
};

export const ANNOTATION_CONTENT_IMG: SxProps<Theme> = {
  float: 'left',
  backgroundColor: 'aquamarine',
  width: '56px',
  height: '56px',
  borderRadius: '50%',
};

export const ANNOTATION_CONTENT_TITLE: SxProps<Theme> = {
  paddingLeft: '20px',
  lineHeight: '15px',
  color: '#ff630e',
  fontWeight: 600,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  fontSize: '16px',
};

export const ANNOTATION_CONTENT_CONTENT: SxProps<Theme> = {
  paddingTop: '10px',
  paddingLeft: '20px',
  lineHeight: '15px',
  color: 'black',
  fontSize: '16px',
};

export const ANNOTATION_CONTENT_DATE: SxProps<Theme> = {
  paddingLeft: '20px',
  paddingTop: '10px',
  color: 'gray',
  fontSize: '14px',
};
