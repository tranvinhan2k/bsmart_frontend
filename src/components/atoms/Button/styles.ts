import { SxProps, Theme } from '@mui/material';
import {
  Colors,
  Common,
  FontFamilies,
  FontSize,
  MetricSize,
} from '~/assets/variables';

export const SX_FORM_BUTTON: SxProps<Theme> = {
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.small,
  color: Colors.white,
  background: Colors.orange,
  width: '100%',
  boxShadow: 3,
  '&:hover': {
    borderColor: Colors.orange,
    borderWidth: 1,
    color: Colors.orange,
  },
  height: Common.inputFieldHeight,
};
export const SX_GOOGLE_BUTTON: SxProps<Theme> = {
  width: '100%',
  borderColor: Colors.black,
  borderWidth: 1,
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.small,
  color: Colors.black,
  background: Colors.white,
  boxShadow: 3,
  height: Common.inputFieldHeight,
};
export const SX_GOOGLE_STACK: SxProps<Theme> = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: FontSize.small,
  fontFamily: FontFamilies.regular,
  width: '100%',
};

export const SX_NORMAL_BUTTON: SxProps<Theme> = {
  fontFamily: FontFamilies.bold,
  fontSize: FontSize.small,
  color: Colors.white,
  background: Colors.orange,
  width: '100%',
  boxShadow: 3,
  '&:hover': {
    borderColor: Colors.orange,
    borderWidth: 1,
    color: Colors.orange,
    background: Colors.white,
  },
  padding: MetricSize.medium,
};

export default {};
