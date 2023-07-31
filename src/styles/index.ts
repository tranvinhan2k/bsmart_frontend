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
  fontFamily: FontFamily.title,
  fontSize: FontSize.medium_24,
  color: Color.black,
};
const textSmallLabel: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_18,
  color: Color.black,
};
const textCourseSmallLabel: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.medium_24,
  marginTop: 3,
  marginBottom: 1,
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
const textWhiteSubTitle: SxProps<Theme> = {
  fontSize: FontSize.medium_24,
  fontFamily: FontFamily.bold,
  color: Color.white,
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
  borderColor: '#ddd',
  // maxHeight: '50px',
  input: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.small_14,
    background: Color.white,
    height: MetricSize.formInputHeight,
  },
  '.MuiFormHelperText-root': {
    marginX: 0,
  },
};
export const SX_DATAGRID_CELL_TEXT: SxProps<Theme> = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 14,
};
export const textTwoLineEllipsis: SxProps<Theme> = {
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
};
export const viewRoundedWhiteBody: SxProps<Theme> = {
  background: Color.white,
  padding: 3,
  borderRadius: MetricSize.small_5,
};
export const viewIllustration: SxProps<Theme> = {
  width: '300px',
  height: '300px',
  objectFit: 'contain',
  alignSelf: 'center',
  padding: 1,
};
export const viewCenter: SxProps<Theme> = {
  justifyContent: 'center',
  alignItems: 'center',
};
export const viewBorder: SxProps<Theme> = {
  border: '1px solid black',
  padding: 1,
};
export const viewFlexRowCenter: SxProps<Theme> = {
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: 'center',
};
const displayEditorTextShowMore: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
};
const displayEditorTextShowLess: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  maskImage: 'linear-gradient(#ffffff,#ffffff,rgba(255,255,255,0))',
};
const displayEditorExpandButton: SxProps<Theme> = {
  backgroundColor: 'transparent',
  textTransform: 'none',
  '&:hover': { backgroundColor: 'transparent' },
};
const boxSticky: SxProps<Theme> = {
  position: 'sticky',
  top: 0,
};
const globalStyles = {
  boxSticky,
  displayEditorTextShowMore,
  displayEditorTextShowLess,
  displayEditorExpandButton,
  textTitle,
  textSubTitle,
  textSmallLabel,
  textSmallLight,
  textCourseSmallLabel,
  textLowSmallLight,
  textWhiteSubTitle,
  textTwoLineEllipsis,
  viewRoundedWhiteBody,
  viewIllustration,
  viewCenter,
  viewBorder,
  viewFlexRowCenter,
};

export default globalStyles;
