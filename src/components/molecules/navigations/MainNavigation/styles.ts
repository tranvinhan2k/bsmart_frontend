import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export const view: SxProps<Theme> = {
  transition: 'all 1s ease',
  background: Color.white,
  flexDirection: 'row',
  paddingX: { xs: MetricSize.medium_15, md: MetricSize.extraLarge_100 },
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 4,
};

export const subView: SxProps<Theme> = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
};

export const view1: SxProps<Theme> = {
  display: { xs: 'none', md: 'flex' },
};

export const view2: SxProps<Theme> = {
  display: { xs: 'none', md: 'flex' },
};

export const view3: SxProps<Theme> = {
  display: { xs: 'flex', md: 'none' },
};
export const view4: SxProps<Theme> = {
  padding: MetricSize.medium_15,
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

export const text1: SxProps<Theme> = {
  fontSize: { xs: FontSize.medium_24, md: FontSize.medium_28 },
  fontFamily: FontFamily.bold,
  color: Color.navy,
};

export const text2: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.medium_24,
  color: Color.navy,
};

export const badge: SxProps<Theme> = {
  '& .MuiBadge-badge': {
    color: Color.white,
    backgroundColor: Color.tertiary,
  },
};

const styles = {
  view,
  view1,
  view2,
  view3,
  view4,
  subView,
  text1,
  text2,
  badge,
};

export default styles;
