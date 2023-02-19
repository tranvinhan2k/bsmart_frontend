import { SxProps } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';

export const SX_LARGE_TITLE: SxProps<Theme> = {
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.medium,
  color: Colors.white,
};
export const SX_SMALL_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.small,
  color: Colors.white,
};
export const SX_SMALL_GREY_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.small,
  color: Colors.grey,
};
export const SX_SMALL_BOLD_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.small,
  color: Colors.white,
};
export const SX_MEDIUM_BOLD_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.medium,
  color: Colors.white,
};
export const SX_SMALL_RED_TEXT: SxProps<Theme> = {
  fontFamily: FontFamilies.regular,
  fontSize: FontSize.medium,
  color: Colors.red,
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
    borderRadius: MetricSize.small,
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
    boxShadow: `${alpha(Colors.blue, 0.25)} 0 0 0 0.2rem`,
    borderColor: Colors.blue,
  },
};

export default {};
