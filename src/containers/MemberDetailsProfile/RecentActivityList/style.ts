import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontFamily } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  marginTop: 3,
  boxShadow: 3,
  padding: 2,
  borderRadius: '5px',
};

export const SX_TITLE: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.bold,
};

export const SX_PROFILE_DETAILS: SxProps<Theme> = {
  color: Color.grey,
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_16,
};

export const SX_PROFILE_DETAILS_HIGHLIGHTED: SxProps<Theme> = {
  color: Color.orange,
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_16,
};
