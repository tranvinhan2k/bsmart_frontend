import { SxProps, Theme } from '@mui/material/styles';
import { CSSProperties } from 'react';
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
