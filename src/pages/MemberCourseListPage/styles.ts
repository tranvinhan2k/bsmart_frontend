import { SxProps, Theme } from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';

const stack1: SxProps<Theme> = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
};
const stack2: SxProps<Theme> = {
  flexDirection: 'row',
};
const typography1: SxProps<Theme> = {
  fontSize: FontSize.medium_28,
  fontFamily: FontFamily.bold,
};

export default {
  stack1,
  stack2,
  typography1,
};
