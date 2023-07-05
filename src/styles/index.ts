import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
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
const textSmallLabel: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_18,
  color: Color.black,
};
const textSmallLight: SxProps<Theme> = {
  fontFamily: FontFamily.light,
  fontSize: FontSize.small_18,
  color: Color.black,
};
const textLowSmallLight: SxProps<Theme> = {
  fontFamily: FontFamily.light,
  fontSize: FontSize.small_14,
  color: Color.grey,
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
  maxHeight: '50px',
  input: {
    fontFamily: FontFamily.light,
    fontSize: FontSize.small_14,
    background: Color.white,
    height: MetricSize.formInputHeight,
  },
};

const globalStyles = {
  textTitle,
  textSubTitle,
  textSmallLabel,
  textSmallLight,
  textLowSmallLight,
};

export default globalStyles;
