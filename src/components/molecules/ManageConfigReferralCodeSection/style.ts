import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

export const form: SxProps<Theme> = {
  padding: 3,
  borderRadius: 3,
  backgroundColor: Color.white,
  marginBottom: 3,
};

export const formTitle: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '46px',
};

export const formLabel: SxProps<Theme> = {
  color: '#0e0a38',
  fontFamily: FontFamily.bold,
  fontWeight: 700,
  margin: '1rem 0 0.5rem 0',
};

export const helperWrapper: SxProps<Theme> = {
  borderRadius: 1.25,
  boxShadow: 3,
  padding: 2.5,
  //
  width: '100%',
};
export const helperMainTitle: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 20,
};
export const helperTitle: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: 16,
  color: Color.grey2,
};
export const helperValue: SxProps<Theme> = {
  fontFamily: FontFamily.medium,
  fontSize: 16,
};

const sx = {
  formLabel,
  helperWrapper,
  helperMainTitle,
  helperTitle,
  helperValue,
};

export default sx;
