import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontFamily } from '~/assets/variables';

const mainWrapper: SxProps<Theme> = {
  borderRadius: 1.25,
  boxShadow: 3,
  padding: 2.5,
  //
  transition: 'all .4s',
  '&:hover': {
    boxShadow: 4,
    transform: 'translateY(calc(-1.5rem / 5))',
  },
};
const widgetLabel: SxProps<Theme> = {
  color: '#878a99',
};

const widgetNumber: SxProps<Theme> = {
  color: '#495057',
  fontFamily: FontFamily.bold,
  fontSize: 24,
};
const widgetDesc: SxProps<Theme> = {
  color: '#878a99',
};

const sx = {
  mainWrapper,
  widgetLabel,
  widgetNumber,
  widgetDesc,
};

export default sx;
