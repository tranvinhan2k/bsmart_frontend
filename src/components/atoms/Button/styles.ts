import { SxProps, Theme } from '@mui/material';
import {
  Color,
  Common,
  FontFamily,
  FontSize,
  MetricSize,
} from '~/assets/variables';

export const SX_FORM_BUTTON: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  color: Color.white,
  background: Color.orange,
  width: '100%',
  boxShadow: 3,
  '&:hover': {
    borderColor: Color.orange,
    borderWidth: 1,
    color: Color.orange,
  },
  height: Common.inputFieldHeight,
};
export const SX_GOOGLE_BUTTON: SxProps<Theme> = {
  width: '100%',
  borderColor: Color.black,
  borderWidth: 1,
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  color: Color.black,
  background: Color.white,
  boxShadow: 3,
  height: Common.inputFieldHeight,
};
export const SX_GOOGLE_STACK: SxProps<Theme> = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: FontSize.small_16,
  fontFamily: FontFamily.regular,
  width: '100%',
};

export const SX_NORMAL_BUTTON: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  color: Color.white,
  background: Color.orange,
  width: '100%',
  boxShadow: 3,
  '&:hover': {
    borderColor: Color.orange,
    borderWidth: 1,
    color: Color.orange,
    background: Color.white,
  },
  padding: MetricSize.medium_15,
};

export default {};
