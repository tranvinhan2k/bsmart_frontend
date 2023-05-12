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
const textTitle: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.large_35,
  color: Color.black,
};
const textSubTitle: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: FontSize.medium_24,
  color: Color.black,
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
  height: '50px',
};

const globalStyles = {
  textTitle,
  textSubTitle,
};

export default globalStyles;
