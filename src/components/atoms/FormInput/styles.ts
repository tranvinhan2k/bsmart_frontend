import { alpha, SxProps, Theme } from '@mui/material';
import { Color, FontSize, MetricSize } from '~/assets/variables';

export const SX_CHECKBOX: SxProps<Theme> = {
  '&.Mui-checked': {
    color: Color.orange,
  },
};

export const SX_INPUT_LABEL: SxProps<Theme> = {};
export const SX_TEXT_INPUT_FORM: SxProps<Theme> = {
  '& .MuiInputBase-input': {
    borderRadius: MetricSize.small_5,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: FontSize.small_16,
    width: '100%',
    padding: '10px 12px',
    // Use the system font instead of the default Roboto font.
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
    '&:focus': {
      boxShadow: `${alpha(Color.blue, 0.25)} 0 0 0 0.2rem`,
      borderColor: Color.blue,
    },
  },
};

export default {};
