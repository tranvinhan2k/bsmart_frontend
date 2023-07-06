import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

const view: SxProps<Theme> = {
  minHeight: '100vh',
  backgroundColor: Color.white4,
  paddingY: MetricSize.large_30,

  paddingX: { xs: MetricSize.medium_15, md: '100px' },
};
const viewLeft: SxProps<Theme> = {};
const viewRight: SxProps<Theme> = {};
const textMoney: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.extraLarge_70,
};

export default {
  view,
  viewLeft,
  viewRight,
  textMoney,
};
