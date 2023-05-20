import { SxProps, Theme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import { CSSObject } from 'react-pro-sidebar';
import { Color, FontSize, FontFamily, MetricSize } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  background: Color.navy,
  width: '100%',
  height: '100%',
};

export const SX_APP_NAME: SxProps<Theme> = {
  textAlign: 'center',
  fontSize: { xs: FontSize.small_18, md: FontSize.medium_28 },
  fontFamily: FontFamily.bold,
  color: Color.whiteSmoke,
};

export const SX_SIDEBAR_TITLE: SxProps<Theme> = {
  color: Color.whiteSmoke,
  fontFamily: FontFamily.medium,
  fontSize: FontSize.small_14,
  marginLeft: MetricSize.large_20,
  marginTop: MetricSize.large_30,
};

export const STYLE_SIDEBAR: CSSProperties = {
  height: '100%',
  width: '100%',
  background: Color.navy,
};

export const STYLE_MENU: CSSProperties = {
  background: Color.navy,
  height: '100vh',
};

export const STYLE_MENU_ITEM_LABEL: CSSObject = {
  fontSize: FontSize.small_16,
  fontFamily: FontFamily.regular,
  color: Color.whiteSmoke,
};
export const STYLE_MENU_ITEM_LABEL_ACTIVE: CSSObject = {
  ...STYLE_MENU_ITEM_LABEL,
  color: Color.white,
};

export const STYLE_MENU_ITEM_ICO: CSSObject = {
  color: Color.grey,
  ':hover': {
    color: Color.black,
  },
};
export const STYLE_MENU_ITEM_ICO_ACTIVE: CSSObject = {
  ...STYLE_MENU_ITEM_ICO,
  color: Color.white,
};

export const STYLE_MENU_ITEM_BUTTON: CSSObject = {
  background: Color.navy,
  ':hover': {
    background: `${Color.orange}55`,
  },
};
export const STYLE_MENU_ITEM_BUTTON_ACTIVE: CSSObject = {
  ...STYLE_MENU_ITEM_BUTTON,
  background: Color.orange,
};

export const STYLE_MENU_ITEM_ROOT: CSSObject = {
  color: Color.navy,
  ':hover': {
    color: `${Color.whiteSmoke}`,
  },
};
export const STYLE_MENU_ITEM_ROOT_ACTIVE: CSSObject = {
  ...STYLE_MENU_ITEM_ROOT,
  background: `${Color.white}55`,
};

export const STYLE_SUB_MENU_ROOT: CSSObject = {
  color: Color.white,
};

export const STYLE_MENU_LINK: CSSProperties = {
  color: Color.grey,
  fontSize: FontSize.small_16,
  fontFamily: FontFamily.regular,
};
