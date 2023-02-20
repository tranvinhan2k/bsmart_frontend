import { SxProps } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export const SX_LARGE_TITLE: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.medium_24,
  color: Color.white,
};
export const SX_SMALL_TEXT: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_16,
  color: Color.white,
};
export const SX_SMALL_GREY_TEXT: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_16,
  color: Color.grey,
};
export const SX_SMALL_BOLD_TEXT: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  color: Color.white,
};
export const SX_MEDIUM_BOLD_TEXT: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.medium_24,
  color: Color.white,
};
export const SX_SMALL_RED_TEXT: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: FontSize.medium_24,
  color: Color.red,
};
export const SX_SHADOW: SxProps<Theme> = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.17,
  shadowRadius: 3.05,
  elevation: 4,
};
export const SX_TEXT_INPUT_FORM: SxProps<Theme> = {
  '& .MuiInputBase-input': {
    borderRadius: MetricSize.small_5,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  '&:focus': {
    boxShadow: `${alpha(Color.blue, 0.25)} 0 0 0 0.2rem`,
    borderColor: Color.blue,
  },
};

export default {};
