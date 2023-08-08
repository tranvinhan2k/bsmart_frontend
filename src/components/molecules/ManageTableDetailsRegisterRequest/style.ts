import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

export const SX_BOX_STICKY: SxProps<Theme> = {
  position: 'sticky',
  top: 0,
};

export const SX_BOX_ITEM_WRAPPER: SxProps<Theme> = {
  borderRadius: 1.25,
  boxShadow: 3,
  padding: 2.5,
};
export const SX_BOX_ITEM_WRAPPER_NO_PADDING: SxProps<Theme> = {
  borderRadius: 1.25,
  boxShadow: 3,
};

export const SX_FORM_LABEL: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 20,
};
export const SX_FORM_VALUE: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: 16,
};

export const SX_FORM_ITEM_LABEL: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 16,
};
export const SX_FORM_ITEM_VALUE: SxProps<Theme> = {
  fontFamily: FontFamily.light,
  fontSize: 16,
};

export const SX_PROFILE_TITLE: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 24,
};
export const SX_PROFILE_TITLE_SUB: SxProps<Theme> = {
  color: Color.grey,
  fontFamily: FontFamily.regular,
  fontSize: 16,
};
export const SX_WRAPPER: SxProps<Theme> = {
  borderRadius: 1.25,
  boxShadow: 3,
};

export const SX_REQUEST_TITLE: SxProps<Theme> = {
  fontSize: 24,
  fontWeight: 600,
};

export const SX_FORM_ITEM_LABEL2: SxProps<Theme> = {
  fontFamily: FontFamily.regular,
  fontSize: 16,
  color: Color.grey2,
};
export const SX_FORM_ITEM_VALUE2: SxProps<Theme> = {
  fontFamily: FontFamily.medium,
  fontSize: 16,
};

export const SX_USER_AVATAR_CLICKABLE: SxProps<Theme> = {
  width: 150,
  height: 150,
  boxShadow: 2,
  //
  transition: 'all .4s',
  '&:hover': {
    boxShadow: 4,
    transform: 'translateY(calc(-1.5rem / 5))',
  },
};
