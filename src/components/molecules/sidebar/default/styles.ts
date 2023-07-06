import { SxProps, Theme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import { CSSObject } from 'react-pro-sidebar';
import { Color, FontSize, FontFamily } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  position: 'relative',
};

export const SX_APP_NAME: SxProps<Theme> = {
  textAlign: 'center',
  fontSize: { xs: FontSize.small_18, md: FontSize.medium_28 },
  fontFamily: FontFamily.bold,
  color: Color.whiteSmoke,
};

export const SX_SIDEBAR_TITLE: SxProps<Theme> = {
  color: Color.black,
  fontFamily: FontFamily.light,
  fontSize: FontSize.small_14,
};

export const STYLE_SIDEBAR: CSSProperties = {
  background: Color.white2,
  zIndex: 999,
};
export const STYLE_SCROLLBAR: SxProps<Theme> = {
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const STYLE_MENU: CSSProperties = {
  background: Color.white2,
  color: Color.black,
  height: '100vh',
};

export const STYLE_MENU_ITEM_LABEL: CSSObject = {
  fontSize: FontSize.small_14,
  fontFamily: FontFamily.regular,
  color: Color.black,
};
export const STYLE_MENU_ITEM_LABEL_ACTIVE: CSSObject = {
  ...STYLE_MENU_ITEM_LABEL,
};

export const STYLE_MENU_ITEM_ICO: CSSObject = {
  color: Color.black,
  fontSize: '5px',
};
export const STYLE_MENU_ITEM_ICO_ACTIVE: CSSObject = {
  ...STYLE_MENU_ITEM_ICO,
};

export const STYLE_MENU_ITEM_BUTTON: CSSObject = {
  transition: 'all 200ms ease',
  background: Color.white2,
  ':hover': {
    background: Color.grey3,
  },
};
export const STYLE_MENU_ITEM_BUTTON_ACTIVE: CSSObject = {
  ...STYLE_MENU_ITEM_BUTTON,
  background: `${Color.navy}33`,
};

export const STYLE_MENU_ITEM_ROOT: CSSObject = {
  color: Color.white2,
  ':hover': {
    color: `${Color.whiteSmoke}`,
  },
};
export const STYLE_MENU_ITEM_ROOT_ACTIVE: CSSObject = {
  ...STYLE_MENU_ITEM_ROOT,
  background: `${Color.white}55`,
};

export const STYLE_SUB_MENU_ROOT: CSSObject = {
  color: Color.black,
};

export const STYLE_MENU_LINK: CSSProperties = {
  color: Color.black,
  fontSize: FontSize.small_16,
  fontFamily: FontFamily.regular,
};
