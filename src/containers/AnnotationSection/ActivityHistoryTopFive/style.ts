import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  boxShadow: 3,
  padding: 3,
  borderRadius: 3,
  backgroundColor: Color.white,
  marginBottom: 3,
};

export const SX_TITLE: SxProps<Theme> = {
  fontSize: 18,
  fontFamily: FontFamily.bold,
};
export const SX_BUTTON: SxProps<Theme> = {
  fontSize: 16,
  fontFamily: FontFamily.regular,
};

export const SX_PROFILE_DETAILS: SxProps<Theme> = {
  color: Color.grey,
  fontFamily: FontFamily.regular,
  fontSize: 16,
};

export const SX_PROFILE_DETAILS_HIGHLIGHTED: SxProps<Theme> = {
  color: Color.orange,
  fontFamily: FontFamily.regular,
  fontSize: 16,
};

export const SX_FORM_LABEL: SxProps<Theme> = {
  color: Color.navy,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
};
export const SX_FORM_LABEL_GRAY: SxProps<Theme> = {
  color: Color.grey,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
};
