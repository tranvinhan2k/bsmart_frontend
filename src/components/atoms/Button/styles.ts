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
  borderColor: Color.transparent,
  background: Color.tertiary,
  width: '100%',
  boxShadow: 3,
  '&:hover': {
    borderColor: Color.tertiary,
    borderWidth: 1,
    color: Color.tertiary,
  },
  height: Common.inputFieldHeight,
};
export const SX_GOOGLE_BUTTON: SxProps<Theme> = {
  width: '100%',
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
  transition: 'all 500ms ease',
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  color: Color.white,
  background: Color.tertiary,
  width: '100%',
  boxShadow: 3,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: Color.tertiary,
  '&:hover': {
    color: Color.tertiary,
    background: Color.white,
  },
  padding: MetricSize.medium_15,
};
export const SX_LINEAR_BUTTON: SxProps<Theme> = {
  transition: 'all 1000ms ease',
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  color: Color.white,
  background: `${Color.navy}AA`,
  width: '100%',
  boxShadow: 3,
  '&:hover': {
    color: Color.white,
    background: Color.navy,
  },
  padding: MetricSize.medium_15,
};

export const SX_NORMAL_BUTTON_SMALL: SxProps<Theme> = {
  transition: 'all 500ms ease',
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  color: Color.white,
  background: Color.tertiary,
  width: '100%',
  boxShadow: 3,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: Color.tertiary,
  '&:hover': {
    color: Color.tertiary,
    background: Color.white,
  },
  padding: MetricSize.small_5,
};

export const SX_OUTLINED_BUTTON: SxProps<Theme> = {
  transition: 'all 500ms ease',
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_16,
  color: Color.tertiary,
  background: Color.white,
  borderColor: Color.tertiary,
  borderWidth: 1,
  borderStyle: 'solid',
  width: '100%',
  boxShadow: 3,
  '&:hover': {
    color: Color.white,
    background: Color.tertiary,
  },
  padding: MetricSize.medium_15,
};

export const SX_FORM_INPUT_HORIZON_BUTTON: SxProps<Theme> = {
  transition: 'all 500ms ease',
  fontFamily: FontFamily.regular,
  paddingX: MetricSize.small_10,
  fontSize: FontSize.small_16,
  color: Color.white,
  background: Color.tertiary,
  width: '100%',
  boxShadow: 3,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: Color.tertiary,
  '&:hover': {
    color: Color.tertiary,
    background: Color.white,
  },
  padding: MetricSize.small_5,
};

export default {};
